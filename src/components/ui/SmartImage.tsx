"use client";

import { useState } from "react";
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

/**
 * Image that keeps its layout box when the asset is absent.
 *
 * The site ships with placeholder slots: drop the file at the given path under
 * /public and it appears with no code change. Until then a labelled slot shows
 * so the layout is honest about what is missing rather than collapsing.
 */
export default function SmartImage({
  src,
  alt,
  className,
  sizes = "100vw",
  priority = false,
  label,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        // h-full/w-full keeps the placeholder the same size as the real image,
        // otherwise it collapses to the label's own height.
        className={`img-slot flex h-full w-full items-center justify-center p-6 ${
          className ?? ""
        }`}
        role="img"
        aria-label={alt}
      >
        <span className="eyebrow relative z-10 text-center leading-relaxed text-muted/45">
          {label ?? alt}
        </span>
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
      onError={() => setFailed(true)}
      className={`img-slot object-cover ${className ?? ""}`}
    />
  );
}