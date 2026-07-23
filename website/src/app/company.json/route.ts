export const dynamic = "force-static";
import { byType, inventory } from "@/lib/content";

/** Upstream Zero's own machine representation — Client Zero for the
 *  two-representations claim (C-0003). */
export async function GET() {
  const inv = inventory();
  return Response.json({
    name: "Upstream Zero",
    descriptor:
      "Commercial intelligence company focused on AI-mediated commercial evaluation",
    booking: "https://calendly.com/skykmeyer/30min",
    email: "hello@upstreamzero.com",
    version: "0.1",
    firstLight: "2026-07-13",
    whatWeAre:
      "Upstream Zero is a commercial intelligence company focused on AI-mediated commercial evaluation. We study how AI systems evaluate, compare, recommend, and eliminate vendors during buying decisions through observed evidence. We help organizations understand why they are recommended, why they are eliminated, and what must become true to become a logical choice.",
    whatWeAreNot: [
      "an SEO/AEO/GEO company",
      "an AI-visibility optimization agency",
      "a marketing agency",
      "a consultancy selling improved AI recommendations",
    ],
    identityStage:
      "early: the instrument is built and evidence is accumulating. No finding has been accepted as settled.",
    evidencePolicy:
      "Claims presented at their evidence tier; confidence never promoted beyond evidence; corrections published with equal dignity.",
    researchIntegrity:
      "Upstream Zero separates what it observes from what it can prove. We report what an evaluator recommended, eliminated, requested, cited, or changed (observed); the requirements, evidence gaps, trust signals, and reinforcement patterns associated with those results (diagnosed); and the mechanisms most likely to change them (hypothesized). We use causal language only when supported by a controlled before-and-after experiment. Our direct observations are of AI evaluator behavior; where we describe human buying committees or procurement, we are characterizing the broader process, not claiming to have observed it directly.",
    capabilities: byType("capability").map((c) => ({
      id: c.id,
      title: c.title,
      maturity: c.maturity,
      machineUrl: `/objects/${c.id}`,
    })),
    engagements: byType("engagement").map((e) => ({
      id: e.id,
      title: e.title,
      status: e.status,
      nonPromises: e.nonPromises ?? [],
      machineUrl: `/objects/${e.id}`,
    })),
    evidence: {
      holdings: inv,
      note: "Holdings are computed at build and printed honestly, including zeros.",
    },
    constraints: [
      "Engagements promise deliverables, never evaluator behavior",
      "Capabilities cannot be operational without published method derivation (build-enforced)",
      "Research objects never cite commercial objects (build-enforced firewall)",
    ],
    openFounderDecisions: [
      "FD-1 operational tier definitions (M-1)",
      "FD-2 firewall statement in prose",
      "FD-3 the name's official reading",
      "FD-4 team and authorship",
      "FD-6 engagement names and pricing",
      "FD-7 public content repository",
      "FD-8 Client Zero experiment pre-registration",
    ],
    graph: "/graph.json",
    orientation: "/llms.txt",
  });
}
