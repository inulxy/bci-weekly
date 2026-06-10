"use client";

import { useEffect, useState } from "react";
import EegWaveform from "./EegWaveform";
import type { WeekMeta } from "@/data/weekly-data";

interface HeroSectionProps {
  meta: WeekMeta;
}

const stats = [
  { value: 14, label: "论文收录", suffix: "篇", color: "#00D4FF" },
  { value: 4, label: "融资事件", suffix: "起", color: "#F5A624" },
  { value: 3, label: "临床进展", suffix: "条", color: "#1EE8A0" },
  { value: 2, label: "监管动态", suffix: "条", color: "#A78BFA" },
];

function AnimatedNumber({ target, color }: { target: number; color: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span style={{ color }} className="font-mono font-semibold">
      {count}
    </span>
  );
}

export default function HeroSection({ meta }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="weekly"
      className="relative pt-14 overflow-hidden"
      style={{ minHeight: "420px" }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-overlay" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0, 212, 255, 0.06) 0%, transparent 70%)",
        }}
      />

      {/* EEG waveform strip */}
      <div className="absolute bottom-0 left-0 right-0">
        {mounted && <EegWaveform height={64} opacity={0.25} />}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Week label */}
        <div className="flex items-center gap-3 mb-6">
          <span
            className="font-mono text-xs px-2 py-1 rounded"
            style={{
              background: "rgba(0, 212, 255, 0.08)",
              color: "#00D4FF",
              border: "1px solid rgba(0, 212, 255, 0.2)",
            }}
          >
            W{meta.weekNumber} · {meta.dateRange}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="pulse-dot" />
            <span className="font-mono text-xs" style={{ color: "#7A95B0" }}>
              实时追踪中
            </span>
          </div>
        </div>

        {/* Main headline */}
        <h1
          className="font-display font-semibold leading-tight mb-4 max-w-3xl"
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.4rem)",
            color: "#E2EAF4",
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#7A95B0", fontWeight: 400, fontSize: "0.6em" }}>
            本周头条 ·{" "}
          </span>
          <br className="sm:hidden" />
          {meta.headline}
        </h1>

        {/* Stats row */}
        <div className="flex flex-wrap gap-6 mt-10">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-0.5">
              <div
                className="font-mono leading-none"
                style={{ fontSize: "2rem" }}
              >
                {mounted ? (
                  <AnimatedNumber target={stat.value} color={stat.color} />
                ) : (
                  <span style={{ color: stat.color }}>{stat.value}</span>
                )}
                <span
                  className="font-mono text-sm ml-0.5"
                  style={{ color: stat.color, opacity: 0.7 }}
                >
                  {stat.suffix}
                </span>
              </div>
              <span
                className="text-xs font-mono"
                style={{ color: "#3D566E" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Divider with signal */}
        <div className="mt-10 flex items-center gap-4">
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(29, 48, 80, 0.8)" }}
          />
          <span className="font-mono text-xs" style={{ color: "#3D566E" }}>
            ↓ 本周全部动态
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(29, 48, 80, 0.8)" }}
          />
        </div>
      </div>
    </section>
  );
}
