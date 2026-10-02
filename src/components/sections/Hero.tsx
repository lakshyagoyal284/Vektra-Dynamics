"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import MiniRocket from "@/components/visuals/MiniRocket";
import SmartImage from "@/components/ui/SmartImage";

const FACTS = [
  { label: "Team", value: "Remote studio" },
  { label: "Founded", value: "2026" },
  { label: "Projects shipped", value: "10" },
] as const;

const MARKS = [
  "Next.js App Router",
  "Typed end to end",
  "Edge-deployed",
  "Documented",
] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 90, damping: 19 },
    },
  };

  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-surface-deep pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* backdrop: grid + drifting light. Kept low contrast so type leads. */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-faint bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <div
          className={`absolute -left-[10%] -top-[20%] h-[520px] w-[720px] rounded-full bg-accent-indigo/[0.13] blur-[130px] ${
            reduce ? "" : "animate-drift"
          }`}
        />
        <div
          className={`absolute -right-[12%] top-[10%] h-[440px] w-[620px] rounded-full bg-accent-cyan/[0.10] blur-[120px] ${
            reduce ? "" : "animate-drift"
          }`}
          style={{ animationDelay: "-8s" }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* ------------------------------- left: the pitch */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.p
              variants={item}
              className="inline-flex items-center gap-2.5 border border-line bg-ink/[0.04] px-3.5 py-1.5 backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent-cyan" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-cyan" />
              </span>
              <span className="eyebrow text-muted">Technology studio · Est. 2026</span>
            </motion.p>

            <motion.h1
              variants={item}
              className="mt-8 text-balance font-display text-[2.6rem] font-medium leading-[0.98] tracking-[-0.02em] sm:text-6xl lg:text-[4.4rem]"
            >
              We build the
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">technical core</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-1 z-0 h-3 bg-accent-cyan/20 sm:bottom-2 sm:h-4"
                />
              </span>{" "}
              <span className="text-muted">your product runs on.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-7 max-w-lg text-pretty text-base leading-relaxed text-muted sm:text-lg"
            >
              High-performance web platforms, custom software, and the
              groundwork for AI systems — for teams that want engineering they
              can trust and code they own outright.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-9 flex flex-wrap items-center gap-3.5"
            >
              <motion.a
                href="#contact"
                whileHover={reduce ? {} : { y: -2 }}
                whileTap={reduce ? {} : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 100, damping: 17 }}
                className="group inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-sm font-medium text-obsidian transition-colors hover:bg-accent-cyan"
              >
                Start a project
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </motion.a>
              <motion.a
                href="/instant-buy"
                whileHover={reduce ? {} : { y: -2 }}
                whileTap={reduce ? {} : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 100, damping: 17 }}
                className="group inline-flex items-center gap-2 border border-lineStrong bg-ink/[0.03] px-6 py-3.5 text-sm font-medium text-ink backdrop-blur transition-colors hover:border-accent-cyan/50"
              >
                Order a package
                <ArrowUpRight
                  className="h-4 w-4 text-muted transition-colors group-hover:text-accent-cyan"
                  aria-hidden="true"
                />
              </motion.a>
            </motion.div>

            {/* capability strip — breaks up the text block */}
            <motion.ul
              variants={item}
              className="mt-11 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-6"
            >
              {MARKS.map((mark, i) => (
                <li
                  key={mark}
                  className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted/75"
                >
                  {i > 0 && (
                    <span className="h-1 w-1 rounded-full bg-lineStrong" aria-hidden="true" />
                  )}
                  {mark}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ------------------------------- right: visual anchor */}
          <motion.div
            initial={{ opacity: 0, scale: reduce ? 1 : 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 70, damping: 22, delay: 0.15 }}
            className="relative"
          >
            {/* Landscape frame — the source photo is ~1.9:1, so a portrait
                crop would cut both people out of the shot. */}
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-line bg-surface-mid shadow-panel">
              <SmartImage
                src="/hero-studio.png"
                alt="Two engineers reviewing a build together at a workstation"
                label="hero-studio.png"
                sizes="(max-width: 1024px) 92vw, 460px"
                priority
              />
              {/* corner ticks — technical framing */}
              <span aria-hidden="true" className="absolute left-3 top-3 h-4 w-4 border-l border-t border-accent-cyan/50" />
              <span aria-hidden="true" className="absolute right-3 top-3 h-4 w-4 border-r border-t border-accent-cyan/50" />
              <span aria-hidden="true" className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-accent-cyan/50" />
              <span aria-hidden="true" className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-accent-cyan/50" />
            </div>

            {/* floating stat card */}
            <div className="absolute -bottom-6 -left-4 w-[15rem] border border-line bg-surface-high/95 p-5 shadow-panel backdrop-blur sm:-left-8">
              <p className="eyebrow text-accent-cyan">Delivery</p>
              <p className="mt-2.5 font-display text-2xl font-medium tracking-tight text-ink">
                2 wks
              </p>
              <p className="mt-1 text-[13px] leading-snug text-muted">
                to first shipped increment
              </p>
            </div>
          </motion.div>
        </div>

        {/* facts strip */}
        <motion.dl
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 22, delay: 0.35 }}
          className="mt-24 grid grid-cols-1 gap-px border-y border-line bg-line sm:mt-28 sm:grid-cols-3"
        >
          {FACTS.map((s) => (
            <div key={s.label} className="bg-surface-deep px-6 py-5">
              <dt className="eyebrow text-muted/70">{s.label}</dt>
              <dd className="mt-2 flex items-center gap-1.5 font-display text-lg font-medium text-ink">
                {s.value}
                {s.label === "Projects shipped" && <MiniRocket className="ml-0.5" />}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}