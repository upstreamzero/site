export const dynamic = "force-static";
import { byType, inventory } from "@/lib/content";

/** Upstream Zero's own machine representation — Client Zero for the
 *  two-representations claim (C-0003). */
export async function GET() {
  const inv = inventory();
  return Response.json({
    name: "Upstream Zero",
    descriptor: "Commercial Evaluation Observatory",
    version: "0.1",
    firstLight: "2026-07-13",
    whatWeAre:
      "A research company studying commercial evaluation, observed through AI evaluator behavior.",
    whatWeAreNot: [
      "an SEO/AEO/GEO company",
      "an AI-visibility optimization agency",
      "a marketing agency",
      "a consultancy selling improved AI recommendations",
    ],
    identityStage:
      "observatory (discovers) — not yet institute (organizes) or laboratory (measures against standards)",
    evidencePolicy:
      "Claims presented at their evidence tier; confidence never promoted beyond evidence; corrections published with equal dignity.",
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
      "FD-5 contact channel",
      "FD-6 engagement names and pricing",
      "FD-7 public content repository",
      "FD-8 Client Zero experiment pre-registration",
    ],
    graph: "/graph.json",
    orientation: "/llms.txt",
  });
}
