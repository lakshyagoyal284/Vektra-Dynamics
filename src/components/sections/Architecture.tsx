"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { LAYERS } from "@/lib/data";

export default function Architecture() {
  const reduce = useReducedMotion();

  return (
    <section
      id="architecture"
      className="band-high relative isolate scroll-mt-24 overflow-hidden border-t border-line py-24 sm:py-32"
    >
      {/* schematic grid + warm light — the one warm moment on the page */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-faint bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_80%_10%,black,transparent)]" />
        <div className="absolute right-[-8%] top-[-15%] h-[480px] w-[560px] rounded-full bg-accent-ember/[0.09] blur-[130px]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Architecture"
          tone="ember"
          title="One reference architecture, four layers"
          description="Every build starts from the same proven structure — so nothing is invented twice, and everything is documented."
        />

        {/* ---------------------------- layer stack */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <Reveal>
            <ol className="relative space-y-2.5">
              {LAYERS.map((layer, i) => {
                const isLast = i === LAYERS.length - 1;
                return (
                  <li key={layer.id}>
                    <motion.div
                      whileHover={reduce ? {} : { x: 5 }}
                      transition={{ type: "spring", stiffness: 100, damping: 18 }}
                      className="group relative flex items-center gap-5 border border-line bg-surface-mid/80 p-5 backdrop-blur transition-colors hover:border-accent-ember/35"
                    >
                      {/* depth bar — grows with each layer to imply stacking */}
                      <span
                        aria-hidden="true"
                        className={`h-9 w-0.5 shrink-0 ${
                          isLast ? "bg-accent-ember/70" : "bg-accent-cyan/45"
                        }`}
                        style={{ height: `${36 + i * 8}px` }}
                      />
                      <span
                        className={`shrink-0 font-mono text-xs font-semibold ${
                          isLast ? "text-accent-ember" : "text-accent-cyan"
                        }`}
                      >
                        {layer.tag}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                          <h3 className="font-display text-base font-medium text-ink">
                            {layer.title}
                          </h3>
                          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted/80">
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

          {/* ---------------------------- rationale */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-between gap-10">
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-muted">
                  Most projects don&apos;t need exotic architecture — they need a
                  boring, well-documented one that a new engineer can read in an
                  afternoon.
                </p>
                <p className="text-sm leading-relaxed text-muted/85">
                  We compose each layer from the same small set of tools, then
                  tune it to your traffic and your team. The result is fewer
                  surprises under load, faster onboarding, and an AI layer you
                  can switch on without a rewrite.
                </p>

                {/* pull quote — adds typographic contrast */}
                <blockquote className="border-l-2 border-accent-ember/50 pl-5">
                  <p className="font-display text-lg leading-snug tracking-tight text-ink/90">
                    Boring architecture is a feature. It survives contact with
                    real teams.
                  </p>
                </blockquote>
              </div>

              <dl className="grid grid-cols-2 gap-px border border-line bg-line">
                {[
                  ["34", "Edge regions"],
                  ["<20ms", "Typical TTFB"],
                  ["4", "Architecture layers"],
                  ["1", "Diagram, always current"],
                ].map(([v, k]) => (
                  <div key={k} className="bg-surface-mid px-5 py-5">
                    <dd className="font-display text-2xl font-medium tracking-tight text-ink">
                      {v}
                    </dd>
                    <dt className="mt-1 text-[12px] text-muted">{k}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}