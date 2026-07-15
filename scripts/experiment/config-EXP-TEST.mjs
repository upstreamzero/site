/** Synthetic-fixture experiment config: used ONLY to test the pipeline.
 *  Nothing produced under EXP-TEST may ever be published. */
export default {
  experimentId: "EXP-TEST",
  protocolVersion: "fixture",
  runsPerPrompt: 1,
  sessionConditions: "fixture",
  exposureDefault: "exposure status unknown",
  environments: [{ id: "EE-T", name: "Fixture", access: "synthetic" }],
  prompts: { P1: "What is Upstream Zero? (fixture)" },
  hypothesisLinks: ["H-1"],
  claimLinks: [],
  fixture: true,
};
