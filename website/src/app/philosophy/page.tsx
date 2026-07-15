import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { byId, byType, inventory } from "@/lib/content";
import { ProvenanceFooter } from "@/components/SiteChrome";
import { TierScale } from "@/components/TierScale";
import {
  ResolvedQuestion,
  QPart,
  RelatedQuestions,
  FDInline,
} from "@/components/ResolvedQuestion";

export const metadata: Metadata = {
  title: "Philosophy",
  ...pageMeta("/philosophy"),
};

/** Question-native rendering, V1 (docs/RENDERING_MODEL.md).
 *  Humans arrive with questions; the graph answers them quietly.
 *  Plain-text answers below feed the machine-readable Q&A block. */
const QA_PLAIN: { q: string; a: string }[] = [
  {
    q: "Can commercial evaluation be studied?",
    a: "We believe it can — and that it must be studied before anyone can honestly claim to improve it. AI evaluators have made portions of commercial evaluation observable and experimentable for the first time; generalizing beyond AI evaluators runs through an open bridge hypothesis.",
  },
  {
    q: "Why should anyone believe what this site says?",
    a: "You shouldn't have to. Every significant claim carries an evidence tier, the site's own founding claims are labeled at the lowest tier because no published evidence supports them yet, and the whole graph is inspectable by humans and machines without trusting us.",
  },
  {
    q: "What happens when this site is wrong?",
    a: "The correction is published with the same dignity as a finding. Corrections improve the instrument; nothing is silently edited or deleted, and the public git history makes every change diffable.",
  },
  {
    q: "Doesn't publishing your research change the thing you study?",
    a: "Yes — and rather than pretend otherwise, we measure it. The website deliberately participates in the environment it studies (Client Zero), and propagation of our published objects into evaluator behavior is itself a research subject.",
  },
  {
    q: "If companies pay you, how is the research neutral?",
    a: "Structurally, not rhetorically: paid work measures and diagnoses, engagements cannot promise evaluator behavior, and research objects cannot cite commercial ones — the site fails to build if either rule is violated.",
  },
  {
    q: "What kind of institution is this?",
    a: "Today, honestly: an observatory. The observatory discovers, the institute organizes, the laboratory measures — and standards emerge later. We claim only the first stage, because it is the only one we have earned.",
  },
];

