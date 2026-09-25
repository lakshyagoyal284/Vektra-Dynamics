import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { FOUNDER, ABOUT_VALUES } from "@/lib/data";

export const metadata: Metadata = {
  title: "About — Vektra Dynamics",
  description:
    "Vektra Dynamics is a remote-first technology studio. Meet the founder and the principles behind the work.",
};

export default function AboutPage() {
  return (
    <div className="pt-36 pb-24 sm:pt-44 sm:pb-32">
      {/* ambient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px]" aria-hidden="true">
        <div className="absolute left-1/2 top-[-160px] h-[360px] w-[760px] -translate-x-1/2 rounded-full bg-accent-indigo/[0.07] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* heading block */}
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent-cyan">
            About<span className="mx-2 text-muted/60">/</span>
            <span className="text-muted">The studio</span>
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.06] tracking-tight sm:text-6xl">
            A small studio, built for the long run.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Vektra Dynamics is a remote-first technology studio. We design and
            build web platforms, custom software, and the groundwork for AI
            systems — for teams that want engineering they can trust.
          </p>
        </Reveal>

        {/* founder + values */}
        <div className="mt-16 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          {/* founder card */}
          <Reveal>
            <section
              aria-label="Founder"
              className="relative flex h-full flex-col border border-line bg-surface/40 shadow-card"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/70 to-transparent"
              />

              {/* photo — 3:4 portrait frame, centered, no distortion */}
              <div className="w-full border-b border-line bg-obsidian px-6 py-6">
                <div className="relative mx-auto aspect-[3/4] w-full max-w-[320px] overflow-hidden border border-line/70">
                  {FOUNDER.photo ? (
                    <Image
                      src={FOUNDER.photo}
                      alt={`${FOUNDER.name}, ${FOUNDER.role} of Vektra Dynamics`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 90vw, 340px"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
                      <span className="flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-muted/40 font-display text-2xl text-muted">
                        ?
                      </span>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted/70">
                        Founder photo goes here
                      </p>
                      <p className="max-w-[260px] text-[13px] leading-relaxed text-muted/50">
                        Drop your photo at <code className="text-accent-cyan">public/founder.png</code>{" "}
                        — it will appear here automatically.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 p-7">
                <h2 className="font-display text-2xl font-medium tracking-tight text-ink">
                  {FOUNDER.name}
                </h2>
                <p className="mt-1 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-cyan">
                  {FOUNDER.role}
                </p>                    <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-muted">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {FOUNDER.location}
                </p>
                <div className="mt-5 space-y-4 border-t border-line/80 pt-5">
                  {FOUNDER.bio.map((para) => (
                    <p key={para.slice(0, 24)} className="text-sm leading-relaxed text-muted">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </section>
          </Reveal>

          {/* values */}
          <Reveal delay={0.1}>
            <section aria-label="What we value" className="flex h-full flex-col gap-5">
              {ABOUT_VALUES.map((v) => (
                <div
                  key={v.title}
                  className="group relative flex-1 border border-line bg-surface/40 p-6 transition-colors duration-300 hover:border-accent-cyan/40"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <h3 className="font-display text-lg font-medium tracking-tight text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.detail}</p>
                </div>
              ))}
            </section>
          </Reveal>
        </div>

        {/* stats row */}
        <Reveal className="mt-14">
          <dl className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
            {[
              ["Remote studio", "Team"],
              ["2026", "Founded"],
              ["10", "Projects shipped"],
            ].map(([value, label]) => (
              <div key={label} className="bg-obsidian px-6 py-5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  {label}
                </dt>
                <dd className="mt-1.5 font-display text-lg font-medium text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* CTA */}
        <Reveal className="mt-14">
          <div className="relative border border-line bg-surface/40 p-8 text-center shadow-card sm:p-12">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/70 to-transparent"
            />
            <h2 className="font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              Have something to build?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
              Tell us about it — a senior engineer reads every inquiry and
              replies within one business day.
            </p>
            <Link
              href="/#contact"
              className="mt-7 inline-flex items-center gap-2 bg-ink px-6 py-3 text-sm font-medium text-obsidian transition-colors hover:bg-accent-cyan"
            >
              Start a project
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
