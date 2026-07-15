/** The N=0 register: a designed truth, not an apology. */
export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="my-6 max-w-[62ch] border border-dashed p-5"
      style={{ borderColor: "var(--ink-40)" }}
    >
      <span className="voice-mono" style={{ color: "var(--ink-60)" }}>
        N = 0
      </span>
      <p className="mt-2 text-[0.95rem]" style={{ color: "var(--ink-60)" }}>
        {children}
      </p>
    </div>
  );
}
