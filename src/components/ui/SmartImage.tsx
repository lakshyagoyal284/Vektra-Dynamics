"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface SmartImageProps {
  /** Path under /public, e.g. "/work/helios.webp" */
  src: string;
  alt: string;
  className?: string;
  /** Tailwind sizes attribute for next/image */
  sizes?: string;
  priority?: boolean;
  /** Shown in the placeholder when the file is missing */
  label?: string;
}

type Status = "checking" | "ready" | "missing";

/**
 * Image that keeps its layout box when the asset is absent.
 *
 * The site ships with placeholder slots: drop the file at the given path under
 * /public and it appears with no code change. Until then a labelled slot shows
 * so the layout is honest about what is missing rather than collapsing.
 *
 * Existence is probed with a plain <img> before next/image is used. next/image
 * throws inside its optimizer when the source file is missing, and onError does
 * not catch it — the request never becomes an <img> event. Probing first keeps
 * absent slots from filling the console with optimizer errors.
 */
export default function SmartImage({
  src,
  alt,
  className,
  sizes = "100vw",
  priority = false,
  label,
}: SmartImageProps) {
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    let cancelled = false;
    setStatus("checking");

    // GlobalThis.Image is the DOM constructor — distinct from the next/image
    // component imported above.
    const probe = new window.Image();
    probe.onload = () => !cancelled && setStatus("ready");
    probe.onerror = () => !cancelled && setStatus("missing");
    probe.src = src;

    return () => {
      cancelled = true;
      probe.onload = null;
      probe.onerror = null;
    };
  }, [src]);

  if (status !== "ready") {
    return (
      <div
        // h-full/w-full keeps the placeholder the same size as the real image,
        // otherwise it collapses to the label's own height.
        className={`img-slot flex h-full w-full items-center justify-center p-6 ${
          className ?? ""
        }`}
        role="img"
        aria-label={status === "missing" ? alt : ""}
        aria-hidden={status === "checking" ? true : undefined}
      >
        {status === "missing" && (
          <span className="eyebrow relative z-10 text-center leading-relaxed text-muted/45">
            {label ?? alt}
          </span>
        )}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`img-slot object-cover ${className ?? ""}`}
    />
  );
}