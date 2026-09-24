"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type MetamorphFieldProps = {
  className?: string;
  /** `dark` = light strokes on navy/hero; `light` = ink strokes on sand/muted */
  tone?: "dark" | "light";
  /** Visual density of the constellation */
  density?: "sparse" | "normal";
};

type Node = { x: number; y: number; r?: number };
type Edge = [number, number];

/** Landscape constellation — matches typical flex section bands (≈ 2.5∶1) */
const NODES_NORMAL: Node[] = [
  { x: 40, y: 60, r: 2.1 },
  { x: 130, y: 36, r: 1.7 },
  { x: 220, y: 88, r: 2.4 },
  { x: 100, y: 140, r: 1.5 },
  { x: 190, y: 168, r: 2.0 },
  { x: 310, y: 110, r: 1.6 },
  { x: 400, y: 48, r: 2.2 },
  { x: 480, y: 130, r: 1.8 },
  { x: 560, y: 70, r: 2.5 },
  { x: 650, y: 150, r: 1.6 },
  { x: 740, y: 40, r: 1.9 },
  { x: 830, y: 120, r: 2.1 },
  { x: 920, y: 64, r: 1.7 },
  { x: 1010, y: 140, r: 2.0 },
  { x: 1100, y: 90, r: 1.5 },
  { x: 70, y: 240, r: 2.3 },
  { x: 170, y: 280, r: 1.6 },
  { x: 280, y: 230, r: 2.0 },
  { x: 370, y: 300, r: 1.8 },
  { x: 470, y: 250, r: 2.2 },
  { x: 570, y: 310, r: 1.7 },
  { x: 680, y: 260, r: 2.4 },
  { x: 780, y: 320, r: 1.6 },
  { x: 880, y: 270, r: 2.0 },
  { x: 980, y: 330, r: 1.8 },
  { x: 1080, y: 280, r: 2.1 },
  { x: 120, y: 380, r: 1.5 },
  { x: 250, y: 410, r: 2.2 },
  { x: 390, y: 390, r: 1.7 },
  { x: 530, y: 430, r: 2.0 },
  { x: 670, y: 400, r: 1.9 },
  { x: 810, y: 440, r: 1.6 },
  { x: 950, y: 410, r: 2.3 },
  { x: 1090, y: 450, r: 1.8 },
];

const EDGES_NORMAL: Edge[] = [
  [0, 1], [1, 2], [0, 3], [1, 3], [2, 4], [3, 4], [2, 5], [4, 5],
  [5, 6], [5, 7], [6, 7], [6, 8], [7, 8], [8, 9], [7, 9],
  [8, 10], [9, 11], [10, 11], [10, 12], [11, 12], [12, 13], [11, 13], [13, 14],
  [3, 15], [4, 16], [5, 17], [7, 18], [8, 19], [9, 20], [11, 21], [12, 22], [13, 23], [14, 24],
  [15, 16], [16, 17], [17, 18], [18, 19], [19, 20], [20, 21], [21, 22], [22, 23], [23, 24], [24, 25],
  [15, 26], [16, 27], [18, 28], [19, 29], [21, 30], [22, 31], [24, 32], [25, 33],
  [26, 27], [27, 28], [28, 29], [29, 30], [30, 31], [31, 32], [32, 33],
];

const NODES_SPARSE = NODES_NORMAL.filter((_, i) => i % 2 === 0);
const EDGES_SPARSE: Edge[] = [
  [0, 1], [1, 2], [0, 3], [2, 4], [3, 4], [3, 5], [4, 6], [5, 6],
  [5, 7], [6, 8], [7, 8], [7, 9], [8, 10], [9, 10], [9, 11], [10, 12],
  [11, 12], [11, 13], [12, 14], [13, 14], [13, 15], [14, 16], [15, 16],
];

const VIEW_W = 1200;
const VIEW_H = 480;

const ENABLE_MQ =
  "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

/**
 * Decorative constellation. Mounted only on desktop with motion allowed —
 * SMIL/CSS motion was too expensive on phones.
 */
export function MetamorphField({
  className,
  tone = "dark",
  density = "normal",
}: MetamorphFieldProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(ENABLE_MQ);
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!enabled) return null;

  const nodes = density === "sparse" ? NODES_SPARSE : NODES_NORMAL;
  const edges = density === "sparse" ? EDGES_SPARSE : EDGES_NORMAL;
  const stroke =
    tone === "dark" ? "color-mix(in oklab, white 55%, transparent)" : "var(--foreground)";
  const fill =
    tone === "dark" ? "color-mix(in oklab, white 70%, transparent)" : "var(--primary)";
  const accent = tone === "dark" ? "var(--accent)" : "var(--primary)";

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-[1] overflow-hidden metamorph-field",
        tone === "light" ? "opacity-[0.14]" : "opacity-[0.42]",
        className,
      )}
      aria-hidden
    >
      <svg
        className="block size-full max-h-none max-w-none"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <g stroke={stroke} strokeWidth="0.9">
          {edges.map(([a, b], i) => {
            const n1 = nodes[a];
            const n2 = nodes[b];
            if (!n1 || !n2) return null;
            return (
              <line
                key={`e-${i}`}
                x1={n1.x}
                y1={n1.y}
                x2={n2.x}
                y2={n2.y}
                opacity="0.55"
              />
            );
          })}
        </g>
        <g>
          {nodes.map((n, i) => (
            <circle
              key={`n-${i}`}
              cx={n.x}
              cy={n.y}
              r={n.r ?? 2}
              fill={i % 5 === 0 ? accent : fill}
              opacity={i % 5 === 0 ? 0.85 : 0.7}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
