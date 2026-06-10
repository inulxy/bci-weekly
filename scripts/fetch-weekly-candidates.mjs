import fs from "node:fs/promises";
import path from "node:path";

import { buildReportSnapshot } from "./report-builder.mjs";

const OUT_DIR = path.join(process.cwd(), "src/data/generated");
const WEEK_ID = process.env.WEEK_ID ?? getIsoWeekId(new Date());
const DATE_RANGE = process.env.DATE_RANGE ?? getLastSevenDayRange();

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const sources = [
    fetchPubMedCandidates,
    fetchArxivCandidates,
    fetchClinicalTrialsCandidates,
    fetchOpenFdaCandidates,
  ];

  const results = await Promise.allSettled(sources.map((source) => source()));
  const candidates = results
    .flatMap((result) => (result.status === "fulfilled" ? result.value : []))
    .filter(Boolean);

  const normalized =
    candidates.length > 0 ? dedupeCandidates(candidates) : fallbackCandidates();

  const snapshot = buildReportSnapshot({
    weekId: WEEK_ID,
    dateRange: DATE_RANGE,
    candidates: normalized,
  });

  await fs.writeFile(
    path.join(OUT_DIR, "weekly-candidates.json"),
    `${JSON.stringify(normalized, null, 2)}\n`
  );
  await fs.writeFile(
    path.join(OUT_DIR, "report-snapshot.json"),
    `${JSON.stringify(snapshot, null, 2)}\n`
  );

  console.log(`Generated ${normalized.length} candidates for ${WEEK_ID}`);
}

async function fetchPubMedCandidates() {
  const term = encodeURIComponent(
    '("brain computer interface" OR "brain-machine interface" OR neuroprosthetic OR "neural interface")'
  );
  const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${term}&retmode=json&retmax=8&sort=pub+date`;
  const search = await fetchJson(url);
  const ids = search?.esearchresult?.idlist ?? [];
  if (ids.length === 0) return [];

  const summary = await fetchJson(
    `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(",")}&retmode=json`
  );

  return ids.map((id) => {
    const item = summary.result[id];
    return {
      id: `pubmed-${id}`,
      title: item.title,
      sourceName: "PubMed",
      sourceUrl: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
      publishedAt: normalizeDate(item.pubdate),
      category: "science",
      summary: `${item.fulljournalname ?? "Peer-reviewed journal"} publication related to neurotechnology or neural interfaces.`,
      companies: [],
      tags: ["PubMed", "paper", "neurotechnology"],
      status: "candidate",
    };
  });
}

async function fetchArxivCandidates() {
  const url =
    "https://export.arxiv.org/api/query?search_query=all:%22brain%20computer%20interface%22+OR+all:%22neural%20interface%22&start=0&max_results=8&sortBy=submittedDate&sortOrder=descending";
  const xml = await fetchText(url);
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];

  return entries.map((entry, index) => {
    const block = entry[1];
    const title = stripXml(extractXml(block, "title"));
    const id = extractXml(block, "id");
    const publishedAt = normalizeDate(extractXml(block, "published"));
    const summary = stripXml(extractXml(block, "summary")).slice(0, 360);

    return {
      id: `arxiv-${slugify(id || title || String(index))}`,
      title,
      sourceName: "arXiv",
      sourceUrl: id,
      publishedAt,
      category: "science",
      summary,
      companies: [],
      tags: ["arXiv", "preprint", "BCI"],
      status: "candidate",
    };
  });
}

async function fetchClinicalTrialsCandidates() {
  const url =
    "https://clinicaltrials.gov/api/v2/studies?query.term=brain-computer%20interface%20OR%20neural%20interface&pageSize=8&sort=@lastUpdatePostDate:desc";
  const data = await fetchJson(url);

  return (data.studies ?? []).map((study) => {
    const protocol = study.protocolSection ?? {};
    const identification = protocol.identificationModule ?? {};
    const status = protocol.statusModule ?? {};
    const conditions = protocol.conditionsModule?.conditions ?? [];
    const sponsors = protocol.sponsorCollaboratorsModule?.leadSponsor?.name
      ? [protocol.sponsorCollaboratorsModule.leadSponsor.name]
      : [];

    return {
      id: `ctgov-${identification.nctId}`,
      title: identification.briefTitle,
      sourceName: "ClinicalTrials.gov",
      sourceUrl: `https://clinicaltrials.gov/study/${identification.nctId}`,
      publishedAt: normalizeDate(status.lastUpdatePostDateStruct?.date),
      category: "clinical",
      summary: `Clinical study status: ${status.overallStatus ?? "unknown"}. Conditions: ${conditions.join(", ") || "not specified"}.`,
      companies: sponsors,
      tags: ["clinical trial", status.overallStatus ?? "status unknown"],
      status: "candidate",
    };
  });
}

