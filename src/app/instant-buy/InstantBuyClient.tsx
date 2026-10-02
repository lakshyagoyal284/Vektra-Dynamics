"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2, Package, ShieldCheck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { PACKAGES } from "@/lib/data";

interface FormState {
  name: string;
  email: string;
  timeline: string;
  notes: string;
}

const INITIAL: FormState = { name: "", email: "", timeline: "", notes: "" };

const TIMELINE_OPTIONS = [
  { id: "express", label: "As soon as possible" },
  { id: "standard", label: "Within a month" },
  { id: "flexible", label: "Flexible — planning ahead" },
] as const;

const inputBase =
  "w-full border border-line bg-obsidian/60 px-4 py-3 text-sm text-ink placeholder:text-muted/50 outline-none transition-colors focus:border-accent-cyan/60 focus:bg-obsidian/80";

/** ₹85,000 → ₹85,000 */
const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function validate(form: FormState, hasPackage: boolean): Partial<Record<keyof FormState | "package", string>> {
  const errors: Partial<Record<keyof FormState | "package", string>> = {};
  if (!hasPackage) errors.package = "Pick a package to continue.";
  if (!form.name.trim()) errors.name = "Please add your name.";
  if (!form.email.trim()) {
    errors.email = "Please add your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) {
    errors.email = "That email doesn't look right.";
  }
  return errors;
}

export default function InstantBuyClient() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [ref, setRef] = useState<string | null>(null);

  const selected = useMemo(
    () => PACKAGES.find((p) => p.id === selectedId) ?? null,
    [selectedId]
  );

  const errors = validate(form, Boolean(selected));
  const showError = (field: keyof FormState) => Boolean(touched[field] && errors[field]);
  const validField = (field: keyof FormState) => Boolean(touched[field] && !errors[field]);

  const set =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const blur = (field: keyof FormState) => () =>
    setTouched((t) => ({ ...t, [field]: true }));

  const choose = (id: string) => {
    setSelectedId(id);
    setStatus("idle");
    setServerError(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true });
    if (Object.keys(errors).length > 0) return;
    if (!selected) return;
    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: selected.id,
          name: form.name,
          email: form.email,
          timeline: form.timeline,
          notes: form.notes,
        }),
      });
      const data = (await res.json()) as { ok: boolean; ref?: string; error?: string };
      if (!res.ok || !data.ok) {
        setServerError(data.error ?? "Something went wrong. Please email us directly.");
        setStatus("error");
        return;
      }
      setRef(data.ref ?? null);
      setStatus("success");
    } catch {
      setServerError("Network problem — please check your connection and try again.");
      setStatus("error");
    }
  };

  const fieldBorder = (field: keyof FormState) =>
    showError(field) ? "!border-red-400/70" : validField(field) ? "!border-accent-cyan/60" : "";

  return (
    <>
      {/* packages */}
      <Reveal className="mt-14">
        <ul className="grid gap-5 md:grid-cols-2">
          {PACKAGES.map((pkg) => {
            const isSelected = selectedId === pkg.id;
            return (
              <li key={pkg.id}>
                <button
                  type="button"
                  onClick={() => choose(pkg.id)}
                  aria-pressed={isSelected}
                  className={`group relative flex h-full w-full flex-col border bg-surface/40 p-7 text-left transition-colors duration-300 ${
                    isSelected
                      ? "border-accent-cyan/70 shadow-card"
                      : "border-line hover:border-accent-cyan/40"
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute right-5 top-5 bg-accent-cyan px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-obsidian">
                      Popular
                    </span>
                  )}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/70 to-transparent ${
                      isSelected ? "opacity-100" : "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    }`}
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-medium tracking-tight text-ink">
                        {pkg.name}
                      </h3>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                        {pkg.tagline}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className={`flex h-6 w-6 shrink-0 items-center justify-center border ${
                        isSelected
                          ? "border-accent-cyan bg-accent-cyan text-obsidian"
                          : "border-line text-transparent"
                      }`}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  </div>

                  <p className="mt-5 flex items-baseline gap-1.5">
                    <span className="font-display text-3xl font-medium tracking-tight text-ink">
                      {pkg.priceLabel}
                    </span>
                    <span className="text-xs text-muted">from</span>
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-accent-cyan">{pkg.timeline}</p>

                  <p className="mt-4 text-sm leading-relaxed text-muted">{pkg.summary}</p>

                  <ul className="mt-5 space-y-2.5 border-t border-line/80 pt-5">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[13px] text-muted">
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-cyan"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </button>
              </li>
            );
          })}
        </ul>
      </Reveal>

      {/* order form */}
      <Reveal className="mt-8">
        <div className="relative border border-line bg-surface/40 p-7 shadow-card sm:p-10">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/70 to-transparent"
          />

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="flex min-h-[420px] flex-col items-start justify-center"
                role="status"
              >
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-cyan">
                  <Package className="h-4 w-4" aria-hidden="true" />
                  Order received
                </p>
                <h2 className="mt-5 font-display text-3xl font-medium tracking-tight text-ink">
                  Your order is in.
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
                  {selected
                    ? `${selected.name} (${selected.priceLabel}) is reserved. `
                    : ""}
                  A senior engineer will email you within one business day to confirm
                  scope and issue the invoice. Nothing has been charged yet.
                </p>
                {ref && (
                  <p className="mt-7 font-mono text-[11px] text-muted/70">
                    ref: {ref.toLowerCase()}
                  </p>
                )}
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
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h2 className="font-display text-2xl font-medium tracking-tight text-ink">
                    Complete your order
                  </h2>
                  {selected ? (
                    <p className="flex items-baseline gap-2">
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                        {selected.name}
                      </span>
                      <span className="font-display text-lg text-ink">
                        {formatPrice(selected.priceFrom)}
                      </span>
                    </p>
                  ) : (
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted/70">
                      No package selected
                    </p>
                  )}
                </div>

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

                <div>
                  <label
                    htmlFor="timeline"
                    className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
                  >
                    When do you want to start?
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={form.timeline}
                    onChange={set("timeline")}
                    onBlur={blur("timeline")}
                    className={`${inputBase} cursor-pointer`}
                  >
                    <option value="" disabled>
                      Select…
                    </option>
                    {TIMELINE_OPTIONS.map((t) => (
                      <option key={t.id} value={t.label}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="notes"
                    className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
                  >
                    Anything we should know? <span className="normal-case text-muted/60">(optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={form.notes}
                    onChange={set("notes")}
                    onBlur={blur("notes")}
                    placeholder="Existing site to migrate, pages you need, deadline…"
                    className={`${inputBase} resize-none`}
                  />
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
                  <p className="flex max-w-xs items-start gap-2 text-[13px] leading-relaxed text-muted/70">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    No payment is taken now — we confirm scope first, then invoice.
                  </p>
                  <motion.button
                    type="submit"
                    disabled={status === "submitting"}
                    whileHover={status === "submitting" ? {} : { y: -1 }}
                    whileTap={status === "submitting" ? {} : { scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 100, damping: 17 }}
                    className="inline-flex shrink-0 items-center justify-center gap-2 bg-ink px-7 py-3.5 text-sm font-medium text-obsidian transition-colors hover:bg-accent-cyan disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "submitting" ? (
                      <>
                        Placing order…
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      </>
                    ) : (
                      <>
                        Place order
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </>
  );
}