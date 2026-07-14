import { TIERS, type Tier } from "@/lib/schema";

/** The graduated tier scale (DESIGN_SYSTEM §6): earned positions solid,
 *  unearned outlined. Always labeled — instruments are labeled. */
export function TierScale({ tier }: { tier: Tier }) {
  const idx = TIERS.indexOf(tier);
  return (
    <span className="inline-flex items-center gap-3">
      <svg width="132" height="22" viewBox="0 0 132 22" aria-hidden>
        <line
          x1="3"
          y1="13"
          x2="129"
          y2="13"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.4"
        />
        {TIERS.map((t, i) => {
          const x = 1 + i * 25;
          return i <= idx ? (
            <rect key={t} x={x} y="6" width="5" height="14" fill="currentColor" />
          ) : (
            <rect
              key={t}
              x={x}
              y="6"
              width="5"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          );
        })}
      </svg>
      <span className="voice-mono-data" style={{ color: "var(--ink-60)" }}>
        {tier} · {idx + 1} of {TIERS.length}
      </span>
    </span>
  );
}
