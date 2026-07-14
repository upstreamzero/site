/** A founder decision that has not been made yet, rendered as exactly
 *  that — never silently filled (Phase 6 brief). The hatched treatment
 *  marks non-evidence, like the SPECIMEN register. */
export function FounderDecision({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="my-6 max-w-[62ch] border p-4"
      style={{
        borderColor: "var(--needle)",
        background:
          "repeating-linear-gradient(45deg, transparent 0 6px, rgba(181,67,42,0.05) 6px 12px)",
      }}
    >
      <span className="voice-mono" style={{ color: "var(--needle)" }}>
        Founder decision pending · {id}
      </span>
      <div className="mt-2 text-[0.95rem]" style={{ color: "var(--ink-60)" }}>
        {children}
      </div>
    </div>
  );
}
