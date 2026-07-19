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
  title: { absolute: "Philosophy and Epistemics | Upstream Zero" },
  description:
    "How Upstream Zero separates observation from optimization: evidence tiers, corrections, conflicts of interest, and the questions it answers about itself.",
  ...pageMeta("/philosophy"),
};

/** Question-native rendering, V1.
 *  Humans arrive with questions; the graph answers them quietly.
 *  Plain-text answers below feed the machine-readable Q&A block. */
const QA_PLAIN: { q: string; a: string }[] = [
  {
    q: "Can commercial evaluation be studied?",
    a: "We believe it can, and that it must be studied before anyone can claim to improve it. AI evaluators have made portions of commercial evaluation observable and experimentable for the first time; generalizing beyond AI evaluators runs through an open bridge hypothesis.",
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
    a: "Yes, and instead of pretending otherwise, we measure it. The website participates in the environment it studies (Client Zero), and propagation of our published objects into evaluator behavior is itself a research subject.",
  },
  {
    q: "If companies pay you, how is the research neutral?",
    a: "The separation is built into the site itself. Paid work measures and diagnoses, engagements cannot promise evaluator behavior, and research objects cannot cite commercial ones. The site fails to build if either rule is violated.",
  },
  {
    q: "What kind of company is this?",
    a: "A company, not an academic institution. We study a commercial problem and publish the evidence so it can be checked.",
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
      "Questions Upstream Zero wrote and answered about itself: its epistemics, corrections, conflicts of interest, and identity. Not claimed as observed market questions.",
    mainEntity: QA_PLAIN.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };

  return (
    <>
      <main id="main" className="shell section-tight">
        <div className="mt-2">
          <p className="voice-mono" style={{ color: "var(--ink-60)" }}>
            Philosophy · Upstream Zero answering for itself. Everything here
            is Narrated.
          </p>
          <h1 className="mt-3 max-w-[28ch]">
            How we work, and why you should doubt us
          </h1>
          <div className="-ml-5 mt-5 h-px" style={{ background: "var(--ink)", opacity: 0.65 }} />
        </div>

        {/* Q1 ────────────────────────────────────────────────────────── */}
        <ResolvedQuestion
          id="can-evaluation-be-studied"
          question="Can commercial evaluation be studied?"
          answer="We believe it can, and that it must be studied before anyone can claim to improve it."
        >
          <QPart label="Explanation">
            <p>
              Most attempts to improve commercial outcomes begin without
              understanding the evaluation that produced them. We think that
              is backwards. Before a buying decision can be improved, someone
              has to understand the process that created it: the requirements
              applied, the evidence weighed, the confidence formed, the
              recommendation made.
            </p>
            <p>
              That process was invisible for most of commercial history. You
              could only guess at it from the outside: win rates, lost deals,
              buyer anecdotes. Then AI systems started participating in{" "}
              <Link href="/concepts/commercial-evaluation">
                commercial evaluation
              </Link>
              , and their evaluation behavior can be sampled, recorded, and
              experimented on at scale.
            </p>
          </QPart>
          <QPart label="Evidence">
            <p>
              The founding claim is published at its honest tier. No published
              observation supports it yet, and it says so on its face:
            </p>
            <p className="border-l pl-4" style={{ borderColor: "var(--ink-18)" }}>
              <Link href="/claims/C-0001">{c1?.title}</Link>
              <br />
              {c1?.tier && <TierScale tier={c1.tier} />}
            </p>
            <p>
              We currently hold {inv.observations} observations,{" "}
              {inv.experiments} experiment, and {inv.findings} findings. Those
              numbers are printed, not hidden. The instrument came first, and
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
              <Link href="/hypotheses/H-1">H-1</Link>. That hypothesis holds
              that AI evaluation influences human evaluation, and mediates
              more of it over time. If H-1 fails, the program&apos;s honest
              scope shrinks to AI-mediated commerce, and we would say so.
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
          answer="You shouldn't have to. Verification here is designed to work without trust."
        >
          <QPart label="Explanation">
            <p>
              Nothing becomes true because it sounds convincing. Every
              significant claim carries an{" "}
              <Link href="/concepts/evidence-tier">evidence tier</Link> from
              Narrated (asserted, not demonstrated) to Real World Corroborated,
              and a claim can never display more confidence than its evidence
              edges justify. The site literally fails to build if one tries.
            </p>
          </QPart>
          <QPart label="Evidence">
            <p>
              The clearest evidence is what this rule does to our own
              marketing. All {claims.length} claims on the{" "}
              <Link href="/claims">Claims Ledger</Link>, including the founding
              ones, currently sit at Narrated, tier 1 of 6, because nothing
              published yet supports them. A company optimizing for persuasion
              would not label its own claims this way.
            </p>
          </QPart>
          <QPart label="Limitations">
            <p>
              The tiers&apos; operational definitions (how many runs
              constitute replication; what counts as real-world corroboration)
              are still under development in{" "}
              <Link href="/methods/M-1">M-1</Link>. <FDInline id="FD-1" />. The
              tier-floor rule has so far only been exercised at N=0, where it
              passes trivially. It has never yet rejected a real violation. We
              note that, and do not claim the latch is proven.
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
              object: what changed, why, and which claims were re-tiered as a
              result. Nothing is silently edited; superseded objects remain
              at their addresses with forward pointers, and the{" "}
              <a href="https://github.com/upstreamzero/site">
                public git history
              </a>{" "}
              makes every change independently diffable.
            </p>
          </QPart>
          <QPart label="Evidence">
            <p>
              The changelog currently holds {revisions.length} revisions. That
              is a fact about the site&apos;s youth, not its accuracy. The
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
          answer="Yes. And instead of pretending otherwise, we measure it."
        >
          <QPart label="Explanation">
            <p>
              Published findings about how evaluators behave will eventually
              enter evaluator retrieval and reasoning. Most companies would
              treat that as contamination to be denied. We treat it as a
              phenomenon to be measured.{" "}
              <Link href="/concepts/client-zero">Client Zero</Link> means this
              website participates in the environment it studies, and the
              propagation of our own published objects is itself a research
              subject.
            </p>
          </QPart>
          <QPart label="Evidence">
            <p>
              Draft experiment{" "}
              <Link href="/experiments/EXP-0001">EXP-0001</Link> pre-registers
              the predictions; the propagation register currently holds{" "}
              {propagation.length} records. The experiment is a draft.{" "}
              <FDInline id="FD-8" />. No data has been collected. Both facts
              are stated on the experiment itself.
            </p>
          </QPart>
          <QPart label="Limitations">
            <p>
              Measuring a confound does not remove it: our published work may
              alter the very behaviors we later observe, and disentangling
              that will be genuinely hard. The ingestion procedure for
              propagation sightings is not yet designed. Nobody has decided
              who observes, or how a sighting is verified. This is the
              program&apos;s most interesting open methodological problem, not
              a solved one.
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
          answer="The separation is built into the site itself. The paid work measures and diagnoses, and the rules that keep it from becoming optimization are enforced by the build."
        >
          <QPart label="Explanation">
            <p>
              The commercial temptation in this field is well known: clients
              will pay to <em>change</em> what evaluators say about them, not
              merely to understand it. Our answer is architectural. Engagements
              can promise deliverables like reports, measurements, and
              analyses. But the object model has no field in which a promise
              about evaluator behavior could even be written. Capabilities cannot be
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
              it; and the measured-outcomes register is empty instead of
              filled with testimonials. The absence of persuasion machinery
              is itself inspectable.
            </p>
          </QPart>
          <QPart label="Limitations">
            <p>
              The prose firewall commitment, the founder&apos;s own words on
              where diagnosis ends, does not exist yet. <FDInline id="FD-2" />.
              Incentive drift toward optimization is this program&apos;s most
              likely failure mode, and we say so. The structural rules exist
              precisely because we do not trust future revenue pressure to be
              polite.
            </p>
          </QPart>
          <RelatedQuestions
            items={[
              { href: "#why-believe", label: "Why should anyone believe what this site says?" },
              { href: "#what-institution", label: "What kind of company is this?" },
            ]}
          />
        </ResolvedQuestion>

        {/* Q6 ────────────────────────────────────────────────────────── */}
        <ResolvedQuestion
          id="what-institution"
          question="What kind of company is this?"
          answer="A company studying a commercial problem, and honest about how early it is."
        >
          <QPart label="Explanation">
            <p>
              A company, not an academic institution. We study one
              commercial problem: how organizations get evaluated before a
              buyer ever contacts them. We are early, and we say so. Nothing
              has been accepted as settled, and the numbers we print are the
              real ones. What changes that is evidence, recorded as a
              revision, not a rebrand.
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
              of the name (<FDInline id="FD-3" />) and who, by name, is behind
              Upstream Zero (<FDInline id="FD-4" />). Objects are
              institutionally authored until that is resolved. We show you the
              gaps instead of papering over them.
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
      />
    </>
  );
}
