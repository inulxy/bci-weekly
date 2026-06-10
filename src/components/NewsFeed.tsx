"use client";

import { useState, useMemo } from "react";
import NewsCard from "./NewsCard";
import type { NewsItem, Category } from "@/data/weekly-data";
import { categoryConfig } from "@/data/weekly-data";

interface NewsFeedProps {
  items: NewsItem[];
}

const ALL = "全部" as const;
type Filter = typeof ALL | Category;

const categories: Category[] = [
  "学术论文",
  "公司动态",
  "临床进展",
  "技术突破",
  "政策法规",
  "投融资",
  "会议活动",
];

export default function NewsFeed({ items }: NewsFeedProps) {
  const [active, setActive] = useState<Filter>(ALL);
  const [sortByImportance, setSortByImportance] = useState(true);

  const filtered = useMemo(() => {
    let list = active === ALL ? items : items.filter((i) => i.category === active);
    if (sortByImportance) {
      list = [...list].sort((a, b) => b.importance - a.importance);
    }
    return list;
  }, [items, active, sortByImportance]);

  const countFor = (cat: Category) => items.filter((i) => i.category === cat).length;

  return (
    <div className="flex flex-col gap-5">
      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {/* All */}
          <button
            onClick={() => setActive(ALL)}
            className="badge transition-all duration-150"
            style={{
              color: active === ALL ? "#080E1A" : "#7A95B0",
              background: active === ALL ? "#00D4FF" : "rgba(29, 48, 80, 0.4)",
              border: `1px solid ${active === ALL ? "#00D4FF" : "rgba(29, 48, 80, 0.8)"}`,
              cursor: "pointer",
              fontSize: "11px",
              padding: "4px 10px",
            }}
          >
            全部 {items.length}
          </button>

          {categories.map((cat) => {
            const cfg = categoryConfig[cat];
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="badge transition-all duration-150"
                style={{
                  color: isActive ? "#080E1A" : cfg.color,
                  background: isActive ? cfg.color : cfg.bg,
                  border: `1px solid ${isActive ? cfg.color : cfg.color + "33"}`,
                  cursor: "pointer",
                  fontSize: "11px",
                  padding: "4px 10px",
                }}
              >
                {cfg.icon} {cat} {countFor(cat)}
              </button>
            );
          })}
        </div>

        {/* Sort toggle */}
        <button
          onClick={() => setSortByImportance(!sortByImportance)}
          className="sm:ml-auto flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 rounded transition-all duration-150"
          style={{
            background: sortByImportance
              ? "rgba(245, 166, 36, 0.1)"
              : "rgba(29, 48, 80, 0.4)",
            color: sortByImportance ? "#F5A624" : "#7A95B0",
            border: `1px solid ${sortByImportance ? "rgba(245, 166, 36, 0.3)" : "rgba(29, 48, 80, 0.8)"}`,
          }}
        >
          <span>{sortByImportance ? "▼" : "≡"}</span>
          <span>{sortByImportance ? "重要程度" : "时间顺序"}</span>
        </button>
      </div>

      {/* Result count */}
      <div className="flex items-center gap-2">
        <span
          className="font-mono text-xs"
          style={{ color: "#3D566E" }}
        >
          显示 {filtered.length} 条
          {active !== ALL && ` · ${active}`}
        </span>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((item, idx) => (
          <NewsCard key={item.id} item={item} index={idx} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div
          className="text-center py-16 font-mono text-sm"
          style={{ color: "#3D566E" }}
        >
          本周暂无此类别内容
        </div>
      )}
    </div>
  );
}
