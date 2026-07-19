import Link from "next/link";
import type { UZObject } from "@/lib/schema";
import { urlFor } from "@/lib/content";

/** The featured experiment summary. Every field derives from the canonical
 *  frontmatter, so this card, the experiment page, and the machine surfaces
 *  can never drift apart. Used wherever a featured summary appears. */
export function ExperimentCard({ obj }: { obj: UZObject }) {
  return (
    <article className="card exp-card">
      <div className="flex flex-wrap items-center gap-2">
        <span className="chip">{obj.id}</span>
        <span className="chip">{obj.status}</span>
        {obj.outcome && (
          <span className="chip chip-accent">{obj.outcome}</span>
        )}
      </div>

      {obj.category && <p className="eyebrow mt-6">{obj.category}</p>}
      <h3 className="mt-2">
        <Link href={urlFor(obj)}>{obj.title}</Link>
      </h3>

      <dl className="exp-fields">
        {obj.question && (
          <div>
            <dt className="eyebrow">Question</dt>
            <dd>{obj.question}</dd>
          </div>
        )}
        {obj.businessProblem && (
          <div>
            <dt className="eyebrow">Business problem</dt>
            <dd>{obj.businessProblem}</dd>
          </div>
        )}
        {obj.observedResult && (
          <div>
            <dt className="eyebrow">Observed result</dt>
            <dd>{obj.observedResult}</dd>
          </div>
        )}
      </dl>

      {obj.roles && obj.roles.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2 p-0">
          {obj.roles.map((r) => (
            <li key={r} className="tag tag-sm">
              {r}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
