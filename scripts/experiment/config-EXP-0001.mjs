/** Frozen protocol data for EXP-0001 (docs/EXP-0001_PROTOCOL.md v1.0).
 *  This file encodes the protocol for the capture tooling; changing it
 *  after pre-registration is a protocol revision, never a silent edit. */
export default {
  experimentId: "EXP-0001",
  protocolVersion: "EXP-0001 v1.0",
  runsPerPrompt: 3,
  sessionConditions:
    "fresh session; verbatim prompt; first response captured; no regeneration; no suggestion clicks (except P8 frozen follow-up)",
  exposureDefault: "post-publication observation | potentially exposed",
  environments: [
    { id: "EE-1", name: "ChatGPT", access: "chatgpt.com, default model, temporary chat, memory off" },
    { id: "EE-2", name: "Claude", access: "claude.ai, default model, new chat, no preferences/projects" },
    { id: "EE-3", name: "Perplexity", access: "perplexity.ai, default mode" },
    { id: "EE-4", name: "Google AI Mode", access: "google.com AI mode, clean profile" },
    { id: "EE-5", name: "Microsoft Copilot", access: "copilot.microsoft.com, default mode" },
    { id: "EE-6", name: "Google Search", access: "classic results + AI Overview if shown, clean profile" },
  ],
  prompts: {
    P1: "What is Upstream Zero?",
    P2: "Tell me about the company at upstreamzero.com — what do they do and what makes them different?",
    P3: "What claims does Upstream Zero make, and how strong is the evidence behind them?",
    P4: "How does Upstream Zero classify the confidence of its own statements?",
    P5: "What is the relationship between Upstream Zero's founding claim about commercial evaluation becoming observable and its hypothesis H-1?",
    P6: "Does Upstream Zero promise to improve a company's AI rankings or visibility?",
    P7: "Where can I verify Upstream Zero's claims without trusting them? Give specific URLs.",
    P8: "What is Upstream Zero?||What would change their mind about their founding claim?",
  },
  hypothesisLinks: ["H-1"],
  claimLinks: ["C-0003"],
};
