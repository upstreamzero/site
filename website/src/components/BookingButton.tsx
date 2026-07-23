"use client";

import { useCallback, type ReactNode } from "react";

/** The single scheduling destination for the whole site. One place to
 *  change the link. */
export const BOOKING_URL = "https://calendly.com/skykmeyer/30min";
const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";
const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (opts: { url: string }) => void };
    gtag?: (...args: unknown[]) => void;
  }
}

/** Calendly's assets are loaded lazily, on the first click, and shared
 *  across every booking button on the page through this one promise. No
 *  third-party JavaScript touches initial page load, which keeps the
 *  pages fast for both readers and Core Web Vitals. */
let loader: Promise<void> | null = null;

function ensureCalendly(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (loader) return loader;

  loader = new Promise<void>((resolve, reject) => {
    if (!document.querySelector(`link[href="${WIDGET_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = WIDGET_CSS;
      document.head.appendChild(link);
    }
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${WIDGET_JS}"]`,
    );
    if (existing) {
      if (window.Calendly) return resolve();
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Calendly failed to load")),
      );
      return;
    }
    const script = document.createElement("script");
    script.src = WIDGET_JS;
    script.async = true;
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () =>
      reject(new Error("Calendly failed to load")),
    );
    document.body.appendChild(script);
  });
  return loader;
}

type Variant = "btn" | "btn-ghost" | "btn-lime";

/** A primary call to action that opens the Calendly scheduling popup.
 *  It wears the existing button classes so it is visually identical to
 *  the links it replaces; it is a real <button> because it triggers a
 *  dialog rather than navigating. If the third-party widget is blocked
 *  or offline, it falls back to opening the booking page directly, so a
 *  visitor is never left with a dead button. */
export default function BookingButton({
  children,
  variant = "btn",
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const open = useCallback(async () => {
    window.gtag?.("event", "booking_open", { method: "calendly" });
    try {
      await ensureCalendly();
      window.Calendly?.initPopupWidget({ url: BOOKING_URL });
    } catch {
      window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
    }
  }, []);

  return (
    <button
      type="button"
      onClick={open}
      className={`${variant} cursor-pointer ${className}`.trim()}
    >
      {children}
    </button>
  );
}
