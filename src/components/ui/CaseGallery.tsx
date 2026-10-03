"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface CaseGalleryProps {
  /** Full paths under /public, in display order. */
  images: readonly string[];
  title: string;
  client: string;
  summary: string;
  onClose: () => void;
}

/**
 * Full-screen viewer for a case study's screenshots.
 *
 * The card thumbnail is the first entry, so opening lands on the image the
 * visitor just clicked rather than jumping to a different frame. Wraps in
 * both directions — these are short decks and a dead end at the last frame
 * feels broken.
 *
 * Portalled to <body>: the case study grid uses framer-motion's `layout`,
 * which leaves a transform on the wrapper. A transformed ancestor becomes
 * the containing block for `position: fixed`, which would trap the overlay
 * inside the scrolling grid instead of pinning it to the viewport.
 */
export default function CaseGallery({
  images,
  title,
  client,
  summary,
  onClose,
}: CaseGalleryProps) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  const count = images.length;

  const step = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count],
  );

  // Arrow keys page through, Escape closes. Bound on the dialog rather than
  // the window so it only listens while the viewer is actually mounted.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, step]);

  // Lock the page behind the overlay, restoring whatever overflow the visitor
  // arrived with rather than assuming it was the default.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Move focus into the dialog so Escape and the arrows are reachable without
  // a click, and so screen readers announce the viewer rather than the card.
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  if (count === 0) return null;

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — screenshot viewer`}
      className="fixed inset-0 z-50 flex flex-col bg-obsidian/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.2 }}
    >
      {/* header */}
      <div className="flex shrink-0 items-start justify-between gap-6 border-b border-line px-5 py-4 sm:px-8">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            {client}
          </p>
          <h2 className="mt-1 truncate font-display text-lg font-medium tracking-tight text-ink sm:text-xl">
            {title}
          </h2>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close viewer"
          className="flex h-10 w-10 shrink-0 items-center justify-center border border-line text-muted transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* stage */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-6 sm:px-16">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous screenshot"
          className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center border border-line bg-surface-mid/80 text-muted backdrop-blur transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan sm:left-4"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="relative flex h-full max-h-full w-full max-w-5xl items-center justify-center">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={images[index]}
              className="relative flex h-full max-h-full w-full items-center justify-center"
              initial={reduce ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
              transition={{ duration: reduce ? 0 : 0.22, ease: "easeOut" }}
            >
              <Image
                src={images[index]}
                alt={`${title} — screenshot ${index + 1} of ${count}`}
                // The screenshots have mixed aspect ratios, so contain keeps
                // each frame whole instead of cropping into them.
                width={1920}
                height={1080}
                // These are UI screenshots — flat fills and small type — which
                // is the worst case for the optimizer's default lossy WebP at
                // quality 75. Small text turns to mush. Raise it; the extra
                // bytes buy legibility, and a screenshot that can't be read
                // is not worth optimising.
                quality={92}
                // Mirrors the stage's real box: px-4 gutter under 640px,
                // px-16 (4rem) either side above it, capped at max-w-5xl
                // (1024px) once the viewport passes ~1152px. The old value
                // overstated this and made the browser ask for widths the
                // source files do not contain, upscaling them.
                sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1152px) calc(100vw - 8rem), 1024px"
                priority={index === 0}
                className="max-h-full max-w-full object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next screenshot"
          className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center border border-line bg-surface-mid/80 text-muted backdrop-blur transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan sm:right-4"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* footer — description, counter, filmstrip */}
      <div className="shrink-0 border-t border-line px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-muted">
            {summary}
          </p>
          <p
            className="shrink-0 font-mono text-[11px] tracking-[0.18em] text-muted/70"
            aria-live="polite"
          >
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </p>
        </div>

        <ul className="mx-auto mt-4 flex max-w-5xl justify-center gap-2">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show screenshot ${i + 1}`}
                aria-current={i === index}
                className={`block h-10 w-16 overflow-hidden border transition-colors ${
                  i === index
                    ? "border-accent-cyan/70"
                    : "border-line opacity-50 hover:opacity-90"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>,
    document.body,
  );
}
