import Link from "next/link";
import BookingButton from "@/components/BookingButton";

/** Navigation follows the questions a first-time visitor actually asks,
 *  not our internal research model. Research, Methods, and Claims are no
 *  longer primary navigation: they became the research library, reachable
 *  from the footer and from in-page links. Routes are unchanged, so every
 *  existing URL, object page, and machine surface keeps working. */
const NAV = [
  { href: "/solutions", label: "Solutions" },
  { href: "/pricing", label: "Pricing" },
  { href: "/research", label: "Research" },
  { href: "/methodology", label: "Methodology" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell flex items-center justify-between gap-6 py-4">
        <Link href="/" className="wordmark" aria-label="Upstream Zero home">
          Upstream <span className="wordmark__zero">Zero</span>
        </Link>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="nav-link">
              {n.label}
            </Link>
          ))}
        </nav>
        <BookingButton variant="btn" className="shrink-0">
          Book Time
        </BookingButton>
      </div>
      {/* Small screens: primary nav wraps below the wordmark rather than
          collapsing behind a JavaScript menu. */}
      <nav
        aria-label="Primary, compact"
        className="nav-compact shell flex flex-wrap gap-x-6 gap-y-1 pb-3 md:hidden"
      >
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className="nav-link">
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

const FOOT_PRODUCTS = [
  { href: "/solutions", label: "Solutions" },
  { href: "/pricing", label: "Pricing" },
  { href: "/methodology", label: "Methodology" },
  { href: "/contact", label: "Talk to us" },
];

const FOOT_LEARN = [
  { href: "/learn", label: "Learn" },
  { href: "/learn/commercial-evaluation", label: "Commercial evaluation" },
  { href: "/learn/ai-visibility", label: "AI visibility" },
  { href: "/glossary", label: "Glossary" },
];

const LIBRARY = [
  { href: "/research", label: "Research library" },
  { href: "/methods", label: "Methods" },
  { href: "/claims", label: "Claims" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/faq", label: "FAQ" },
];

const MACHINE = [
  { href: "/graph.json", label: "graph.json" },
  { href: "/llms.txt", label: "llms.txt" },
  { href: "/company.json", label: "company.json" },
];

/** The footer carries the proof layer and the machine surfaces. Anyone who
 *  wants to check the work can, without it interrupting the commercial
 *  story above. `machineUrl` is retained for object pages. */
export function ProvenanceFooter({
  machineUrl,
}: {
  /** Retained for call-site compatibility; no longer rendered. */
  renderedFrom?: string[];
  machineUrl?: string;
}) {
  return (
    <footer className="site-footer mt-auto">
      <div className="shell grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <nav aria-label="Products">
          <p className="eyebrow">Products</p>
          <ul className="mt-3 list-none space-y-1 p-0">
            {FOOT_PRODUCTS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Learn">
          <p className="eyebrow">Learn</p>
          <ul className="mt-3 list-none space-y-1 p-0">
            {FOOT_LEARN.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Research library">
          <p className="eyebrow">Research library</p>
          <ul className="mt-3 list-none space-y-1 p-0">
            {LIBRARY.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Company and machine readable">
          <p className="eyebrow">Company</p>
          <ul className="mt-3 list-none space-y-1 p-0">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Talk to us</Link>
            </li>
            {machineUrl && (
              <li>
                <a href={machineUrl}>This page as JSON</a>
              </li>
            )}
            {MACHINE.map((m) => (
              <li key={m.href}>
                <a href={m.href}>{m.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="shell mt-10">
        <hr className="rule" />
        <p className="mt-4 text-[0.875rem]">
          Version 0.1. Every claim is published at its evidence tier, and the
          zeros are printed honestly.
        </p>
      </div>
    </footer>
  );
}
