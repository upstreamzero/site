import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { ProvenanceFooter } from "@/components/SiteChrome";
import { FounderDecision } from "@/components/FounderDecision";

export const metadata: Metadata = {
  title: "Contact",
  ...pageMeta("/contact"),
};

export default function Contact() {
  return (
    <>
      <main className="mx-auto max-w-[1080px] px-5">
        <header className="mt-12">
          <h1>Contact</h1>
          <div className="-ml-5 mt-5 h-px" style={{ background: "var(--ink)", opacity: 0.65 }} />
        </header>

        <section className="mt-8 max-w-[62ch]">
          <p>
            A first conversation covers three things. There is no form and no
            funnel. Just the conversation:
          </p>
          <ul className="mt-4 list-none space-y-3 p-0">
            <li className="border-l pl-4" style={{ borderColor: "var(--ink-18)" }}>
              <strong>Your evaluation context.</strong> The category you
              compete in, who evaluates you today, and what you suspect is
              happening in AI-mediated screening.
            </li>
            <li className="border-l pl-4" style={{ borderColor: "var(--ink-18)" }}>
              <strong>What is measurable now.</strong> Every current
              capability comes with its experimental maturity attached.
            </li>
            <li className="border-l pl-4" style={{ borderColor: "var(--ink-18)" }}>
              <strong>Whether we should work together yet.</strong> Sometimes
              the honest answer is &quot;not until the instrument is further
              along,&quot; and you deserve that answer in the first
              conversation, not the last.
            </li>
          </ul>
          <p className="mt-5" style={{ color: "var(--ink-60)" }}>
            Worth bringing: your category definition, the competitors you are
            evaluated against, and any evaluator output about you that
            prompted the visit.
          </p>
        </section>

        <FounderDecision id="FD-5">
          The contact channel (plain email vs. structured intake) is a
          founder decision. Until it is made, there is no way to contact
          Upstream Zero from this site. We say so instead of papering over it
          with a dead form.
        </FounderDecision>
      </main>
      <ProvenanceFooter />
    </>
  );
}
