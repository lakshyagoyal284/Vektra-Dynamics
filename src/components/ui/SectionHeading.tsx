import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
}

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="grid gap-6 border-t border-line pt-8 md:grid-cols-[240px_1fr] md:gap-12">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent-cyan">
          {index}
          <span className="mx-2 text-muted/60">/</span>
          <span className="text-muted">{eyebrow}</span>
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="max-w-2xl font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted">
            {description}
          </p>
        ) : null}
      </Reveal>
    </div>
  );
}
