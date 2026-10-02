import Image from "next/image";
import { FOOTER_LINKS, FOOTER_TECH_SPECS } from "@/lib/data";
import logo from "@/assets/logo.png";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="band-deep border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* brand */}
          <div>
            <Image
              src={logo}
              alt="Vektra Dynamics"
              className="h-8 w-auto"
            />
            <p className="mt-4 max-w-xs font-display text-lg leading-snug tracking-tight text-ink/90">
              Engineered digital systems. Built for scale.
            </p>
            <a
              href="/instant-buy"
              className="mt-6 inline-flex items-center gap-2 border border-line px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
            >
              Instant Buy Order
            </a>
            <p className="mt-6 inline-flex items-center gap-2 text-[13px] text-muted">
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                aria-hidden="true"
              />
              All systems operational
            </p>
          </div>

          {/* quick links */}
          <nav aria-label="Footer">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              Index
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* tech specs */}
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              Colophon
            </h3>
            <dl className="mt-4 space-y-2.5 font-mono text-[11px]">
              {FOOTER_TECH_SPECS.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-4">
                  <dt className="text-muted">{spec.label}</dt>
                  <dd className="text-ink/75">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* status */}
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              Status
            </h3>
            <ul className="mt-4 space-y-2.5">
              {["Edge network", "API gateway", "AI pipelines"].map((name) => (
                <li
                  key={name}
                  className="flex items-center justify-between gap-4 border-b border-line/70 pb-2.5 text-[13px] last:border-0"
                >
                  <span className="text-muted">{name}</span>
                  <span className="flex items-center gap-1.5 text-emerald-400/90">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" aria-hidden="true" />
                    operational
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] text-muted">
            © {year} Vektra Dynamics. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted/50">
            Built in-house · No template
          </p>
        </div>
      </div>
    </footer>
  );
}
