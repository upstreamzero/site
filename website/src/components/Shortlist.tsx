"use client";

import { useEffect, useRef, useState } from "react";

/** The signature hero visual: an AI recommendation set narrowing as a buyer
 *  adds requirements. The most visible company ("Category Leader") is cut
 *  first; a smaller company ("Your Company") survives every cut. It is a
 *  teaching illustration, labelled as such, not a claim about a real run.
 *
 *  Built as a client component because it animates over time. It respects
 *  prefers-reduced-motion by rendering the final, static end-state instead
 *  of looping, so the point lands without movement. */

type Company = { nm: string; you?: boolean; leader?: boolean };

const COMPANIES: Company[] = [
  { nm: "Category Leader", leader: true },
  { nm: "Established Vendor" },
  { nm: "Your Company", you: true },
  { nm: "Regional Player" },
  { nm: "Legacy Incumbent" },
  { nm: "Niche Specialist" },
];

type Step = { req: string; cut: number[]; done?: boolean };

const STEPS: Step[] = [
  { req: 'Buyer: "best options for enterprise?"', cut: [] },
  { req: "+ must integrate with our stack", cut: [4] },
  { req: "+ SOC 2 and data residency", cut: [3] },
  { req: "+ proven at our scale", cut: [0] },
  { req: "+ references in our sector", cut: [1] },
  { req: "Final recommendation", cut: [], done: true },
];

type RowState = "in" | "cut" | "survive";

function statuses(uptoStep: number): RowState[] {
  const cut = new Set<number>();
  for (let s = 0; s <= uptoStep; s++) STEPS[s].cut.forEach((i) => cut.add(i));
  const done = STEPS[uptoStep]?.done;
  return COMPANIES.map((_, i) => {
    if (cut.has(i)) return "cut";
    if (done) return "survive";
    return "in";
  });
}

const LABEL: Record<RowState, string> = {
  in: "In",
  cut: "Cut",
  survive: "Survives",
};

export default function Shortlist() {
  const reduce = useRef(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    reduce.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce.current) {
      setStep(STEPS.length - 1); // static end-state, no animation
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    let current = 0;
    const advance = () => {
      current += 1;
      if (current >= STEPS.length) {
        // hold the final frame, then reset and loop
        timer = setTimeout(() => {
          current = 0;
          setStep(0);
          timer = setTimeout(advance, 1600);
        }, 3200);
        setStep(STEPS.length - 1);
        return;
      }
      setStep(current);
      timer = setTimeout(advance, current === STEPS.length - 1 ? 1500 : 1650);
    };
    timer = setTimeout(advance, 1400);
    return () => clearTimeout(timer);
  }, []);

  const state = statuses(step);
  const cur = STEPS[step];
  const foot = cur?.done
    ? "The leader fell first. The company nobody could rule out is left standing."
    : "Six companies. One buyer. Watch who survives.";
  const footLead = cur?.done ? "The leader fell first." : "Six companies. One buyer.";
  const footRest = cur?.done
    ? " The company nobody could rule out is left standing."
    : " Watch who survives.";

  return (
    <div
      className="shortlist"
      role="img"
      aria-label="An AI recommendation set narrows as buyer requirements are added. The market leader is cut first; a smaller company survives every cut."
    >
      <div className="shortlist__head">
        <span className="shortlist__t">
          AI recommendation set <span>/ illustrative</span>
        </span>
        <span className="shortlist__req" aria-hidden="true">
          {cur?.req ?? " "}
        </span>
      </div>
      <div className="shortlist__body">
        {COMPANIES.map((c, i) => {
          const st = state[i];
          const cls = [
            "srow",
            c.you ? "is-you" : "",
            st === "cut" ? "is-cut" : "",
            st === "survive" ? "is-survive" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <div key={c.nm} className={cls}>
              <span className="srow__rk">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="srow__nm">
                {c.nm}
                {c.leader && <span className="srow__tag">most visible</span>}
              </span>
              <span className="srow__st">{LABEL[st]}</span>
            </div>
          );
        })}
      </div>
      <p className="shortlist__foot" aria-hidden="true">
        <strong>{footLead}</strong>
        {footRest}
      </p>
      <span className="sr-only">{foot}</span>
    </div>
  );
}
