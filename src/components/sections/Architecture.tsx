"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const LAYERS = [
  {
    id: "edge",
    tag: "L0",
    title: "Edge",
    meta: "CDN · Middleware · WAF",
    detail: "Request shaping, auth gates, and geo-routing across 34 regions.",
  },
  {
    id: "app",
    tag: "L1",
    title: "Application",
    meta: "RSC · API Routes · tRPC",
    detail: "Server components and typed contracts — data travels once, compressed.",
  },
  {
    id: "data",
    tag: "L2",
    title: "Data",
    meta: "PostgreSQL · Redis · Queues",
    detail: "Schemas tuned for read/write throughput, caches with explicit invalidation.",
  },
  {
    id: "ai",
    tag: "L3",
    title: "AI",
    meta: "LLM · Vector · Evals",
    detail: "Retrieval and orchestration layers — designed now, activated when you're ready.",
  },
];

export default function Architecture() {
  return (
    <section
      id="architecture"
      className="scroll-mt-24 border-t border-line py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Architecture"
          title="One reference architecture, four layers"
          description="Every build starts from the same proven structure — so nothing is invented twice, and everything is documented."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="flex h-full flex-col justify-between gap-10">
              <div className="space-y-5">
                <p className="text-sm leading-relaxed text-muted">
                  Most projects don't need exotic architecture — they need a
                  boring, well-documented one that a new engineer can read in
                  an afternoon. We compose each layer from the same small set
                  of tools, then tune it to your traffic and team.
                </p>
                <p className="text-sm leading-relaxed text-muted">
                  The result: fewer surprises under load, faster onboarding,
                  and an AI layer you can switch on without a rewrite.
                </p>
              </div>
              <dl className="grid grid-cols-2 gap-px border border-line bg-line">
                {[
                  ["34", "Edge regions"],
                  ["<20ms", "Typical TTFB"],
                  ["4", "Architecture layers"],
                  ["1", "Diagram, always current"],
                ].map(([v, k]) => (
                  <div key={k} className="bg-obsidian px-5 py-4">
                    <dd className="font-display text-xl font-medium text-ink">{v}</dd>
                    <dt className="mt-0.5 text-[12px] text-muted">{k}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ol className="relative space-y-3">
              <span
                aria-hidden="true"
                className="absolute bottom-6 left-[22px] top-6 w-px bg-line"
              />
              {LAYERS.map((layer, i) => {
                const isLast = i === LAYERS.length - 1;
                return (
                  <li key={layer.id} className="relative">
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 100, damping: 18 }}
                      className="group flex items-center gap-4 border border-line bg-surface/50 p-5 transition-colors hover:border-accent-cyan/40"
                    >
                      <span
                        className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center border font-mono text-xs font-semibold ${
                          isLast
                            ? "border-accent-indigo/40 bg-obsidian text-accent-indigo"
                            : "border-accent-cyan/30 bg-obsidian text-accent-cyan"
                        }`}
                      >
                        {layer.tag}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                          <h3 className="font-display text-base font-medium text-ink">
                            {layer.title}
                          </h3>
                          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                            {layer.meta}
                          </p>
                        </div>
                        <p className="mt-1 text-[13px] leading-relaxed text-muted">
                          {layer.detail}
                        </p>
                      </div>
                    </motion.div>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
