import Link from "next/link";
import type { ReactNode } from "react";

import report from "@/data/generated/report-snapshot.json";

const categoryLabels: Record<string, string> = {
  regulatory: "监管",
  clinical: "临床",
  financing: "融资",
  deal: "交易",
  company: "公司",
  science: "学术/技术",
  policy: "政策/支付",
  market: "市场",
};

const importanceColor: Record<string, string> = {
  High: "#FF4E6A",
  Medium: "#F5A624",
  Low: "#7A95B0",
};

export default function CurrentReportPage() {
  return (
    <main style={{ background: "#080E1A", minHeight: "100vh", color: "#E2EAF4" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <Link
          href="/"
          className="font-mono text-xs"
          style={{ color: "#7A95B0", textDecoration: "none" }}
        >
          ← 返回周报首页
        </Link>

        <header className="mt-8 mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="font-mono text-xs px-2 py-1 rounded"
              style={{
                color: "#00D4FF",
                border: "1px solid rgba(0, 212, 255, 0.25)",
                background: "rgba(0, 212, 255, 0.08)",
              }}
            >
              INTERNAL COVERAGE NOTE
            </span>
            <span className="font-mono text-xs" style={{ color: "#3D566E" }}>
              {report.weekId} · {report.dateRange}
            </span>
          </div>

          <h1
            className="font-display font-semibold leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.04em" }}
          >
            Brain-Computer Interface
            <br />
            <span style={{ color: "#00D4FF" }}>Investment Weekly</span>
          </h1>

          <p className="max-w-2xl mt-5 text-sm leading-relaxed" style={{ color: "#7A95B0" }}>
            按医药投行内部覆盖标准生成的脑机接口行业周度报告。所有自动抓取事件均需人工复核后再用于外部沟通。
          </p>
        </header>

        <section
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          aria-label="Executive summary metrics"
        >
          <Metric label="市场情绪" value={report.marketMood} accent="#1EE8A0" />
          <Metric label="候选事件" value={`${report.events.length}`} accent="#00D4FF" />
          <Metric label="催化剂事件" value={`${report.catalysts.length}`} accent="#F5A624" />
        </section>

        <section className="rounded-xl p-5 mb-8" style={panelStyle}>
          <SectionEyebrow>Executive Summary</SectionEyebrow>
          <h2 className="font-display font-semibold text-xl mb-3">本周核心判断</h2>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "#B6C8DA" }}>
            {report.executiveSummary.keyTakeaway}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {report.executiveSummary.topEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index + 1} />
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ReportBlock
            title="Clinical & Regulatory Pipeline Monitor"
            description="监管节点、临床状态变化和安全信号。"
            events={report.reportSections.clinicalAndRegulatory}
          />
          <ReportBlock
            title="Market & Valuation Snapshot"
            description="融资、交易和可比估值相关事件。"
            events={report.reportSections.marketAndValuation}
          />
          <ReportBlock
            title="Science & Technology Frontier"
            description="顶刊论文、预印本和技术路线变化。"
            events={report.reportSections.scienceAndTechnology}
          />
          <ReportBlock
            title="Corporate Activity"
            description="公司动态、战略合作和授权交易。"
            events={report.reportSections.corporateActivity}
          />
        </section>

        <section className="rounded-xl p-5" style={panelStyle}>
          <SectionEyebrow>Forward Catalyst Calendar</SectionEyebrow>
          <h2 className="font-display font-semibold text-xl mb-4">未来催化剂</h2>
          <div className="space-y-3">
            {report.catalysts.map((event) => (
              <div
                key={event.id}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 rounded-lg p-3"
                style={{ background: "rgba(8, 14, 26, 0.65)" }}
              >
                <span className="font-mono text-xs" style={{ color: "#3D566E" }}>
                  {event.publishedAt}
                </span>
                <span className="font-mono text-xs" style={{ color: "#F5A624" }}>
                  {categoryLabels[event.category] ?? event.category}
                </span>
                <span className="text-sm" style={{ color: "#E2EAF4" }}>
                  {event.title}
                </span>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-10 pt-6" style={{ borderTop: "1px solid rgba(29, 48, 80, 0.6)" }}>
          <p className="font-mono text-xs leading-relaxed" style={{ color: "#3D566E" }}>
            Compliance note: 本页面为内部研究工作流原型，不构成投资建议、医疗建议或证券研究报告。自动抓取内容必须经过人工来源核验。
          </p>
        </footer>
      </div>
    </main>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-xl p-4" style={panelStyle}>
      <div className="font-mono text-xs mb-2" style={{ color: "#3D566E" }}>
        {label}
      </div>
      <div className="font-display font-semibold text-2xl" style={{ color: accent }}>
        {value}
      </div>
    </div>
  );
}

function EventCard({ event, index }: { event: any; index: number }) {
  return (
    <article className="rounded-lg p-4" style={{ background: "rgba(8, 14, 26, 0.7)" }}>
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-xs" style={{ color: "#3D566E" }}>
          TOP {index}
        </span>
        <span
          className="font-mono text-xs px-2 py-0.5 rounded"
          style={{
            color: importanceColor[event.importance] ?? "#7A95B0",
            background: "rgba(29, 48, 80, 0.5)",
          }}
        >
          {event.importance}
        </span>
      </div>
      <h3 className="font-display font-semibold text-sm leading-snug mb-2">{event.title}</h3>
      <p className="text-xs leading-relaxed mb-3" style={{ color: "#7A95B0" }}>
        {event.investmentReadThrough}
      </p>
      <a
        href={event.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-xs"
        style={{ color: "#00D4FF" }}
      >
        ↗ {event.sourceName}
      </a>
    </article>
  );
}

function ReportBlock({
  title,
  description,
  events,
}: {
  title: string;
  description: string;
  events: any[];
}) {
  return (
    <section className="rounded-xl p-5" style={panelStyle}>
      <SectionEyebrow>{title}</SectionEyebrow>
      <p className="text-xs mb-4" style={{ color: "#7A95B0" }}>
        {description}
      </p>
      {events.length === 0 ? (
        <p className="font-mono text-xs" style={{ color: "#3D566E" }}>
          本周暂无已抓取事件。
        </p>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <article key={event.id} className="rounded-lg p-3" style={{ background: "rgba(8, 14, 26, 0.55)" }}>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-xs" style={{ color: "#00D4FF" }}>
                  {categoryLabels[event.category] ?? event.category}
                </span>
                <span className="font-mono text-xs" style={{ color: "#3D566E" }}>
                  {event.publishedAt}
                </span>
              </div>
              <h3 className="font-display font-semibold text-sm mb-1">{event.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "#7A95B0" }}>
                {event.summary}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: "#3D566E" }}>
      {children}
    </div>
  );
}

const panelStyle = {
  background: "#0F1B2D",
  border: "1px solid rgba(29, 48, 80, 0.8)",
};
