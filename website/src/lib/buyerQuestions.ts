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
      { q: "Can we find out why a company was included, cut, trusted, or rejected?" },
    ],
  },
  {
    anchor: "misrepresentation",
    label: "Being misread or misdescribed",
    lead: "Why does AI misunderstand or misrepresent what our company does?",
    questions: [
      { q: "Why does AI misunderstand or misrepresent what our company does?" },
      { q: "How do we know whether the way AI describes us matches the real company?" },
    ],
  },
  {
    anchor: "requirements",
    label: "Requirements and missing proof",
    lead: "Which requirements are eliminating us from consideration?",
    questions: [
      { q: "Which buyer requirements do AI systems believe we meet?" },
      { q: "Which requirements are getting us cut?" },
      { q: "What proof would change an AI system's recommendation?" },
    ],
  },
  {
    anchor: "stability",
    label: "How steady the results are",
    lead: "How steady are AI recommendations across different systems, questions, and time?",
    questions: [
      { q: "How steady are AI recommendations across different systems, questions, and over time?" },
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
      { q: "How do we know whether a change actually moved how AI selects us?" },
    ],
  },
];
