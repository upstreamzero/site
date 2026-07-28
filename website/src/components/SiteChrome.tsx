import Link from "next/link";
import BookingButton from "@/components/BookingButton";

/** Navigation is the four destinations a buyer actually seeks: the product,
 *  the proof, the company behind it, and the way to start. The research
 *  library, methods, and machine surfaces are preserved and reachable from
 *  the footer and in-page links, so every existing URL and machine surface
 *  keeps working. */
const NAV = [
  { href: "/pricing", label: "Product & Pricing" },
  { href: "/evidence", label: "Evidence" },
  { href: "/company", label: "Company" },
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
        {/* Hidden on the narrowest screens, where the wordmark and this wide
            label cannot share a row without overflowing; the hero carries an
            identical Request an Audit button immediately below. The wrapper
            span carries the display toggle because `.btn` sets an unlayered
            `display: inline-flex` that would defeat a `hidden` utility applied
            to the button itself. */}
        <span className="hidden shrink-0 sm:block">
          <BookingButton variant="btn">Request an Audit</BookingButton>
        </span>
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
  { href: "/pricing", label: "Product & Pricing" },
  { href: "/evidence", label: "Evidence" },
  { href: "/company", label: "Company" },
  { href: "/solutions", label: "Solutions & scope" },
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
              <Link href="/company">About</Link>
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
