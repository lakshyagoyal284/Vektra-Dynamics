"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { CASE_STUDIES, CASE_TAGS, type CaseTag } from "@/lib/data";

type Filter = CaseTag | "all";

export default function CaseStudies() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    filter === "all"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.tags.includes(filter));

  return (
    <section
      id="insights"
      className="scroll-mt-24 border-t border-line py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            index="05"
            eyebrow="Insights"
            title="Selected work"
          />
          <Reveal delay={0.1}>
            <div
              role="tablist"
              aria-label="Filter case studies"
              className="flex flex-wrap gap-2"
            >
              {CASE_TAGS.map((tag) => {
                const active = filter === tag.id;
                return (
                  <button
                    key={tag.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(tag.id)}
                    className={`border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                      active
                        ? "border-accent-cyan/60 bg-accent-cyan/10 text-accent-cyan"
                        : "border-line bg-obsidian/60 text-muted hover:border-muted/40 hover:text-ink"
                    }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((cs) => (
              <motion.article
                layout
                key={cs.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 100, damping: 24 }}
                className="group relative flex flex-col border border-line bg-surface/50 p-6 transition-colors duration-300 hover:border-accent-cyan/40"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {cs.client}
                </p>
                <h3 className="mt-2 font-display text-lg font-medium tracking-tight text-ink">
                  {cs.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {cs.summary}
                </p>

                <div className="mt-6 flex items-end justify-between border-t border-line/80 pt-5">
                  <div>
                    <p className="font-display text-2xl font-medium text-ink">
                      {cs.metric}
                    </p>
                    <p className="mt-0.5 text-[12px] text-muted">{cs.metricLabel}</p>
                  </div>
                  <ul className="flex flex-wrap justify-end gap-1.5">
                    {cs.stack.map((t) => (
                      <li
                        key={t}
                        className="border border-line bg-obsidian/70 px-2 py-1 font-mono text-[10px] text-muted"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
