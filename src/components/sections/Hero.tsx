"use client";

import { motion, useReducedMotion } from "framer-motion";
import MiniRocket from "@/components/visuals/MiniRocket";

const FACTS = [
  { label: "Team", value: "Remote studio" },
  { label: "Founded", value: "2026" },
  { label: "Projects shipped", value: "10" },
] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  };

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      {/* ambient light, not a gradient blob — kept very low */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px]" aria-hidden="true">
        <div className="absolute left-1/2 top-[-180px] h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-accent-indigo/[0.07] blur-[120px]" />
        <div className="absolute left-1/4 top-[-80px] h-[300px] w-[500px] rounded-full bg-accent-cyan/[0.05] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2.5 border border-line bg-surface/60 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" aria-hidden="true" />
            Vektra Dynamics · Technology studio
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-7 text-balance font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.2rem]"
          >
            We architect web platforms &amp;{" "}
            <span className="text-muted">scalable digital ecosystems.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
          >
            From high-performance web engineering to custom intelligent
            software, we build the technical foundation for forward-thinking
            enterprises — and the roadmap to run it for years.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <motion.a
              href="#estimator"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 100, damping: 17 }}
              className="inline-flex items-center gap-2 border border-ink/20 bg-ink px-6 py-3 text-sm font-medium text-obsidian transition-colors hover:border-accent-cyan hover:bg-accent-cyan"
            >
              Get started
            </motion.a>
            <motion.a
              href="#capabilities"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 100, damping: 17 }}
              className="inline-flex items-center gap-2 border border-line bg-surface/60 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-muted/60"
            >
              View capabilities
            </motion.a>
          </motion.div>
        </motion.div>

        {/* facts strip */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 22, delay: 0.25 }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <dl className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
            {FACTS.map((s) => (
              <div key={s.label} className="bg-obsidian px-6 py-5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  {s.label}
                </dt>
                <dd className="mt-1.5 flex items-center gap-1.5 font-display text-lg font-medium text-ink">
                  {s.value}
                  {s.label === "Projects shipped" && <MiniRocket className="ml-0.5" />}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
