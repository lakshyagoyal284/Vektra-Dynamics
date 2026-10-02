"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import {
  BASE_ESTIMATE,
  SCALE_NEEDS,
  SERVICE_TYPES,
  TIMELINES,
  type ScaleOption,
  type ServiceType,
  type TimelineOption,
} from "@/lib/data";

type StepId = "service" | "timeline" | "scale";

const STEPS: readonly { id: StepId; label: string; index: string; question: string }[] = [
  { id: "service", label: "Service type", index: "01", question: "What are we building?" },
  { id: "timeline", label: "Timeline", index: "02", question: "How fast do you need it?" },
  { id: "scale", label: "Scalability", index: "03", question: "Where should it run?" },
];

interface ChoiceMap {
  service: ServiceType | null;
  timeline: TimelineOption | null;
  scale: ScaleOption | null;
}

export default function Estimator() {
  const [step, setStep] = useState<StepId>("service");
  const [choices, setChoices] = useState<ChoiceMap>({
    service: null,
    timeline: null,
    scale: null,
  });

  const stepIndex = STEPS.findIndex((s) => s.id === step);
  const complete = useMemo(
    () => choices.service !== null && choices.timeline !== null && choices.scale !== null,
    [choices]
  );

  const select = <K extends keyof ChoiceMap>(key: K, value: NonNullable<ChoiceMap[K]>) => {
    setChoices((c) => ({ ...c, [key]: value }));
    const next = STEPS[stepIndex + 1];
    if (next) setStep(next.id);
  };

  const estimate = useMemo(() => {
    if (!complete || !choices.service || !choices.timeline || !choices.scale) {
      return null;
    }
    const w =
      SERVICE_TYPES.find((s) => s.id === choices.service)!.weight *
      TIMELINES.find((t) => t.id === choices.timeline)!.weight *
      SCALE_NEEDS.find((s) => s.id === choices.scale)!.weight;
    const thousands = (BASE_ESTIMATE * w) / 1000;
    return {
      low: Math.round(thousands),
      high: Math.round(thousands * 1.35),
    };
  }, [choices, complete]);

  // value is in thousands of INR
  const formatINR = (k: number) =>
    k >= 100 ? `₹${(k / 100).toFixed(1)} L` : `₹${Math.round(k)} K`;

  const chosenLabels = useMemo(
    () => ({
      service: SERVICE_TYPES.find((s) => s.id === choices.service)?.label ?? null,
      timeline: TIMELINES.find((t) => t.id === choices.timeline)?.label ?? null,
      scale: SCALE_NEEDS.find((s) => s.id === choices.scale)?.label ?? null,
    }),
    [choices]
  );

  const optionCard = (
    option: { id: string; label: string; meta: string },
    idx: number,
    selected: boolean,
    onSelect: () => void
  ) => (
    <button
      key={option.id}
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group relative border p-5 text-left transition-all duration-200 ${
        selected
          ? "border-accent-cyan/70 bg-accent-cyan/[0.06]"
          : "border-line bg-obsidian/50 hover:border-muted/50 hover:bg-obsidian/70"
      }`}
    >
      {selected && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-accent-cyan/80"
        />
      )}
      <span className="flex items-start justify-between gap-3">
        <span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted/60">
            {String(idx + 1).padStart(2, "0")}
          </span>
          <span
            className={`mt-1.5 block font-display text-base font-medium ${
              selected ? "text-ink" : "text-ink/85"
            }`}
          >
            {option.label}
          </span>
          <span className="mt-1 block text-[13px] leading-relaxed text-muted">
            {option.meta}
          </span>
        </span>
        <span
          className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
            selected
              ? "border-accent-cyan bg-accent-cyan"
              : "border-muted/40 group-hover:border-muted"
          }`}
          aria-hidden="true"
        >
          {selected && <Check className="h-3 w-3 text-obsidian" />}
        </span>
      </span>
    </button>
  );

  return (
    <section
      id="estimator"
      className="band-high relative isolate scroll-mt-24 overflow-hidden border-t border-line py-24 sm:py-32"
    >
      {/* ambient light + grid behind the panel */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-faint bg-grid [mask-image:radial-gradient(ellipse_50%_40%_at_50%_30%,black,transparent)]" />
        <div className="absolute left-1/2 top-28 h-[380px] w-[720px] -translate-x-1/2 rounded-full bg-accent-indigo/[0.09] blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Scope builder"
          title="Get a rough number before we talk"
          description="Three questions, thirty seconds. You'll get an indicative range — enough to know if we fit your budget before a call."
        />

        <Reveal className="mt-16">
          <div className="relative border border-line bg-surface-mid/85 shadow-panel backdrop-blur">
            {/* top accent line */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/70 to-transparent"
            />

            <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
              {/* worksheet */}
              <div className="p-6 sm:p-10">
                {/* stepper with progress line */}
                <ol className="flex items-center gap-2 sm:gap-3" aria-label="Estimator progress">
                  {STEPS.map((s, i) => {
                    const active = s.id === step;
                    const done = i < stepIndex;
                    return (
                      <li key={s.id} className="flex flex-1 items-center gap-2 sm:gap-3 last:flex-none">
                        <button
                          type="button"
                          onClick={() => setStep(s.id)}
                          aria-current={active ? "step" : undefined}
                          className="flex items-center gap-2.5"
                        >
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] transition-all ${
                              done
                                ? "border-accent-cyan bg-accent-cyan text-obsidian"
                                : active
                                  ? "border-accent-cyan text-accent-cyan [box-shadow:0_0_18px_rgba(125,211,192,0.25)]"
                                  : "border-line text-muted/60"
                            }`}
                          >
                            {done ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : s.index}
                          </span>
                          <span
                            className={`hidden font-mono text-[11px] uppercase tracking-[0.16em] sm:block ${
                              active ? "text-ink" : done ? "text-muted" : "text-muted/50"
                            }`}
                          >
                            {s.label}
                          </span>
                        </button>
                        {i < STEPS.length - 1 && (
                          <span
                            className="relative h-px flex-1 overflow-hidden bg-line"
                            aria-hidden="true"
                          >
                            {done && (
                              <motion.span
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ type: "spring", stiffness: 100, damping: 22 }}
                                className="absolute inset-0 origin-left bg-accent-cyan/70"
                              />
                            )}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ol>

                <div className="mt-9 min-h-[290px]">
                  <AnimatePresence mode="wait">
                    {STEPS.map((s) =>
                      step === s.id ? (
                        <motion.fieldset
                          key={s.id}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ type: "spring", stiffness: 100, damping: 24 }}
                        >
                          <legend className="sr-only">{s.question}</legend>
                          <p className="font-display text-2xl font-medium tracking-tight text-ink sm:text-[1.7rem]">
                            {s.question}
                          </p>
                          <div
                            className={`mt-7 grid gap-3 ${
                              s.id === "service" ? "sm:grid-cols-2" : ""
                            }`}
                          >
                            {s.id === "service" &&
                              SERVICE_TYPES.map((o, idx) =>
                                optionCard(o, idx, choices.service === o.id, () =>
                                  select("service", o.id)
                                )
                              )}
                            {s.id === "timeline" &&
                              TIMELINES.map((o, idx) =>
                                optionCard(o, idx, choices.timeline === o.id, () =>
                                  select("timeline", o.id)
                                )
                              )}
                            {s.id === "scale" &&
                              SCALE_NEEDS.map((o, idx) =>
                                optionCard(o, idx, choices.scale === o.id, () =>
                                  select("scale", o.id)
                                )
                              )}
                          </div>
                        </motion.fieldset>
                      ) : null
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-center justify-between border-t border-line/80 pt-6">
                  <p className="font-mono text-[11px] text-muted">
                    step {stepIndex + 1} / {STEPS.length}
                  </p>
                  <div className="flex items-center gap-3">
                    {stepIndex > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          const prev = STEPS[stepIndex - 1];
                          if (prev) setStep(prev.id);
                        }}
                        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
                      >
                        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                        Back
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        const next = STEPS[stepIndex + 1];
                        if (next) setStep(next.id);
                      }}
                      disabled={stepIndex === STEPS.length - 1}
                      className="inline-flex items-center gap-1.5 border border-line bg-obsidian/60 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent-cyan/60 hover:text-accent-cyan disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>

              {/* summary */}
              <aside
                aria-label="Scope summary"
                className="relative border-t border-line bg-surface-deep/80 p-6 sm:p-10 lg:border-l lg:border-t-0"
              >
                <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                  Scope summary
                </h3>

                <dl className="mt-7 space-y-4">
                  {(
                    [
                      ["service", "Service"],
                      ["timeline", "Timeline"],
                      ["scale", "Scale"],
                    ] as const
                  ).map(([key, label]) => (
                    <div
                      key={key}
                      className="flex items-baseline justify-between gap-4 border-b border-line/80 pb-4"
                    >
                      <dt className="text-[13px] text-muted">{label}</dt>
                      <dd
                        className={`text-right text-sm ${
                          chosenLabels[key] ? "text-ink" : "text-muted/40"
                        }`}
                      >
                        {chosenLabels[key] ?? "—"}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-9">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    Indicative range
                  </p>
                  <AnimatePresence mode="wait">
                    {estimate ? (
                      <motion.p
                        key={`${estimate.low}-${estimate.high}`}
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="mt-3 font-display text-4xl font-medium tracking-tight text-accent-cyan [text-shadow:0_0_32px_rgba(125,211,192,0.4)]"
                      >
                        {formatINR(estimate.low)}
                        <span className="mx-1.5 text-muted">–</span>
                        {formatINR(estimate.high)}
                      </motion.p>
                    ) : (
                      <p className="mt-3 font-display text-2xl font-medium text-muted/30">
                        ₹ —
                      </p>
                    )}
                  </AnimatePresence>
                  <p className="mt-4 text-[13px] leading-relaxed text-muted/70">
                    A ballpark, not a quote — final scope is set after a short
                    discovery session.
                  </p>
                </div>

                <motion.a
                  href="#contact"
                  whileHover={complete ? { y: -1 } : {}}
                  whileTap={complete ? { scale: 0.98 } : {}}
                  transition={{ type: "spring", stiffness: 100, damping: 17 }}
                  aria-disabled={!complete}
                  className={`mt-10 flex w-full items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium transition-all ${
                    complete
                      ? "bg-accent-cyan text-obsidian hover:bg-ink"
                      : "cursor-not-allowed border border-dashed border-line text-muted/50"
                  }`}
                >
                  Submit inquiry
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </motion.a>
              </aside>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
