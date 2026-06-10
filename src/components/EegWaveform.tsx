"use client";

import { useEffect, useRef } from "react";

interface EegWaveformProps {
  className?: string;
  height?: number;
  opacity?: number;
}

// Generate a realistic-looking EEG spike train path
function generateEegPath(width: number, height: number): string {
  const midY = height / 2;
  const segments: string[] = [];
  let x = 0;

  segments.push(`M 0 ${midY}`);

  while (x < width) {
    // Baseline noise
    const noiseLen = 20 + Math.random() * 30;
    const noiseY = midY + (Math.random() - 0.5) * 4;
    segments.push(`L ${x + noiseLen} ${noiseY}`);
    x += noiseLen;

    // Random spike event
    if (Math.random() > 0.6 && x < width - 60) {
      // Pre-spike dip
      segments.push(`L ${x + 4} ${midY + 6}`);
      // Sharp upstroke
      segments.push(`L ${x + 6} ${midY - height * 0.35}`);
      // Fast downstroke through baseline
      segments.push(`L ${x + 10} ${midY + height * 0.2}`);
      // Return to baseline
      segments.push(`L ${x + 16} ${midY + 2}`);
      x += 20;
    }

    // Occasional slow wave
    if (Math.random() > 0.75 && x < width - 80) {
      const waveLen = 40 + Math.random() * 30;
      const amp = height * 0.12;
      segments.push(
        `Q ${x + waveLen / 2} ${midY - amp} ${x + waveLen} ${midY}`
      );
      x += waveLen;
    }
  }

  segments.push(`L ${width} ${midY}`);
  return segments.join(" ");
}

export default function EegWaveform({
  className = "",
  height = 80,
  opacity = 0.35,
}: EegWaveformProps) {
  const pathRef1 = useRef<SVGPathElement>(null);
  const pathRef2 = useRef<SVGPathElement>(null);
  const width = 1200;

  // Generate two copies for seamless loop
  const path1 = generateEegPath(width, height);
  const path2 = generateEegPath(width, height);

  useEffect(() => {
    // Draw-in animation
    const paths = [pathRef1.current, pathRef2.current];
    paths.forEach((path) => {
      if (!path) return;
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);
      path.style.transition = "stroke-dashoffset 3s ease-out";
      requestAnimationFrame(() => {
        path.style.strokeDashoffset = "0";
      });
    });
  }, []);

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${width * 2} ${height}`}
        preserveAspectRatio="none"
        width="200%"
        height={height}
        className="animate-eeg-scroll"
        style={{ animationDuration: "16s" }}
      >
        <path
          ref={pathRef1}
          d={path1}
          fill="none"
          stroke="#00D4FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          ref={pathRef2}
          d={path2}
          fill="none"
          stroke="#00D4FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform={`translate(${width}, 0)`}
        />
      </svg>
    </div>
  );
}
