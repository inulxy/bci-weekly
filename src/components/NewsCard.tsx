"use client";

import type { NewsItem, Category } from "@/data/weekly-data";
import { categoryConfig } from "@/data/weekly-data";

interface NewsCardProps {
  item: NewsItem;
  index: number;
}

function ImportanceDots({ level }: { level: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: i <= level ? "#F5A624" : "rgba(61, 86, 110, 0.5)",
          }}
        />
      ))}
    </div>
  );
}

function CategoryBadge({ category }: { category: Category }) {
  const cfg = categoryConfig[category];
  return (
    <span
      className="badge"
      style={{
        color: cfg.color,
        background: cfg.bg,
        border: `1px solid ${cfg.color}22`,
      }}
    >
      <span>{cfg.icon}</span>
      {category}
    </span>
  );
}

export default function NewsCard({ item, index }: NewsCardProps) {
  const cfg = categoryConfig[item.category];

  return (
    <article
      className="card-border-glow rounded-lg p-5 transition-all duration-200 animate-slide-up"
      style={{
        background: "#0F1B2D",
        border: "1px solid rgba(29, 48, 80, 0.8)",
        animationDelay: `${index * 60}ms`,
        animationFillMode: "both",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "#162438";
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(29, 48, 80, 1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "#0F1B2D";
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(29, 48, 80, 0.8)";
      }}
    >
      {/* Top row: category + importance + date */}
      <div className="flex items-center justify-between mb-3">
        <CategoryBadge category={item.category} />
        <div className="flex items-center gap-3">
          <ImportanceDots level={item.importance} />
          <span
            className="font-mono text-xs"
            style={{ color: "#3D566E" }}
          >
            {item.date.slice(5)}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3
        className="font-display font-semibold mb-2 leading-snug"
        style={{
          fontSize: "0.95rem",
          color: "#E2EAF4",
          letterSpacing: "-0.01em",
        }}
      >
        {item.importance === 3 && (
          <span
            className="inline-block w-1.5 h-1.5 rounded-full mr-2 pulse-dot"
            aria-hidden="true"
          />
        )}
        {item.title}
      </h3>

      {/* Summary */}
      <p
        className="text-sm leading-relaxed mb-4"
        style={{ color: "#7A95B0" }}
      >
        {item.summary}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs px-2 py-0.5 rounded"
            style={{
              background: "rgba(29, 48, 80, 0.5)",
              color: "#3D566E",
              border: "1px solid rgba(29, 48, 80, 0.8)",
            }}
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer: source link */}
      <div
        className="flex items-center justify-between pt-3"
        style={{ borderTop: "1px solid rgba(29, 48, 80, 0.6)" }}
      >
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-mono transition-colors duration-150"
          style={{ color: cfg.color, opacity: 0.8 }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.opacity = "1")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.opacity = "0.8")
          }
        >
          <span>↗</span>
          <span>{item.source}</span>
        </a>
        <span
          className="font-mono text-xs"
          style={{ color: "#3D566E" }}
        >
          {item.id.toUpperCase()}
        </span>
      </div>
    </article>
  );
}
