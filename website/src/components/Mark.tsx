/** The mark — origin composition (DESIGN_SYSTEM.md §1, R-39..R-47).
 *  The zero at the origin; the datum flowing downstream. Never tilted,
 *  never broken, never filled, never red. */
export function Mark({ height = 28 }: { height?: number }) {
  // small cut proportions (R-07) — used in headers
  return (
    <svg
      viewBox="-120 -120 480 240"
      height={height}
      aria-label="Upstream Zero"
      role="img"
    >
      <circle
        r="50.75"
        fill="none"
        stroke="currentColor"
        strokeWidth="18.5"
      />
      <line
        x1="60"
        y1="0"
        x2="276"
        y2="0"
        stroke="currentColor"
        strokeWidth="5"
      />
    </svg>
  );
}

/** Ring alone, for tight square contexts (datum runs to frame edge, R-47,
 *  is handled by the container's own rule line). */
export function MarkRing({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="-70 -70 140 140" width={size} height={size} aria-hidden>
      <circle r="50.75" fill="none" stroke="currentColor" strokeWidth="18.5" />
    </svg>
  );
}
