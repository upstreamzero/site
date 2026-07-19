/**
 * Featured experiments: a communication-layer decision, nothing more.
 *
 * This list stores IDs only. Every piece of experiment content (title,
 * category, question, business problem, observed result, roles, status,
 * outcome) stays canonical in the experiment's own frontmatter and is
 * resolved at render time, so nothing here can drift out of sync.
 *
 * Featured is NOT a research status, evidence tier, graph relationship, or
 * ontology field. Adding or removing an ID changes prominence only: it never
 * alters, publishes, or unpublishes an experiment. Anything removed from
 * this list still appears in the automatically generated "Browse all
 * experiments" library.
 *
 * The structured framing fields make an experiment *eligible* for the modern
 * card format. They do not make it featured. Curation is deliberate so the
 * featured section stays a short, explanatory set rather than becoming
 * another wall of research as the library grows.
 */
export const FEATURED_EXPERIMENT_IDS: string[] = ["E-034", "E-040", "E-042"];
