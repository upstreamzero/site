import { LIFECYCLE } from "@/lib/pillars";
import type { LifecycleStageKey } from "@/lib/pillars";

/** The single commercial evaluation lifecycle, rendered consistently on every
 *  Learn page. The stages a concept acts on are highlighted, so a reader (or a
 *  retrieval system) can place the concept in the whole loop rather than read
 *  it as an isolated definition. It is a loop: measurement feeds back into
 *  business outcomes. */
export function Lifecycle({ active = [] }: { active?: LifecycleStageKey[] }) {
  const set = new Set(active);
  return (
    <div className="lifecycle" role="list" aria-label="Commercial evaluation lifecycle">
      {LIFECYCLE.map((s, i) => (
        <span
          key={s.key}
          role="listitem"
          className={`lc-stage${set.has(s.key) ? " lc-on" : ""}`}
          aria-current={set.has(s.key) ? "true" : undefined}
        >
          {s.label}
          {i < LIFECYCLE.length - 1 && (
            <span className="lc-arrow" aria-hidden="true">
              →
            </span>
          )}
        </span>
      ))}
      <span className="lc-loop" aria-hidden="true">
        ↺ back to business outcomes
      </span>
    </div>
  );
}
