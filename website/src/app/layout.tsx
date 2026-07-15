import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://upstreamzero.com"),
  title: {
    default: "Upstream Zero — Commercial Evaluation Observatory",
    template: "%s · Upstream Zero",
  },
  description:
    "A research company studying commercial evaluation. Version 0.1 — First Light: the instrument is built; observations begin now. Claims are presented at their evidence tier, and most of them are Narrated.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
