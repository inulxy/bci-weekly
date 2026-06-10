import test from "node:test";
import assert from "node:assert/strict";

import {
  buildReportSnapshot,
  scoreCandidate,
} from "../scripts/report-builder.mjs";

const candidates = [
  {
    id: "clinical-1",
    title: "FDA grants breakthrough device designation to cortical BCI implant",
    sourceName: "FDA",
    sourceUrl: "https://www.fda.gov/example",
    publishedAt: "2026-06-05",
    category: "regulatory",
    summary: "A cortical interface received breakthrough designation.",
    companies: ["Precision Neuroscience"],
    tags: ["FDA", "BTD", "implant"],
    status: "candidate",
  },
  {
    id: "paper-1",
    title: "High density wireless cortical array improves neural decoding",
    sourceName: "PubMed",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/example",
    publishedAt: "2026-06-04",
    category: "science",
    summary: "A peer-reviewed study reports improved decoding performance.",
    companies: [],
    tags: ["cortical array", "wireless", "decoding"],
    status: "candidate",
  },
  {
    id: "deal-1",
    title: "Neurotech company raises $150M Series C to expand pivotal trial",
    sourceName: "Company Press Release",
    sourceUrl: "https://example.com/series-c",
    publishedAt: "2026-06-03",
    category: "financing",
    summary: "A private neurotech company raised growth capital.",
    companies: ["Synchron"],
    tags: ["Series C", "trial", "financing"],
    status: "candidate",
  },
];

test("scores clinical and regulatory catalysts above generic science items", () => {
  const regulatoryScore = scoreCandidate(candidates[0]);
  const scienceScore = scoreCandidate(candidates[1]);

  assert.ok(regulatoryScore > scienceScore);
});

test("builds a weekly investment report snapshot from candidate events", () => {
  const report = buildReportSnapshot({
    weekId: "2026-W23",
    dateRange: "2026.06.01-06.07",
    candidates,
  });

  assert.equal(report.weekId, "2026-W23");
  assert.equal(report.executiveSummary.topEvents.length, 3);
  assert.equal(report.marketMood, "Constructive");
  assert.equal(report.categoryCounts.regulatory, 1);
  assert.equal(report.categoryCounts.science, 1);
  assert.equal(report.categoryCounts.financing, 1);
  assert.deepEqual(report.catalysts.map((item) => item.id), ["clinical-1"]);
});
