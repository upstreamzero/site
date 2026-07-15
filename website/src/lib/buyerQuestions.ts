/** The buyer problem map (buyer revision v1).
 *
 *  Classification honesty (invention rule, class 3): every question here
 *  is EDITORIAL NAVIGATION — chosen to help a visitor locate their
 *  problem. None has published observed evidence of being frequently
 *  asked by buyers or evaluators. A question moves to observed-commercial
 *  only when captured evidence supports that, via a recorded revision. */

export type BuyerQuestion = {
  q: string;
  /** route of the full answer page, when one exists */
  href?: string;
};

export type ProblemArea = {
  anchor: string;
  label: string;
  /** the lead question shown on the homepage */
  lead: string;
  /** homepage link target; defaults to /questions#anchor */
  href?: string;
  questions: BuyerQuestion[];
};

export const PROBLEM_AREAS: ProblemArea[] = [
  {
    anchor: "recommendation",
    label: "Recommendation and exclusion",
    lead: "Why are AI systems recommending our competitors instead of us?",
    href: "/questions/why-are-some-companies-recommended",
    questions: [
      {
        q: "Why are some companies recommended while others are left out?",
        href: "/questions/why-are-some-companies-recommended",
      },
      { q: "Why are AI systems recommending our competitors instead of us?" },
      { q: "Can we determine why a company was included, excluded, validated, or rejected?" },
    ],
  },
  {
    anchor: "misrepresentation",
    label: "Misrepresentation and reconstruction",
    lead: "Why does AI misunderstand or misrepresent what our company does?",
    questions: [
      { q: "Why does AI misunderstand or misrepresent what our company does?" },
      { q: "How do we know whether our commercial representation is faithful to the real company?" },
    ],
  },
  {
    anchor: "requirements",
    label: "Requirements and evidence gaps",
    lead: "Which requirements are eliminating us from consideration?",
    questions: [
      { q: "Which commercial requirements do evaluators believe we satisfy?" },
      { q: "Which requirements are eliminating us from consideration?" },
      { q: "What evidence would change an evaluator's recommendation?" },
    ],
  },
  {
    anchor: "stability",
    label: "Evaluation stability",
    lead: "How stable are recommendation outcomes across evaluators, prompts, and time?",
    questions: [
      { q: "How stable are recommendation outcomes across evaluators, prompts, and time?" },
      { q: "Why do rankings, visibility, citations, and recommendations produce different results?" },
    ],
  },
  {
    anchor: "human-ai",
    label: "Human and AI evaluation",
    lead: "How closely does AI evaluation resemble the way human buying committees evaluate?",
    questions: [
      { q: "How closely does AI evaluation resemble the way human buying committees evaluate?" },
    ],
  },
  {
    anchor: "measurement",
    label: "Measurement and diagnosis",
    lead: "Can AI recommendation behavior actually be measured?",
    questions: [
      { q: "Can AI recommendation behavior actually be measured?" },
      { q: "How do we know whether an intervention actually changed selection behavior?" },
    ],
  },
];
