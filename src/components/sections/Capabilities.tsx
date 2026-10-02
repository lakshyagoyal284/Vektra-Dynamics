"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { STACK_GROUPS, HIGHLIGHTS } from "@/lib/data";

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="band-mid scroll-mt-24 border-t border-line py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="Capabilities"
          title="The tools, and the bar we hold them to"
          description="A deliberately small stack, all in active production use. We pick what we can maintain and defend."
        />

        {/* asymmetric metric tiles — lead tile spans two columns */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h, i) => {
            const Icon = h.icon;
            const lead = i === 0;

            return (
              <Reveal
                key={h.id}
                delay={i * 0.05}
                className={lead ? "lg:col-span-2" : ""}
              >
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 100, damping: 18 }}
                  className="group relative h-full overflow-hidden border border-line bg-surface-high p-7 transition-colors hover:border-accent-cyan/35"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  {/* oversized ghost numeral for depth */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-6 right-3 font-display text-[7rem] font-medium leading-none text-ink/[0.025]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative flex items-center justify-between">
                    <Icon className="h-5 w-5 text-accent-cyan/70" aria-hidden="true" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted/45">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p
                    className={`relative mt-6 font-display font-medium tracking-tight text-ink ${
                      lead ? "text-5xl sm:text-6xl" : "text-3xl"
                    }`}
                  >
                    {h.metric}
                  </p>
                  <p className="relative mt-2 max-w-[16rem] text-[13px] leading-snug text-muted">
                    {h.label}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* stack groups — list-based, not cards */}
        <div className="mt-4 border-t border-line">
          {STACK_GROUPS.map((group, i) => {
            const Icon = group.icon;
            return (
              <Reveal key={group.id} delay={i * 0.05}>
                <div className="group grid gap-5 border-b border-line py-8 transition-colors hover:bg-surface-high/40 sm:grid-cols-[220px_1fr] sm:items-center sm:gap-8 sm:px-4">
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-line bg-surface-high text-muted transition-colors group-hover:border-accent-cyan/40 group-hover:text-accent-cyan">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-base font-medium text-ink">
                      {group.title}
                    </h3>
                  </div>

                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="border border-line bg-surface-mid px-3 py-1.5 font-mono text-[12px] text-muted transition-colors group-hover:border-lineStrong group-hover:text-ink/85"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}