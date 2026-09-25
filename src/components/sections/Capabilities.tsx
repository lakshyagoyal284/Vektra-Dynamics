"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { STACK_GROUPS, HIGHLIGHTS } from "@/lib/data";

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="scroll-mt-24 border-t border-line py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="Capabilities"
          title="The tools, and the bar we hold them to"
          description="A deliberately small stack, in active production use. Hover a group to see it come forward."
        />

        {/* metric tiles */}
        <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h, i) => {
            const Icon = h.icon;
            return (
              <Reveal key={h.id} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 100, damping: 18 }}
                  className="group relative h-full bg-obsidian p-6"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-muted" aria-hidden="true" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-5 font-display text-2xl font-medium tracking-tight text-ink">
                    {h.metric}
                  </p>
                  <p className="mt-1 text-[13px] leading-snug text-muted">
                    {h.label}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* stack group panels */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {STACK_GROUPS.map((group, i) => {
            const Icon = group.icon;
            return (
              <Reveal key={group.id} delay={i * 0.06}>
                <div className="group relative h-full border border-line bg-surface/50 p-7 transition-colors duration-300 hover:border-accent-cyan/40">
                  <div className="flex items-center justify-between">
                    <h3 className="flex items-center gap-3 font-display text-base font-medium text-ink">
                      <span className="flex h-9 w-9 items-center justify-center border border-line bg-obsidian/60 text-muted transition-colors group-hover:text-accent-cyan">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      {group.title}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted/50">
                      {String(group.items.length).padStart(2, "0")} tools
                    </span>
                  </div>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="border border-line bg-obsidian/70 px-2.5 py-1.5 font-mono text-[12px] text-muted transition-colors group-hover:border-muted/30 group-hover:text-ink/85"
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