export default function Philosophy() {
  const inv = inventory();
  const c1 = byId("C-0001");
  const claims = byType("claim");
  const revisions = byType("revision");
  const propagation = byType("propagation");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: "https://upstreamzero.com/philosophy",
    description:
      "Editorial-navigation questions: written by Upstream Zero to help humans navigate its knowledge. Not claimed as observed commercial or market questions; excluded from all market-question coverage metrics. Classification: editorial-navigation (Question Observatory architecture, sourceClass discipline).",
    mainEntity: QA_PLAIN.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };

  return (
    <>
      <main className="mx-auto max-w-[1080px] px-5">
        <header className="mt-12">
          <p className="voice-mono" style={{ color: "var(--ink-60)" }}>
            Philosophy · editorial-navigation questions — written to help
            you navigate, not claimed as observed market demand. Everything
            here is Narrated: the institution answering for itself.
          </p>
          <h1 className="mt-3 max-w-[28ch] text-[1.75rem]">
            Questions we think an institution like this should answer
          </h1>
          <div className="-ml-5 mt-5 h-px" style={{ background: "var(--ink)", opacity: 0.65 }} />
        </header>

        {/* Q1 ────────────────────────────────────────────────────────── */}
        <ResolvedQuestion
          id="can-evaluation-be-studied"
          question="Can commercial evaluation be studied?"
          answer="We believe it can — and that it must be studied before anyone can honestly claim to improve it."
        >
          <QPart label="Explanation">
            <p>
              Most attempts to improve commercial outcomes begin without
              understanding the evaluation that produced them. We think that
              is backwards. Before a buying decision can be improved, someone
              has to understand the process that created it — the
              requirements applied, the evidence weighed, the confidence
              formed, the recommendation made.
            </p>
            <p>
              That process was invisible for most of commercial history,
              inferable only from its exhaust: win rates, lost deals, buyer
              anecdotes. What changed is that AI systems now participate in{" "}
              <Link href="/concepts/commercial-evaluation">
                commercial evaluation
              </Link>
              , and their evaluation behavior can be sampled, recorded, and
              experimented on at scale.
            </p>
          </QPart>
          <QPart label="Evidence">
            <p>
              The founding claim is published at its honest tier — no
              published observation supports it yet, and it says so on its
              face:
            </p>
            <p className="border-l pl-4" style={{ borderColor: "var(--ink-18)" }}>
              <Link href="/claims/C-0001">{c1?.title}</Link>
              <br />
              {c1?.tier && <TierScale tier={c1.tier} />}
            </p>
            <p>
              The observatory currently holds {inv.observations} observations,{" "}
              {inv.experiments} experiment, and {inv.findings} findings. Those
              numbers are printed, not hidden — the instrument came first, and
              the program is active:{" "}
              <Link href="/questions/Q-1">Q-1</Link>,{" "}
              <Link href="/questions/Q-2">Q-2</Link>,{" "}
              <Link href="/questions/Q-3">Q-3</Link>.
            </p>
          </QPart>
          <QPart label="Limitations">
            <p>
              What has become observable is the behavior of <em>AI</em>{" "}
              evaluators. Human buying committees remain as opaque as ever.
              Everything we learn generalizes to commercial evaluation at
              large only through the bridge hypothesis{" "}
              <Link href="/hypotheses/H-1">H-1</Link> — that AI evaluation
              influences and increasingly mediates human evaluation. If H-1
              fails, the program&apos;s honest scope shrinks to AI-mediated
              commerce, and we would say so.
            </p>
          </QPart>
          <RelatedQuestions
            items={[
              { href: "#why-believe", label: "Why should anyone believe what this site says?" },
              { href: "#client-zero", label: "Doesn't publishing your research change the thing you study?" },
            ]}
          />
        </ResolvedQuestion>

        {/* Q2 ────────────────────────────────────────────────────────── */}
        <ResolvedQuestion
          id="why-believe"
          question="Why should anyone believe what this site says?"
          answer="You shouldn't have to — verification here is designed to work without trust."
        >
          <QPart label="Explanation">
            <p>
              Nothing becomes true because it sounds convincing. Every
              significant claim carries an{" "}
              <Link href="/concepts/evidence-tier">evidence tier</Link> from
              Narrated (asserted, not demonstrated) to Real World Corroborated,
              and a claim can never display more confidence than its evidence
              edges justify — the site literally fails to build if one tries.
            </p>
          </QPart>
          <QPart label="Evidence">
            <p>
              The clearest evidence is what the discipline does to our own
              marketing: all {claims.length} claims on the{" "}
              <Link href="/claims">Claims Ledger</Link> — including the
              founding ones — currently sit at Narrated, tier 1 of 6, because
              nothing published yet supports them. An institution optimizing
              for persuasion would not label its own claims this way.
            </p>
          </QPart>
          <QPart label="Limitations">
            <p>
              The tiers&apos; operational definitions (how many runs
              constitute replication; what counts as real-world corroboration)
              are still under development in{" "}
              <Link href="/methods/M-1">M-1</Link> — <FDInline id="FD-1" />.
              And the tier-floor rule has so far only been exercised at N=0,
              where it passes trivially; it has never yet rejected a real
              violation. We note that rather than claim the latch is proven.
            </p>
          </QPart>
          <RelatedQuestions
            items={[
              { href: "#when-wrong", label: "What happens when this site is wrong?" },
              { href: "#neutrality", label: "If companies pay you, how is the research neutral?" },
            ]}
          />
        </ResolvedQuestion>

        {/* Q3 ────────────────────────────────────────────────────────── */}
        <ResolvedQuestion
          id="when-wrong"
          question="What happens when this site is wrong?"
          answer="The correction is published with the same dignity as a finding."
        >
          <QPart label="Explanation">
            <p>
              Corrections improve the instrument. When something published
              here needs revision, the change becomes a first-class Revision
              object — what changed, why, and which claims were re-tiered as
              a result. Nothing is silently edited; superseded objects remain
              at their addresses with forward pointers, and the{" "}
              <a href="https://github.com/upstreamzero/site">
                public git history
              </a>{" "}
              makes every change independently diffable.
            </p>
          </QPart>
          <QPart label="Evidence">
            <p>
              The changelog currently holds {revisions.length}{" "}
              revisions —
              a fact about the site&apos;s youth, not its accuracy. The
              mechanism exists; it has not yet been tested by a real,
              uncomfortable correction.
            </p>
          </QPart>
          <QPart label="Limitations">
            <p>
              An untested correction discipline is a promise, and by our own
              rules promises are Narrated. The honest test arrives with the
              first finding that has to be walked back in public. Until then,
              treat this section as intent with an enforcement mechanism, not
              as a track record.
            </p>
          </QPart>
          <RelatedQuestions
            items={[
              { href: "#why-believe", label: "Why should anyone believe what this site says?" },
              { href: "#client-zero", label: "Doesn't publishing your research change the thing you study?" },
            ]}
          />
        </ResolvedQuestion>

        {/* Q4 ────────────────────────────────────────────────────────── */}
        <ResolvedQuestion
          id="client-zero"
          question="Doesn't publishing your research change the thing you study?"
          answer="Yes — and rather than pretend otherwise, we measure it."
        >
          <QPart label="Explanation">
            <p>
              Published findings about how evaluators behave will eventually
              enter evaluator retrieval and reasoning. Most institutions would
              treat that as contamination to be denied. We treat it as a
              phenomenon to be measured:{" "}
              <Link href="/concepts/client-zero">Client Zero</Link> means this
              website deliberately participates in the environment it
              studies, and the propagation of our own published objects is
              itself a research subject.
            </p>
          </QPart>
          <QPart label="Evidence">
            <p>
              Draft experiment{" "}
              <Link href="/experiments/EXP-0001">EXP-0001</Link> pre-registers
              the predictions; the propagation register currently holds{" "}
              {propagation.length} records. The experiment is a draft —{" "}
              <FDInline id="FD-8" /> — and no data has been collected. Both
              facts are stated on the experiment itself.
            </p>
          </QPart>
          <QPart label="Limitations">
            <p>
              Measuring a confound does not remove it: our published work may
              alter the very behaviors we later observe, and disentangling
              that will be genuinely hard. The ingestion procedure for
              propagation sightings — who observes, how a sighting is
              verified — is not yet designed. This is the program&apos;s most
              interesting open methodological problem, not a solved one.
            </p>
          </QPart>
          <RelatedQuestions
            items={[
              { href: "#can-evaluation-be-studied", label: "Can commercial evaluation be studied?" },
              { href: "#neutrality", label: "If companies pay you, how is the research neutral?" },
            ]}
          />
        </ResolvedQuestion>

        {/* Q5 ────────────────────────────────────────────────────────── */}
        <ResolvedQuestion
          id="neutrality"
          question="If companies pay you, how is the research neutral?"
          answer="Structurally, not rhetorically: the paid work measures and diagnoses, and the rules that keep it from becoming optimization are enforced by the build, not by good intentions."
        >
          <QPart label="Explanation">
            <p>
              The commercial temptation in this field is well known: clients
              will pay to <em>change</em> what evaluators say about them, not
              merely to understand it. Our answer is architectural. Engagements
              can promise deliverables — reports, measurements, analyses —
              but the object model has no field in which a promise about
              evaluator behavior could even be written. Capabilities cannot be
              marked operational until they derive from published method. And
              research objects can never cite commercial ones: the firewall is
              a compile error, not a policy memo.
            </p>
          </QPart>
          <QPart label="Evidence">
            <p>
              Every engagement on the <Link href="/services">Services</Link>{" "}
              page carries explicit non-promises; every capability is
              currently labeled experimental because no published method backs
              it; and the measured-outcomes register is empty rather than
              filled with testimonials. The absence of persuasion machinery
              is itself inspectable.
            </p>
          </QPart>
          <QPart label="Limitations">
            <p>
              The prose firewall commitment — the founder&apos;s own words on
              where diagnosis ends — does not exist yet: <FDInline id="FD-2" />.
              And we state plainly that incentive drift toward optimization is
              this program&apos;s most likely failure mode. The structural
              rules exist precisely because we do not trust future revenue
              pressure to be polite.
            </p>
          </QPart>
          <RelatedQuestions
            items={[
              { href: "#why-believe", label: "Why should anyone believe what this site says?" },
              { href: "#what-institution", label: "What kind of institution is this?" },
            ]}
          />
        </ResolvedQuestion>

        {/* Q6 ────────────────────────────────────────────────────────── */}
        <ResolvedQuestion
          id="what-institution"
          question="What kind of institution is this?"
          answer="Today, honestly: an observatory — because that is the only identity we have earned."
        >
          <QPart label="Explanation">
            <p>
              The observatory discovers. The institute organizes. The
              laboratory measures. Standards emerge later. We are still
              discovering the structures of commercial evaluation that will
              eventually be worth measuring, so the descriptor under our name
              says <em>observatory</em> — and it will change only when the
              next stage is actually reached, as a recorded revision rather
              than a rebrand.
            </p>
          </QPart>
          <QPart label="Evidence">
            <p>
              The identity sequence is a founding commitment (Narrated, like
              all founding commitments), and the site practices it: methods
              are versioned instruments under development, not standards, and
              nothing here claims certification authority it does not hold.
            </p>
          </QPart>
          <QPart label="Limitations">
            <p>
              Two things this page cannot yet tell you: the official reading
              of the name — <FDInline id="FD-3" /> — and who, by name, is
              behind the institution — <FDInline id="FD-4" />. Objects are
              institutionally authored until that is resolved. We would rather
              show you the gaps than paper over them.
            </p>
          </QPart>
          <RelatedQuestions
            items={[
              { href: "#can-evaluation-be-studied", label: "Can commercial evaluation be studied?" },
              { href: "#when-wrong", label: "What happens when this site is wrong?" },
            ]}
          />
        </ResolvedQuestion>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProvenanceFooter
        renderedFrom={[
          "content graph (evidence, tiers, counts)",
          "question-native rendering v1",
        ]}
      />
    </>
  );
}
