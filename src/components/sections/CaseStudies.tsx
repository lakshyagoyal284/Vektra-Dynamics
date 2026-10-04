"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import SmartImage from "@/components/ui/SmartImage";
import CaseGallery from "@/components/ui/CaseGallery";
import { CASE_STUDIES, CASE_TAGS, type CaseTag } from "@/lib/data";

type Filter = CaseTag | "all";

/* Supplied artwork, keyed by the CASE_STUDIES id. Anything absent falls back
   to the documented .webp slot, which SmartImage renders as a placeholder. */
const CASE_IMAGES: Record<string, string> = {
  diptis: "/work/case-diptis.png",
  helios: "/work/case-helios.png",
  atlas: "/work/case-atlas.png",
  nordwind: "/work/case-nordwind.png",
};

export default function CaseStudies() {
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const openCase = CASE_STUDIES.find((c) => c.id === openId);

  const visible =
    filter === "all"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.tags.includes(filter));

  return (
    <section
      id="insights"
      className="band-deep scroll-mt-24 border-t border-line py-24 sm:py-32"
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
                        : "border-line bg-surface-mid text-muted hover:border-lineStrong hover:text-ink"
                    }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((cs, i) => (
              <motion.article
                layout
                key={cs.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 100, damping: 24 }}
                className={`group relative flex flex-col overflow-hidden border border-line bg-surface-mid transition-colors duration-300 hover:border-accent-cyan/40 focus-within:border-accent-cyan/60 ${
                  cs.gallery ? "cursor-pointer" : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-accent-cyan/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line">
                  <SmartImage
                    src={CASE_IMAGES[cs.id] ?? `/work/case-${cs.id}.webp`}
                    alt={`${cs.title} — ${cs.client}`}
                    label={cs.id}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 360px"
                  />
                  <span className="absolute left-4 top-4 z-10 border border-ink/20 bg-obsidian/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/90 backdrop-blur">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {cs.gallery && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-obsidian/70 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100"
                    >
                      <span className="inline-flex items-center gap-2 border border-accent-cyan/50 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-cyan">
                        View screenshot
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    {cs.client}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-medium tracking-tight text-ink">
                    {cs.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {cs.summary}
                  </p>

                  <div className="mt-6 flex items-end justify-between gap-4 border-t border-line/80 pt-5">
                    <div className="shrink-0">
                      <p className="font-display text-2xl font-medium text-ink">
                        {cs.metric}
                      </p>
                      <p className="mt-0.5 text-[12px] text-muted">{cs.metricLabel}</p>
                    </div>
                    <ul className="flex flex-wrap justify-end gap-1.5">
                      {cs.stack.map((t) => (
                        <li
                          key={t}
                          className="border border-line bg-surface-deep px-2 py-1 font-mono text-[10px] text-muted"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {cs.gallery && (
                  <button
                    type="button"
                    onClick={() => setOpenId(cs.id)}
                    aria-label={`Open the ${cs.title} screenshot`}
                    className="absolute inset-0 z-20 focus:outline-none"
                  />
                )}
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {openCase?.gallery && (
          <CaseGallery
            key={openCase.id}
            images={openCase.gallery}
            title={openCase.title}
            client={openCase.client}
            summary={openCase.summary}
            onClose={() => setOpenId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
