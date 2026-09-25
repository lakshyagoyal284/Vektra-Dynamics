"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  FileSearch,
  Mail,
  MessagesSquare,
  Rocket,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { BUDGET_RANGES, PROJECT_TYPES } from "@/lib/data";

interface FormState {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  overview: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const INITIAL: FormState = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  overview: "",
};

const STEPS = [
  {
    icon: Mail,
    title: "You write",
    detail: "Two minutes, five fields. Rough ideas welcome.",
  },
  {
    icon: FileSearch,
    title: "We read",
    detail: "A senior engineer reviews it — same or next day.",
  },
  {
    icon: MessagesSquare,
    title: "We reply",
    detail: "First thoughts and honest feedback on fit.",
  },
  {
    icon: CalendarDays,
    title: "Discovery call",
    detail: "30 minutes. Scope, timeline, and a fixed proposal.",
  },
  {
    icon: Rocket,
    title: "Kickoff",
    detail: "Team assigned, repo ready, work starts.",
  },
] as const;

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = "Please add your name.";
  if (!form.email.trim()) {
    errors.email = "Please add your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) {
    errors.email = "That email doesn't look right.";
  }
  if (!form.projectType) errors.projectType = "Pick the closest fit.";
  if (!form.budget) errors.budget = "Pick a range — a guess is fine.";
  if (!form.overview.trim()) {
    errors.overview = "Tell us a little about the project.";
  } else if (form.overview.trim().length < 20) {
    errors.overview = "A sentence or two helps us route it well.";
  }
  return errors;
}

const inputBase =
  "w-full border border-line bg-obsidian/60 px-4 py-3 text-sm text-ink placeholder:text-muted/50 outline-none transition-colors focus:border-accent-cyan/60 focus:bg-obsidian/80";

