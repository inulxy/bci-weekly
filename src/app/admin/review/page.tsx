import Link from "next/link";

import candidates from "@/data/generated/weekly-candidates.json";

const categoryLabels: Record<string, string> = {
  regulatory: "监管",
  clinical: "临床",
  financing: "融资",
  deal: "交易",
  company: "公司动态",
  science: "学术/技术",
  policy: "政策/支付",
  market: "市场",
};

export default function ReviewPage() {
  return (
    <main style={{ background: "#080E1A", minHeight: "100vh", color: "#E2EAF4" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/reports/current"
            className="font-mono text-xs"
            style={{ color: "#7A95B0", textDecoration: "none" }}
          >
            ← 查看当前报告
          </Link>
          <span
            className="font-mono text-xs px-2 py-1 rounded"
            style={{
              color: "#F5A624",
              background: "rgba(245, 166, 36, 0.1)",
              border: "1px solid rgba(245, 166, 36, 0.25)",
            }}
          >
            LOCAL REVIEW WORKBENCH
          </span>
        </div>

        <header className="mb-8">
          <h1
            className="font-display font-semibold"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}
          >
            每周候选事件审核
          </h1>
          <p className="text-sm max-w-2xl mt-3 leading-relaxed" style={{ color: "#7A95B0" }}>
            这里展示自动抓取脚本产出的候选事件。第一版采用文件审核流程：复制需要保留的事件，补充投资含义后写入正式报告数据。
          </p>
        </header>

        <section className="rounded-xl p-5 mb-8" style={panelStyle}>
          <h2 className="font-display font-semibold text-lg mb-3">审核流程</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {[
              ["1", "运行抓取", "npm run update:weekly"],
              ["2", "检查来源", "打开每条 sourceUrl 核验原文"],
              ["3", "补充口径", "写入估值影响、催化剂、风险"],
              ["4", "提交发布", "git commit 后 Vercel 自动部署"],
            ].map(([step, title, body]) => (
              <div key={step} className="rounded-lg p-3" style={{ background: "rgba(8, 14, 26, 0.7)" }}>
                <div className="font-mono text-xs mb-2" style={{ color: "#00D4FF" }}>
                  STEP {step}
                </div>
                <h3 className="font-display font-semibold text-sm mb-1">{title}</h3>
                <p className="font-mono text-xs leading-relaxed" style={{ color: "#7A95B0" }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          {candidates.map((candidate) => (
            <article key={candidate.id} className="rounded-xl p-5" style={panelStyle}>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className="font-mono text-xs px-2 py-0.5 rounded"
                  style={{
                    color: "#00D4FF",
                    background: "rgba(0, 212, 255, 0.08)",
                    border: "1px solid rgba(0, 212, 255, 0.18)",
                  }}
                >
                  {categoryLabels[candidate.category] ?? candidate.category}
                </span>
                <span className="font-mono text-xs" style={{ color: "#3D566E" }}>
                  {candidate.publishedAt}
                </span>
                <span className="font-mono text-xs" style={{ color: "#3D566E" }}>
                  {candidate.sourceName}
                </span>
              </div>

              <h2 className="font-display font-semibold text-lg mb-2">{candidate.title}</h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#7A95B0" }}>
                {candidate.summary}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <ReviewField
                  label="建议操作"
                  value="保留 / 排除 / 合并同类事件"
                  accent="#F5A624"
                />
                <ReviewField
                  label="需补充"
                  value="估值影响、read-through、风险、催化剂窗口"
                  accent="#00D4FF"
                />
                <ReviewField
                  label="涉及公司"
                  value={candidate.companies.length > 0 ? candidate.companies.join("、") : "待人工识别"}
                  accent="#1EE8A0"
                />
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {candidate.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2 py-0.5 rounded"
                    style={{ color: "#3D566E", background: "rgba(29, 48, 80, 0.5)" }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <a
                href={candidate.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 font-mono text-xs"
                style={{ color: "#00D4FF" }}
              >
                ↗ 打开原始来源
              </a>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

function ReviewField({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="rounded-lg p-3" style={{ background: "rgba(8, 14, 26, 0.6)" }}>
      <div className="font-mono text-xs mb-1" style={{ color: accent }}>
        {label}
      </div>
      <p className="text-xs leading-relaxed" style={{ color: "#7A95B0" }}>
        {value}
      </p>
    </div>
  );
}

const panelStyle = {
  background: "#0F1B2D",
  border: "1px solid rgba(29, 48, 80, 0.8)",
};
