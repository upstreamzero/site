import Link from "next/link";

/** Navigation follows the questions a first-time visitor actually asks,
 *  not our internal research model. Research, Methods, and Claims are no
 *  longer primary navigation: they became the research library, reachable
 *  from the footer and from in-page links. Routes are unchanged, so every
 *  existing URL, object page, and machine surface keeps working. */
const NAV = [
  { href: "/pricing", label: "Products" },
  { href: "/questions", label: "Why this matters" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell flex items-center justify-between gap-6 py-4">
        <Link href="/" className="wordmark" aria-label="Upstream Zero home">
          Upstream Zero
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
        <Link href="/contact" className="btn shrink-0">
          Talk to us
        </Link>
      </div>
      {/* Small screens: primary nav wraps below the wordmark rather than
          collapsing behind a JavaScript menu. */}
      <nav
        aria-label="Primary, compact"
        className="nav-compact shell flex gap-x-6 pb-3 md:hidden"
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
        <div>
          <p className="eyebrow">Upstream Zero</p>
          <p className="mt-3 max-w-[32ch]">
            We study how commercial evaluation happens before a buyer ever
            contacts you.
          </p>
        </div>
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
        <nav aria-label="Machine readable">
          <p className="eyebrow">Machine readable</p>
          <ul className="mt-3 list-none space-y-1 p-0">
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
        <nav aria-label="Company">
          <p className="eyebrow">Company</p>
          <ul className="mt-3 list-none space-y-1 p-0">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/services">For companies</Link>
            </li>
            <li>
              <Link href="/contact">Talk to us</Link>
            </li>
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
