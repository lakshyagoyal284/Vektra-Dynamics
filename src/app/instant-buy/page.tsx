import type { Metadata } from "next";
import InstantBuyClient from "./InstantBuyClient";

export const metadata: Metadata = {
  title: "Instant Buy Order — Vektra Dynamics",
  description:
    "Order a fixed-scope Vektra Dynamics package directly. Pick a package, share your details, and a senior engineer confirms scope within one business day.",
};

export default function InstantBuyPage() {
  return (
    <div className="pt-36 pb-24 sm:pt-44 sm:pb-32">
      {/* ambient */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-[-160px] h-[360px] w-[760px] -translate-x-1/2 rounded-full bg-accent-cyan/[0.07] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* heading */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent-cyan">
            Instant Buy Order<span className="mx-2 text-muted/60">/</span>
            <span className="text-muted">Fixed scope</span>
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.06] tracking-tight sm:text-6xl">
            Skip the back-and-forth. Order a package now.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Pick the package that fits, leave your details, and we&apos;ll confirm
            scope and send an invoice within one business day. No payment is taken
            on this page.
          </p>
        </div>

        <InstantBuyClient />
      </div>
    </div>
  );
}