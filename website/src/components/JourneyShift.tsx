/** The market shift, drawn to produce the realization, not to document it.
 *  In the Before row, Evaluation is marked at its old position — late, in
 *  direct contact with you. In the Now row the same step has jumped ahead
 *  of engagement, and the moved cluster is annotated with the page's own
 *  sentence: it happens without you. The eye tracks the displacement; the
 *  caption says why it matters even after the mechanism changes. */

type Step = { label: string; tone?: "moved" | "late" | "origin" };

const BEFORE: Step[] = [
  { label: "Question" },
  { label: "Search" },
  { label: "Direct engagement" },
  { label: "Evaluation", tone: "origin" },
  { label: "Decision" },
];

const AFTER: Step[] = [
  { label: "Question" },
  { label: "Evaluation", tone: "moved" },
  { label: "Recommendation", tone: "moved" },
  { label: "Shortlist", tone: "moved" },
  { label: "Direct engagement", tone: "late" },
  { label: "Decision" },
];

function Row({ title, note, steps }: { title: string; note?: string; steps: Step[] }) {
  return (
    <div>
      <div className="voice-mono" style={{ color: "var(--ink-60)" }}>
        {title}
        {note && <span> · {note}</span>}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2">
        {steps.map((s, i) => (
          <span key={s.label} className="flex items-center gap-1.5">
            <span
              className={`voice-mono whitespace-nowrap${s.tone === "moved" ? " pill" : ""}`}
              style={
                s.tone === "moved"
                  ? undefined
                  : s.tone === "origin"
                    ? {
                        color: "var(--ink)",
                        borderBottom: "2px solid var(--needle)",
                        paddingBottom: "2px",
                      }
                    : { color: s.tone === "late" ? "var(--ink-60)" : "var(--ink)" }
              }
            >
              {s.label}
              {s.tone === "late" ? " (sometimes)" : ""}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden style={{ color: "var(--ink-40)" }}>
                &rarr;
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export function JourneyShift() {
  return (
    <div className="card mt-8 space-y-6 p-7 sm:p-8">
      <Row title="Before" note="the buyer evaluated you directly" steps={BEFORE} />
      <div className="h-px w-full" style={{ background: "var(--ink-18)" }} />
      <div>
        <Row
          title="Now"
          note="today's mechanism: an LLM"
          steps={AFTER}
        />
        {/* the annotation IS the aha: the moved cluster, named with the
            page's own headline language */}
        <div className="mt-3 flex items-center gap-2" aria-hidden>
          <span className="h-px w-20" style={{ background: "var(--needle)" }} />
          <span className="voice-mono" style={{ color: "var(--needle)" }}>
            happens without you
          </span>
        </div>
      </div>
      <p className="max-w-[52ch] pt-1 italic" style={{ color: "var(--ink-60)" }}>
        The mechanism will keep changing. The shift is durable: more of
        commercial evaluation concludes before you know it began.
      </p>
    </div>
  );
}