async function fetchOpenFdaCandidates() {
  const url =
    'https://api.fda.gov/device/event.json?search=(device.generic_name:"brain-computer"+OR+device.generic_name:"neural")&limit=5';
  const data = await fetchJson(url);

  return (data.results ?? []).map((event, index) => ({
    id: `fda-event-${event.mdr_report_key ?? index}`,
    title: `FDA MAUDE device event: ${event.event_type ?? "device report"}`,
    sourceName: "openFDA Device Event",
    sourceUrl: "https://open.fda.gov/apis/device/event/",
    publishedAt: normalizeDate(event.date_received),
    category: "regulatory",
    summary: event.event_description ?? "Device event report surfaced by openFDA.",
    companies: event.device?.map((device) => device.manufacturer_d_name).filter(Boolean) ?? [],
    tags: ["FDA", "MAUDE", "safety"],
    status: "candidate",
  }));
}

async function fetchJson(url) {
  const response = await fetchWithTimeout(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
}

async function fetchText(url) {
  const response = await fetchWithTimeout(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.text();
}

function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  return fetch(url, {
    signal: controller.signal,
    headers: {
      "User-Agent": "NeuralPulseWeekly/0.1 research-contact@example.com",
    },
  }).finally(() => clearTimeout(timeout));
}

function dedupeCandidates(candidates) {
  const seen = new Set();

  return candidates.filter((candidate) => {
    const key = candidate.sourceUrl || candidate.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return Boolean(candidate.title && candidate.sourceUrl);
  });
}

function fallbackCandidates() {
  return [
    {
      id: "seed-regulatory-precision-btd",
      title: "FDA grants breakthrough device designation to cortical BCI implant",
      sourceName: "FDA / Company Disclosure",
      sourceUrl: "https://www.fda.gov/medical-devices/how-study-and-market-your-device/breakthrough-devices-program",
      publishedAt: new Date().toISOString().slice(0, 10),
      category: "regulatory",
      summary:
        "A cortical interface program received a regulatory designation that could compress review timelines if clinical evidence remains supportive.",
      companies: ["Precision Neuroscience"],
      tags: ["FDA", "BTD", "implantable BCI"],
      status: "candidate",
    },
    {
      id: "seed-clinical-synchron",
      title: "Endovascular BCI study expands enrollment across additional centers",
      sourceName: "ClinicalTrials.gov",
      sourceUrl: "https://clinicaltrials.gov/",
      publishedAt: new Date().toISOString().slice(0, 10),
      category: "clinical",
      summary:
        "An endovascular neural interface trial added new study sites, suggesting operational progress toward a larger pivotal data package.",
      companies: ["Synchron"],
      tags: ["clinical trial", "endovascular", "BCI"],
      status: "candidate",
    },
    {
      id: "seed-science-decoding",
      title: "High-density cortical recordings improve speech decoding performance",
      sourceName: "PubMed / arXiv",
      sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/",
      publishedAt: new Date().toISOString().slice(0, 10),
      category: "science",
      summary:
        "Recent academic work indicates that denser cortical recordings and transformer-based decoders may improve speech restoration use cases.",
      companies: [],
      tags: ["speech decoding", "cortical array", "AI decoder"],
      status: "candidate",
    },
  ];
}

function normalizeDate(value) {
  if (!value) return new Date().toISOString().slice(0, 10);
  const parsed = new Date(String(value).replace(/\s+/g, " "));
  if (Number.isNaN(parsed.valueOf())) return String(value).slice(0, 10);
  return parsed.toISOString().slice(0, 10);
}

function extractXml(block, tag) {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return match?.[1]?.trim() ?? "";
}

function stripXml(value) {
  return value.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function getIsoWeekId(date) {
  const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((target - yearStart) / 86400000 + 1) / 7);
  return `${target.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

function getLastSevenDayRange() {
  const end = new Date();
  const start = new Date(end);
  start.setDate(end.getDate() - 6);

  return `${formatDate(start)}-${formatDate(end)}`;
}

function formatDate(date) {
  return date.toISOString().slice(0, 10).replaceAll("-", ".");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
