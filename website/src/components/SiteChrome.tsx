import Link from "next/link";
import { MarkRing } from "./Mark";

/** Seven primary items (founder item 6): buyer entry, verification path,
 *  then institution. The wordmark is Home. FAQ and Philosophy live under
 *  About and in the footer, not in primary navigation. */
const NAV = [
  { href: "/questions", label: "Questions" },
  { href: "/research", label: "Research" },
  { href: "/methods", label: "Methods" },
  { href: "/claims", label: "Claims" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** The header enacts R-35: the app's top hairline IS the datum, flowing
 *  out of the ring at the left. */
export function SiteHeader() {
  return (
    <header className="mx-auto max-w-[1080px] px-5">
      <div className="flex items-end justify-between gap-4 pt-7">
        <Link
          href="/"
          className="flex items-center gap-2 !no-underline"
          aria-label="Upstream Zero — Observatory"
        >
          <span
            className="voice-mono whitespace-nowrap pb-2"
            style={{ letterSpacing: "0.18em" }}
          >
            Upstream Zero
          </span>
        </Link>
        <nav className="flex flex-wrap gap-x-5 gap-y-1 pb-2">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="voice-mono !no-underline hover:!underline">
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
      {/* the datum: ring at origin, line to the edge */}
      <div className="flex items-center" aria-hidden>
        <MarkRing size={18} />
        <div className="h-px flex-1" style={{ background: "var(--ink)" }} />
      </div>
    </header>
  );
}

/** Every page ends with its instrument stamp (DESIGN_LANGUAGE §6). */
export function ProvenanceFooter({
  renderedFrom,
  machineUrl,
}: {
  renderedFrom: string[];
  machineUrl?: string;
}) {
  return (
    <footer className="mx-auto mt-20 max-w-[1080px] px-5 pb-14">
      <div className="h-px w-full" style={{ background: "var(--ink-18)" }} />
      <div
        className="voice-mono-data flex flex-wrap gap-x-8 gap-y-1 pt-3"
        style={{ color: "var(--ink-60)" }}
      >
        <span>
          Rendered from{" "}
          {renderedFrom.length ? renderedFrom.join(" · ") : "site source"}
        </span>
        <span>Version 0.1 · First Light</span>
        {machineUrl ? (
          <a href={machineUrl}>machine rendering</a>
        ) : (
          <a href="/graph.json">graph.json</a>
        )}
        <a href="/llms.txt">llms.txt</a>
      </div>
      <nav
        className="voice-mono flex flex-wrap gap-x-6 gap-y-1 pt-3"
        style={{ color: "var(--ink-60)" }}
        aria-label="Secondary"
      >
        <Link href="/about" className="!no-underline hover:!underline">About</Link>
        <Link href="/faq" className="!no-underline hover:!underline">FAQ</Link>
        <Link href="/philosophy" className="!no-underline hover:!underline">Philosophy</Link>
        <Link href="/questions" className="!no-underline hover:!underline">Questions</Link>
        <Link href="/contact" className="!no-underline hover:!underline">Contact</Link>
      </nav>
    </footer>
  );
}
