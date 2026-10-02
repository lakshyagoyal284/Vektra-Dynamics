"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import SmartImage from "@/components/ui/SmartImage";
import { SERVICES } from "@/lib/data";

const IMAGES: Record<string, string> = {
  "web-engineering": "/work/web-platform.png",
  "custom-software": "/work/custom-systems.webp",
  "ai-integration": "/work/ai-integration.webp",
  "design-systems": "/work/design-systems.webp",
};

export default function Services() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="services" className="band-mid scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          eyebrow="Services"
          title="Four disciplines, one team"
          description="Each one is a complete engagement rather than a slice of a bigger retainer. Open any card for scope and deliverables."
        />

        <div className="mt-16 space-y-4">
          {SERVICES.map((service, i) => {
            const open = openId === service.id;
            const Icon = service.icon;
            const isRoadmap = service.status === "ROADMAP";

            return (
              <Reveal key={service.id} delay={i * 0.05}>
                <article
                  className={`group relative overflow-hidden border bg-surface-mid transition-colors duration-300 ${
                    open
                      ? "border-accent-cyan/45"
                      : "border-line hover:border-lineStrong"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-accent-cyan/70 to-transparent transition-opacity duration-300 ${
                      open ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                    }`}
                  />

                  <div className="grid md:grid-cols-[380px_1fr]">
                    {/* image rail — collapses away on small screens.
                        The border runs the full row height; the landscape
                        frame sits centred inside it. */}
                    <div className="relative hidden border-r border-line md:flex md:items-center">
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <SmartImage
                          src={IMAGES[service.id]}
                          alt={`${service.title} — representative work`}
                          label={service.id}
                          sizes="(max-width: 768px) 0px, 380px"
                        />
                      </div>
                    </div>

                    <div className="p-7 sm:p-9">
                      <div className="flex items-start justify-between gap-5">
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-[11px] text-muted/50">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`flex h-11 w-11 items-center justify-center border transition-colors ${
                              open
                                ? "border-accent-cyan/50 bg-accent-cyan/10 text-accent-cyan"
                                : "border-line bg-surface-high text-muted group-hover:text-ink"
                            }`}
                          >
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        </div>

                        <span
                          className={`shrink-0 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ${
                            isRoadmap
                              ? "border-line text-muted/70"
                              : "border-accent-cyan/30 text-accent-cyan"
                          }`}
                        >
                          {isRoadmap ? "Roadmap" : "Available"}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setOpenId(open ? null : service.id)}
                        aria-expanded={open}
                        aria-controls={`service-panel-${service.id}`}
                        className="mt-6 block w-full text-left"
                      >
                        <h3 className="font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">
                          {service.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {service.tagline}
                        </p>
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
                            <div className="mt-6 border-t border-line pt-6">
                              <p className="max-w-2xl text-sm leading-relaxed text-muted">
                                {service.description}
                              </p>
                              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                                {service.deliverables.map((d) => (
                                  <li
                                    key={d}
                                    className="flex items-baseline gap-3 text-[13px] text-ink/85"
                                  >
                                    <span
                                      className="mt-[7px] h-px w-4 shrink-0 bg-accent-cyan/70"
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

                      <button
                        type="button"
                        onClick={() => setOpenId(open ? null : service.id)}
                        aria-expanded={open}
                        className="group/link mt-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-accent-cyan"
                      >
                        {open ? "Close" : "See deliverables"}
                        <ArrowUpRight
                          className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}