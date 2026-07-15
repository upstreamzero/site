import Link from "next/link";

/** The question-native rendering model, V1.
 *
 *  The atomic unit of the human-facing site is a RESOLVED QUESTION:
 *  question → direct answer in the first sentence → explanation →
 *  evidence → limitations → related questions. The ontology powers the
 *  evidence quietly; humans never navigate the graph directly. */

export function ResolvedQuestion({
  id,
  question,
  answer,
  children,
}: {
  id: string;
  question: string;
  answer: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-16 scroll-mt-8 border-t pt-10 first-of-type:border-t-0 first-of-type:pt-0" style={{ borderColor: "var(--ink-18)" }}>
      <h2 className="max-w-[30ch] text-[1.35rem] leading-snug">{question}</h2>
      <p className="measure mt-4 text-[1.02rem]">
        <strong className="font-semibold">{answer}</strong>
      </p>
      {children}
    </section>
  );
}

export function QPart({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-7">
      <h3 className="voice-mono" style={{ color: "var(--ink-60)" }}>
        {label}
      </h3>
      <div className="measure mt-2 space-y-4 text-[0.98rem]">{children}</div>
    </div>
  );
}

export function RelatedQuestions({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  return (
    <QPart label="Related questions">
      <ul className="m-0 list-none space-y-2 p-0">
        {items.map((r) => (
          <li key={r.href} className="border-l pl-4" style={{ borderColor: "var(--ink-18)" }}>
            <Link href={r.href}>{r.label}</Link>
          </li>
        ))}
      </ul>
    </QPart>
  );
}

/** Inline founder-decision marker — the compact form for use inside
 *  limitations, where the full hatched block would break the reading walk. */
export function FDInline({ id }: { id: string }) {
  return (
    <span className="voice-mono" style={{ color: "var(--needle)" }}>
      founder decision pending · {id}
    </span>
  );
}
