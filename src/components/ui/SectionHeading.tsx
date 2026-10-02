import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  /** Cyan for most sections; ember marks the single focal section. */
  tone?: "cyan" | "ember";
  /** Aligns the heading block left or centres it for a change of rhythm. */
  align?: "left" | "center";
}

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  tone = "cyan",
  align = "left",
}: SectionHeadingProps) {
  const accent = tone === "ember" ? "text-accent-ember" : "text-accent-cyan";

  if (align === "center") {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <p className={`eyebrow ${accent}`}>
            {index}
            <span className="mx-2 text-muted/50">/</span>
            <span className="text-muted">{eyebrow}</span>
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 text-balance font-display text-3xl font-medium tracking-[-0.015em] text-ink sm:text-[2.6rem] sm:leading-[1.08]">
            {title}
          </h2>
          {description ? (
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted">
              {description}
            </p>
          ) : null}
        </Reveal>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-[200px_1fr] md:gap-12">
      <Reveal>
        <div>
          <p className={`eyebrow ${accent}`}>
            {index}
            <span className="mx-2 text-muted/50">/</span>
            <span className="text-muted">{eyebrow}</span>
          </p>
          {/* short accent rule, wipes in on reveal */}
          <span
            aria-hidden="true"
            className={`mt-4 block h-px w-12 origin-left bg-gradient-to-r ${
              tone === "ember"
                ? "from-accent-ember/70 to-transparent"
                : "from-accent-cyan/70 to-transparent"
            } motion-safe:animate-sweep`}
          />
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="max-w-2xl text-balance font-display text-3xl font-medium tracking-[-0.015em] text-ink sm:text-[2.6rem] sm:leading-[1.08]">
          {title}
        </h2>
        {description ? (
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted">
            {description}
          </p>
        ) : null}
      </Reveal>
    </div>
  );
}