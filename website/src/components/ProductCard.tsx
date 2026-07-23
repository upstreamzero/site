import Link from "next/link";
import type { UZObject } from "@/lib/schema";
import { productSlugFor } from "@/lib/products";

/** A commercial product summary. Every field derives from the engagement
 *  object's canonical frontmatter, so this card, the product page, the
 *  pricing table, and the machine surfaces can never drift apart. */
export function ProductCard({ obj }: { obj: UZObject }) {
  const slug = productSlugFor(obj.id);
  const href = slug ? `/solutions/${slug}` : `/engagements/${obj.id}`;
  return (
    <article className="card exp-card">
      <h3>
        <Link href={href}>{obj.productName ?? obj.title}</Link>
      </h3>
      {obj.businessProblem && (
        <p className="muted mt-3 text-[0.9688rem]">
          &ldquo;{obj.businessProblem}&rdquo;
        </p>
      )}
      <dl className="exp-fields">
        {obj.businessOutcome && (
          <div>
            <dt className="eyebrow">What you get</dt>
            <dd>{obj.businessOutcome}</dd>
          </div>
        )}
      </dl>
      <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        {obj.priceStart && (
          <span className="text-[1.375rem] font-medium tracking-[-0.02em]">
            From {obj.priceStart}
            {obj.priceUnit ? (
              <span className="muted text-[0.9375rem] font-normal">
                {" "}
                {obj.priceUnit}
              </span>
            ) : null}
          </span>
        )}
        {obj.timeline && <span className="chip">{obj.timeline}</span>}
      </div>
      <p className="mt-6">
        <Link href={href} className="btn-ghost">
          View scope
        </Link>
      </p>
    </article>
  );
}
