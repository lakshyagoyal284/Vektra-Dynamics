"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/data";

export default function Services() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="services" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          eyebrow="Services"
          title="What we build"
          description="Four disciplines, one delivery team. Open any card for scope and typical deliverables."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {SERVICES.map((service, i) => {
            const open = openId === service.id;
            const Icon = service.icon;

            return (
              <Reveal key={service.id} delay={i * 0.06}>
                <div
                  className={`group relative flex h-full flex-col border bg-surface/50 transition-all duration-300 ${
                    open
                      ? "border-accent-cyan/50 bg-surface/80"
                      : "border-line hover:border-muted/40 hover:bg-surface/70"
                  }`}
                >
                  {/* top accent edge */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-px transition-opacity duration-300 ${
                      open
                        ? "bg-accent-cyan/70 opacity-100"
                        : "bg-gradient-to-r from-transparent via-muted/60 to-transparent opacity-0 group-hover:opacity-100"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : service.id)}
                    aria-expanded={open}
                    aria-controls={`service-panel-${service.id}`}
                    className="flex flex-1 flex-col p-7 text-left"
                  >
                    <span className="flex items-start justify-between gap-4">
                      <span
                        className={`flex h-12 w-12 items-center justify-center border transition-colors ${
                          open
                            ? "border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan"
                            : "border-line bg-obsidian/60 text-muted group-hover:text-ink"
                        }`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span
                        className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                          service.status === "LIVE" ? "text-accent-cyan" : "text-muted"
                        }`}
                      >
                        {service.status === "LIVE" ? "Available now" : "In development"}
                      </span>
                    </span>

                    <span className="mt-6 block font-display text-xl font-medium tracking-tight text-ink">
                      {service.title}
                    </span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-muted">
                      {service.tagline}
                    </span>
                    <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors group-hover:text-ink">
                      {open ? "Close" : "Details"}
                      <span aria-hidden="true" className="transition-transform duration-300">
                        {open ? "−" : "+"}
                      </span>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`service-panel-${service.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 26 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-line/80 px-7 pb-7 pt-5">
                          <p className="text-sm leading-relaxed text-muted">
                            {service.description}
                          </p>
                          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                            {service.deliverables.map((d) => (
                              <li
                                key={d}
                                className="flex items-baseline gap-2.5 text-[13px] text-ink/85"
                              >
                                <span
                                  className="mt-[7px] h-px w-3.5 shrink-0 bg-accent-cyan/70"
                                  aria-hidden="true"
                                />
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
