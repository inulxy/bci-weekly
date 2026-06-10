"use client";

import type { CompanyStatus } from "@/data/weekly-data";

interface CompanyTrackerProps {
  companies: CompanyStatus[];
}

function TrendIcon({ trend }: { trend: CompanyStatus["trend"] }) {
  if (trend === "up")
    return (
      <span
        className="font-mono text-xs"
        style={{ color: "#1EE8A0" }}
        title="新进展"
      >
        ↑
      </span>
    );
  if (trend === "stable")
    return (
      <span
        className="font-mono text-xs"
        style={{ color: "#7A95B0" }}
        title="稳定"
      >
        →
      </span>
    );
  return (
    <span
      className="font-mono text-xs"
      style={{ color: "#3D566E" }}
      title="待观察"
    >
      ○
    </span>
  );
}

function StageChip({ stage }: { stage: string }) {
  const colorMap: Record<string, string> = {
    "Phase I": "#1EE8A0",
    "Phase II": "#00D4FF",
    "Phase I/II": "#A78BFA",
    "Pre-clinical": "#F5A624",
  };
  const color = colorMap[stage] ?? "#7A95B0";
  return (
    <span
      className="font-mono text-xs px-1.5 py-0.5 rounded whitespace-nowrap"
      style={{
        color,
        background: color + "14",
        border: `1px solid ${color}33`,
      }}
    >
      {stage}
    </span>
  );
}

export default function CompanyTracker({ companies }: CompanyTrackerProps) {
  return (
    <section
      id="tracker"
      className="max-w-7xl mx-auto px-4 sm:px-6 py-12"
    >
      {/* Section header */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-0.5 h-8 rounded-full"
          style={{ background: "#00D4FF" }}
        />
        <div>
          <h2
            className="font-display font-semibold"
            style={{ fontSize: "1.1rem", color: "#E2EAF4" }}
          >
            公司进展追踪
          </h2>
          <p
            className="font-mono text-xs mt-0.5"
            style={{ color: "#3D566E" }}
          >
            实时更新各主要玩家最新状态
          </p>
        </div>
      </div>

      {/* Table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid rgba(29, 48, 80, 0.8)" }}
      >
        {/* Table header */}
        <div
          className="grid grid-cols-12 px-4 py-2.5 font-mono text-xs"
          style={{
            background: "rgba(15, 27, 45, 0.8)",
            borderBottom: "1px solid rgba(29, 48, 80, 0.8)",
            color: "#3D566E",
          }}
        >
          <div className="col-span-3">公司</div>
          <div className="col-span-2 hidden sm:block">阶段</div>
          <div className="col-span-4 hidden md:block">当前状态</div>
          <div className="col-span-5 md:col-span-3">本周动态</div>
        </div>

        {/* Rows */}
        {companies.map((company, idx) => (
          <div
            key={company.name}
            className="grid grid-cols-12 px-4 py-3 items-center transition-colors duration-150"
            style={{
              background: idx % 2 === 0 ? "#0F1B2D" : "rgba(15, 27, 45, 0.5)",
              borderBottom:
                idx < companies.length - 1
                  ? "1px solid rgba(29, 48, 80, 0.4)"
                  : "none",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#162438")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                idx % 2 === 0 ? "#0F1B2D" : "rgba(15, 27, 45, 0.5)")
            }
          >
            {/* Company name */}
            <div className="col-span-3 flex items-center gap-2">
              <TrendIcon trend={company.trend} />
              <div>
                <div
                  className="font-display font-medium text-sm"
                  style={{ color: "#E2EAF4" }}
                >
                  {company.country} {company.name}
                </div>
                <div
                  className="font-mono text-xs sm:hidden mt-0.5"
                  style={{ color: "#3D566E" }}
                >
                  {company.lastUpdated}
                </div>
              </div>
            </div>

            {/* Stage */}
            <div className="col-span-2 hidden sm:flex items-center">
              <StageChip stage={company.stage} />
            </div>

            {/* Status */}
            <div
              className="col-span-4 hidden md:block font-mono text-xs"
              style={{ color: "#7A95B0" }}
            >
              {company.status}
            </div>

            {/* Highlight */}
            <div className="col-span-5 md:col-span-3">
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#7A95B0" }}
              >
                {company.highlight}
              </p>
              <span
                className="font-mono text-xs mt-1 hidden sm:block"
                style={{ color: "#3D566E" }}
              >
                {company.lastUpdated}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
