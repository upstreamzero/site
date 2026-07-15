/** Capture-mechanics config for EXP-0001. The FROZEN protocol data
 *  (prompts, rubric, predictions, refutation) lives in protocol/EXP-0001/
 *  and is the single source of truth, bound by the freeze receipt. This
 *  file reads the frozen prompt-set so guided capture can only ever show
 *  exactly what was frozen; changing prompts means re-freezing. */
import fs from "node:fs";
import path from "node:path";

const pdir = path.resolve(new URL("../../protocol/EXP-0001", import.meta.url).pathname);
const promptSet = JSON.parse(fs.readFileSync(path.join(pdir, "prompts.json"), "utf8"));

export default {
  experimentId: "EXP-0001",
  protocolVersion: "EXP-0001 v1.0",
  runsPerPrompt: promptSet.runsPerPromptPerEnvironment,
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
  promptOrder: promptSet.order,
  prompts: promptSet.prompts,
  hypothesisLinks: ["H-1"],
  claimLinks: ["C-0003"],
};
