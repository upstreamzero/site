import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/meta";
import { ProvenanceFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: { absolute: "Contact Upstream Zero" },
  description:
    "Contact Upstream Zero regarding commercial evaluation research, observed recommendation behavior, methodology, experiments, and institutional collaboration.",
  ...pageMeta("/contact"),
};

const COVERS = [
  {
    n: "01",
    title: "Your evaluation context",
    body: "The category you compete in, who evaluates you today, and what you suspect is happening before buyers reach you.",
  },
  {
    n: "02",
    title: "What is measurable now",
    body: "Every current capability comes with its experimental maturity attached. You will hear what we cannot measure yet.",
  },
  {
    n: "03",
    title: "Whether we should work together yet",
    body: "Sometimes the honest answer is not yet, and you deserve that in the first conversation rather than the last.",
  },
];

export default function Contact() {
  return (
    <>
      <main id="main">
        <section className="section">
          <div className="shell">
            <p className="eyebrow">Talk to us</p>
            <h1 className="mt-5 max-w-[18ch]">
              Start with your category, not a pitch.
            </h1>
            <p className="lede mt-7">
              A first conversation covers three things. There is no form and no
              funnel. Just the conversation.
            </p>
          </div>
        </section>

        <div className="shell">
          <hr className="rule" />
        </div>

        <section className="section">
          <div className="shell">
            <ol className="steps steps-3">
              {COVERS.map((c) => (
                <li key={c.n} className="step">
                  <div className="step-n">{c.n}</div>
                  <h2 className="mt-2 text-[1.0625rem] font-medium">
                    {c.title}
                  </h2>
                  <p>{c.body}</p>
                </li>
              ))}
            </ol>
            <p className="lede mt-12">
              Worth bringing: your category definition, the competitors you are
              evaluated against, and any evaluator output about you that
              prompted the visit.
            </p>
            <div className="card mt-12 max-w-[62ch]">
              <p className="eyebrow">How to reach us</p>
              <p className="mt-4 text-[1.375rem] font-medium tracking-[-0.02em]">
                <a href="mailto:hello@upstreamzero.com">
                  hello@upstreamzero.com
                </a>
              </p>
              <p className="muted mt-4 text-[0.9375rem]">
                One address, read by a person. Tell us your category and what
                you are seeing, and you will get a straight answer about
                whether this is measurable yet.
              </p>
            </div>
          </div>
        </section>

        <section className="cta-band">
          <div className="shell grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <h2 className="max-w-[24ch]">
              While you wait, the evidence is already public.
            </h2>
            <Link href="/research" className="btn-lime">
              See what we have observed
            </Link>
          </div>
        </section>
      </main>
      <ProvenanceFooter />
    </>
  );
}
