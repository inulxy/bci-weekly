const CATEGORY_WEIGHTS = {
  regulatory: 45,
  clinical: 42,
  financing: 34,
  deal: 34,
  company: 28,
  science: 22,
  policy: 20,
  market: 18,
};

const KEYWORD_WEIGHTS = [
  [/breakthrough|BTD|FDA|PMA|510\(k\)|CE mark|NMPA/i, 18],
  [/phase|trial|patient|implant|adverse|MAUDE|pivotal/i, 16],
  [/series|financing|raises|\$|funding|M&A|acquires|merger/i, 12],
  [/Nature|Science|NEJM|Lancet|peer-reviewed/i, 9],
  [/Neuralink|Synchron|Precision|BrainGate|Blackrock|Paradromics/i, 8],
];

export function scoreCandidate(candidate) {
  const base = CATEGORY_WEIGHTS[candidate.category] ?? 10;
  const text = `${candidate.title} ${candidate.summary} ${(candidate.tags ?? []).join(" ")}`;
  const keywordScore = KEYWORD_WEIGHTS.reduce((score, [pattern, weight]) => {
    return pattern.test(text) ? score + weight : score;
  }, 0);
  const companyScore = (candidate.companies?.length ?? 0) > 0 ? 6 : 0;

  return base + keywordScore + companyScore;
}

export function normalizeCandidate(candidate) {
  const score = scoreCandidate(candidate);

  return {
    ...candidate,
    score,
    importance: score >= 65 ? "High" : score >= 42 ? "Medium" : "Low",
    investmentReadThrough: buildReadThrough(candidate),
  };
}

export function buildReportSnapshot({ weekId, dateRange, candidates }) {
  const normalized = candidates
    .map(normalizeCandidate)
    .sort((a, b) => b.score - a.score);

  const topEvents = normalized.slice(0, 3);
  const categoryCounts = normalized.reduce((counts, candidate) => {
    counts[candidate.category] = (counts[candidate.category] ?? 0) + 1;
    return counts;
  }, {});
  const catalysts = normalized.filter((candidate) =>
    ["regulatory", "clinical"].includes(candidate.category)
  );

  return {
    weekId,
    dateRange,
    generatedAt: new Date().toISOString(),
    marketMood: inferMarketMood(normalized),
    executiveSummary: {
      topEvents,
      keyTakeaway: buildKeyTakeaway(topEvents),
    },
    categoryCounts,
    catalysts,
    events: normalized,
    reportSections: buildReportSections(normalized, catalysts),
  };
}

function inferMarketMood(candidates) {
  const highImpactCount = candidates.filter((item) => item.importance === "High").length;
  const clinicalOrRegulatory = candidates.filter((item) =>
    ["clinical", "regulatory"].includes(item.category)
  ).length;

  if (highImpactCount >= 2 || clinicalOrRegulatory >= 2) return "Constructive";
  if (candidates.some((item) => /adverse|delay|halt|safety/i.test(item.title))) {
    return "Cautious";
  }
  return "Mixed";
}

function buildKeyTakeaway(topEvents) {
  if (topEvents.length === 0) {
    return "本周未捕捉到足以改变行业观点的公开事件。";
  }

  const companies = [...new Set(topEvents.flatMap((event) => event.companies ?? []))];
  const companyText = companies.length > 0 ? companies.join("、") : "头部脑机接口玩家";

  return `${companyText} 相关事件主导本周信息流，重点关注监管/临床里程碑对估值重估和融资窗口的影响。`;
}

function buildReadThrough(candidate) {
  const categoryReadThrough = {
    regulatory: "监管节点若被确认，通常会压缩审批不确定性，并提高同路径器械公司的可比估值。",
    clinical: "临床进展会直接影响风险调整后 NPV，需关注样本量、终点指标和安全事件披露。",
    financing: "融资金额和投资方质量可作为一级市场风险偏好的周度温度计。",
    deal: "交易或合作条款可作为潜在 M&A 和授权估值锚点。",
    company: "公司动态的投资含义取决于是否改变商业化时间线或临床资源配置。",
    science: "学术突破本身不改变短期估值，但可改变中期技术路线的胜率判断。",
    policy: "政策变化会影响审批、数据合规和医保支付路径。",
    market: "市场数据用于校准行业 beta 和可比公司估值漂移。",
  };

  return categoryReadThrough[candidate.category] ?? "需要人工审核补充投资含义。";
}

function buildReportSections(events, catalysts) {
  return {
    marketAndValuation: events.filter((event) =>
      ["financing", "deal", "market"].includes(event.category)
    ),
    clinicalAndRegulatory: catalysts,
    scienceAndTechnology: events.filter((event) => event.category === "science"),
    policyAndReimbursement: events.filter((event) => event.category === "policy"),
    corporateActivity: events.filter((event) =>
      ["company", "deal", "financing"].includes(event.category)
    ),
  };
}
