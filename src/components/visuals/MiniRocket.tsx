"use client";

import { motion, useReducedMotion } from "framer-motion";

interface MiniRocketProps {
  className?: string;
}

export default function MiniRocket({ className }: MiniRocketProps) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={`relative inline-block ${className ?? ""}`}
      animate={reduce ? {} : { y: [0, -2, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* exhaust particles trailing down-left */}
      {!reduce &&
        [0, 1, 2].map((i) => (
          <span
            key={i}
            className="rocket-particle absolute bottom-0 left-0 h-[3px] w-[3px] rounded-full bg-accent-cyan"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}

      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="relative h-4 w-4 rotate-45 text-ink"
      >
        {/* body */}
        <path
          d="M12 2.5c2.9 2.1 4.4 5.4 4.4 8.9l-2.1 2.1H9.7l-2.1-2.1c0-3.5 1.5-6.8 4.4-8.9z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* window */}
        <circle cx="12" cy="9.3" r="1.5" stroke="currentColor" strokeWidth="1.4" />
        {/* fins */}
        <path
          d="M9.7 13.5 8 16.2l2.4-.6M14.3 13.5l1.7 2.7-2.4-.6"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* flame */}
        <path className="rocket-flame" d="M10.9 17.8h2.2L12 21.2z" fill="#7DD3C0" />
      </svg>
    </motion.span>
  );
}