export default function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const errors = validate(form);
  const showError = (field: keyof FormState) =>
    Boolean(touched[field] && errors[field]);
  const validField = (field: keyof FormState) =>
    Boolean(touched[field] && !errors[field]);

  const set =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const blur = (field: keyof FormState) => () =>
    setTouched((t) => ({ ...t, [field]: true }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, projectType: true, budget: true, overview: true });
    if (Object.keys(errors).length > 0) return;
    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setServerError(data.error ?? "Something went wrong. Please email us directly.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setServerError("Network problem — please check your connection and try again.");
      setStatus("error");
    }
  };

  const fieldBorder = (field: keyof FormState) =>
    showError(field)
      ? "!border-red-400/70"
      : validField(field)
        ? "!border-accent-cyan/60"
        : "";

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-line py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 h-[360px] w-[680px] -translate-x-1/2 rounded-full bg-accent-cyan/[0.06] blur-[130px]"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="06"
          eyebrow="Contact"
          title="Tell us what you're building"
          description="A senior engineer reads every inquiry — not a sales team. Expect a reply within one business day."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          {/* left: what happens next */}
          <Reveal>
            <div className="relative flex h-full flex-col border border-line bg-surface/40 shadow-card">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/70 to-transparent"
              />
              <div className="border-b border-line/80 p-7">
                <h3 className="font-display text-xl font-medium tracking-tight text-ink">
                  What happens next
                </h3>
                <p className="mt-1.5 text-sm text-muted">
                  The path from your message to kickoff.
                </p>
              </div>

              <ol className="relative flex-1 p-7">
                <span
                  aria-hidden="true"
                  className="absolute bottom-10 left-[46px] top-10 w-px bg-line"
                />
                {STEPS.map((s, i) => (
                  <li key={s.title} className="relative flex gap-4 pb-7 last:pb-0">
                    <span
                      className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center border ${
                        i === 0
                          ? "border-accent-cyan/60 bg-accent-cyan/10 text-accent-cyan"
                          : "border-line bg-obsidian text-muted"
                      }`}
                    >
                      <s.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="pt-1">
                      <p className="text-sm font-medium text-ink">
                        {s.title}
                        <span className="ml-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted/60">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </p>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-muted">
                        {s.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          {/* right: form */}
          <Reveal delay={0.1}>
            <div className="relative h-full border border-line bg-surface/40 p-7 shadow-card sm:p-10">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="flex min-h-[520px] flex-col items-start justify-center"
                    role="status"
                  >
                    <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-cyan">
                      <Rocket className="h-4 w-4" aria-hidden="true" />
                      Received
                    </p>
                    <h3 className="mt-5 font-display text-3xl font-medium tracking-tight text-ink">
                      Thanks — it's on our desk.
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                      You'll hear from a named engineer within one business
                      day. If it's urgent, reply to the confirmation email and
                      it jumps the queue.
                    </p>
                    <p className="mt-7 font-mono text-[11px] text-muted/70">
                      ref: vkt-{Math.floor(1000 + Math.random() * 9000)}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={onSubmit}
                    noValidate
                    className="space-y-6"
                  >
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={form.name}
                          onChange={set("name")}
                          onBlur={blur("name")}
                          aria-invalid={showError("name")}
                          aria-describedby={showError("name") ? "name-error" : undefined}
                          placeholder="Ada Lovelace"
                          className={`${inputBase} ${fieldBorder("name")}`}
                        />
                        {showError("name") && (
                          <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-400">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={set("email")}
                          onBlur={blur("email")}
                          aria-invalid={showError("email")}
                          aria-describedby={showError("email") ? "email-error" : undefined}
                          placeholder="ada@company.com"
                          className={`${inputBase} ${fieldBorder("email")}`}
                        />
                        {showError("email") && (
                          <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-400">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="projectType"
                          className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
                        >
                          Project type
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={form.projectType}
                          onChange={set("projectType")}
                          onBlur={blur("projectType")}
                          aria-invalid={showError("projectType")}
                          className={`${inputBase} cursor-pointer ${fieldBorder("projectType")}`}
                        >
                          <option value="" disabled>
                            Select…
                          </option>
                          {PROJECT_TYPES.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.label}
                            </option>
                          ))}
                        </select>
                        {showError("projectType") && (
                          <p role="alert" className="mt-1.5 text-xs text-red-400">
                            {errors.projectType}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="budget"
                          className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
                        >
                          Estimated budget
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={form.budget}
                          onChange={set("budget")}
                          onBlur={blur("budget")}
                          aria-invalid={showError("budget")}
                          className={`${inputBase} cursor-pointer ${fieldBorder("budget")}`}
                        >
                          <option value="" disabled>
                            Select…
                          </option>
                          {BUDGET_RANGES.map((b) => (
                            <option key={b.id} value={b.id}>
                              {b.label}
                            </option>
                          ))}
                        </select>
                        {showError("budget") && (
                          <p role="alert" className="mt-1.5 text-xs text-red-400">
                            {errors.budget}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="overview"
                        className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
                      >
                        Project overview
                      </label>
                      <textarea
                        id="overview"
                        name="overview"
                        rows={5}
                        value={form.overview}
                        onChange={set("overview")}
                        onBlur={blur("overview")}
                        aria-invalid={showError("overview")}
                        aria-describedby={showError("overview") ? "overview-error" : undefined}
                        placeholder="What are you building, and what's in the way?"
                        className={`${inputBase} resize-none ${fieldBorder("overview")}`}
                      />
                      <div className="mt-2 flex items-center justify-between">
                        {showError("overview") ? (
                          <p id="overview-error" role="alert" className="text-xs text-red-400">
                            {errors.overview}
                          </p>
                        ) : (
                          <span />
                        )}
                        <span className="font-mono text-[10px] text-muted/60">
                          {form.overview.trim().length < 20
                            ? `${20 - form.overview.trim().length} more to go`
                            : "good"}
                        </span>
                      </div>
                    </div>

                    {status === "error" && serverError && (
                      <p
                        role="alert"
                        className="border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300"
                      >
                        {serverError}
                      </p>
                    )}

                    <div className="flex flex-col items-stretch justify-between gap-4 border-t border-line/80 pt-6 sm:flex-row sm:items-center">
                      <p className="max-w-xs text-[13px] leading-relaxed text-muted/70">
                        No newsletters, no drip campaigns. Just a reply from an
                        engineer.
                      </p>
                      <motion.button
                        type="submit"
                        disabled={status === "submitting"}
                        whileHover={status === "submitting" ? {} : { y: -1 }}
                        whileTap={status === "submitting" ? {} : { scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 100, damping: 17 }}
                        className="inline-flex shrink-0 items-center justify-center gap-2 bg-ink px-7 py-3.5 text-sm font-medium text-obsidian transition-colors hover:bg-accent-cyan disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {status === "submitting" ? "Sending…" : "Send inquiry"}
                        {status !== "submitting" && (
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        )}
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
