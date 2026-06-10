"use client";

import type { NewsItem, Category } from "@/data/weekly-data";
import { categoryConfig, archiveWeeks } from "@/data/weekly-data";

interface SidebarProps {
  items: NewsItem[];
}

function HotTags({ items }: { items: NewsItem[] }) {
  const tagCount: Record<string, number> = {};
  items.forEach((item) => {
    item.tags.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] ?? 0) + 1;
    });
  });

  const sorted = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 14);

  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: "#0F1B2D",
        border: "1px solid rgba(29, 48, 80, 0.8)",
      }}
    >
      <h3
        className="font-display font-semibold text-sm mb-3"
        style={{ color: "#E2EAF4" }}
      >
        本周热词
      </h3>
      <div className="flex flex-wrap gap-2">
        {sorted.map(([tag, count]) => (
          <span
            key={tag}
            className="font-mono text-xs px-2 py-1 rounded transition-all duration-150 cursor-default"
            style={{
              background: "rgba(29, 48, 80, 0.5)",
              color: count >= 3 ? "#00D4FF" : count === 2 ? "#7A95B0" : "#3D566E",
              border: `1px solid ${count >= 3 ? "rgba(0, 212, 255, 0.2)" : "rgba(29, 48, 80, 0.8)"}`,
              fontSize: count >= 3 ? "12px" : "11px",
            }}
          >
            #{tag}
            {count > 1 && (
              <span style={{ opacity: 0.5, marginLeft: "3px" }}>×{count}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function CategoryBreakdown({ items }: { items: NewsItem[] }) {
  const categories = Object.keys(categoryConfig) as Category[];
  const counts = categories.map((cat) => ({
    cat,
    count: items.filter((i) => i.category === cat).length,
  }));
  const max = Math.max(...counts.map((c) => c.count));

  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: "#0F1B2D",
        border: "1px solid rgba(29, 48, 80, 0.8)",
      }}
    >
      <h3
        className="font-display font-semibold text-sm mb-4"
        style={{ color: "#E2EAF4" }}
      >
        分类分布
      </h3>
      <div className="flex flex-col gap-2.5">
        {counts
          .filter((c) => c.count > 0)
          .sort((a, b) => b.count - a.count)
          .map(({ cat, count }) => {
            const cfg = categoryConfig[cat];
            return (
              <div key={cat} className="flex items-center gap-3">
                <span
                  className="font-mono text-xs w-16 shrink-0"
                  style={{ color: "#7A95B0" }}
                >
                  {cat}
                </span>
                <div
                  className="flex-1 h-1.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(29, 48, 80, 0.6)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(count / max) * 100}%`,
                      background: cfg.color,
                      opacity: 0.7,
                    }}
                  />
                </div>
                <span
                  className="font-mono text-xs w-4 text-right"
                  style={{ color: cfg.color }}
                >
                  {count}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

function ArchivePanel() {
  return (
    <div
      id="archive"
      className="rounded-xl p-4"
      style={{
        background: "#0F1B2D",
        border: "1px solid rgba(29, 48, 80, 0.8)",
      }}
    >
      <h3
        className="font-display font-semibold text-sm mb-3"
        style={{ color: "#E2EAF4" }}
      >
        往期归档
      </h3>
      <div className="flex flex-col gap-1">
        {archiveWeeks.map((week) => (
          <a
            key={week.week}
            href="#"
            className="flex items-center justify-between px-2 py-1.5 rounded-md transition-all duration-150 group"
            style={{ textDecoration: "none" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(29, 48, 80, 0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="font-mono text-xs"
                style={{ color: "#3D566E" }}
              >
                W{week.week}
              </span>
              <span
                className="font-mono text-xs"
                style={{ color: "#7A95B0" }}
              >
                {week.dateRange}
              </span>
            </div>
            <span
              className="font-mono text-xs"
              style={{ color: "#3D566E" }}
            >
              {week.itemCount} 条
            </span>
          </a>
        ))}
      </div>
      <a
        href="#"
        className="block mt-3 text-center font-mono text-xs py-2 rounded-md transition-all duration-150"
        style={{
          color: "#3D566E",
          border: "1px dashed rgba(29, 48, 80, 0.8)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.color = "#7A95B0";
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(122, 149, 176, 0.3)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.color = "#3D566E";
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(29, 48, 80, 0.8)";
        }}
      >
        查看全部归档 →
      </a>
    </div>
  );
}

function SubscribePanel() {
  return (
    <div
      id="subscribe"
      className="rounded-xl p-4"
      style={{
        background: "rgba(0, 212, 255, 0.04)",
        border: "1px solid rgba(0, 212, 255, 0.15)",
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span style={{ color: "#00D4FF", fontSize: "14px" }}>⬡</span>
        <h3
          className="font-display font-semibold text-sm"
          style={{ color: "#E2EAF4" }}
        >
          订阅周报
        </h3>
      </div>
      <p
        className="text-xs mb-3 leading-relaxed"
        style={{ color: "#7A95B0" }}
      >
        每周一送达，不漏掉任何重要进展
      </p>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-2"
      >
        <input
          type="email"
          placeholder="your@email.com"
          className="w-full text-sm px-3 py-2 rounded-md font-mono outline-none transition-all duration-150"
          style={{
            background: "rgba(8, 14, 26, 0.8)",
            border: "1px solid rgba(29, 48, 80, 0.8)",
            color: "#E2EAF4",
          }}
          onFocus={(e) => {
            (e.target as HTMLElement).style.borderColor =
              "rgba(0, 212, 255, 0.4)";
          }}
          onBlur={(e) => {
            (e.target as HTMLElement).style.borderColor =
              "rgba(29, 48, 80, 0.8)";
          }}
        />
        <button
          type="submit"
          className="w-full text-sm font-mono py-2 rounded-md transition-all duration-150 font-medium"
          style={{
            background: "rgba(0, 212, 255, 0.12)",
            color: "#00D4FF",
            border: "1px solid rgba(0, 212, 255, 0.25)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              "rgba(0, 212, 255, 0.2)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              "rgba(0, 212, 255, 0.12)";
          }}
        >
          免费订阅
        </button>
      </form>
    </div>
  );
}

export default function Sidebar({ items }: SidebarProps) {
  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
      <SubscribePanel />
      <CategoryBreakdown items={items} />
      <HotTags items={items} />
      <ArchivePanel />
    </aside>
  );
}
