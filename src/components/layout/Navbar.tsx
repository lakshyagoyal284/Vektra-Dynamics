"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "./navLinks";
import logo from "@/assets/logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [onHome, setOnHome] = useState(true);

  useEffect(() => {
    setOnHome(window.location.pathname === "/" || window.location.pathname === "");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-obsidian/90 backdrop-blur"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a href="/#main" className="flex items-center" aria-label="Vektra Dynamics home">
          <Image
            src={logo}
            alt="Vektra Dynamics"
            className="h-9 w-auto"
            priority
          />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href.startsWith("/#") && onHome ? link.href.slice(1) : link.href}
                className="link-underline text-sm text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={onHome ? "#contact" : "/#contact"}
            className="hidden border border-ink/20 bg-ink px-4 py-2 text-sm font-medium text-obsidian transition-colors hover:border-accent-cyan hover:bg-accent-cyan md:inline-flex"
          >
            Start a project
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded border border-line text-ink md:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
            <span className="sr-only">{open ? "Close" : "Menu"}</span>
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 22 }}
              className="absolute inset-x-0 top-16 overflow-hidden border-b border-line bg-obsidian/95 backdrop-blur md:hidden"
            >
              <ul className="px-5 py-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block border-b border-line/60 py-3.5 text-sm text-muted last:border-0"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="pt-2">
                  <a
                    href={onHome ? "#contact" : "/#contact"}
                    onClick={() => setOpen(false)}
                    className="block border border-ink/20 bg-ink px-4 py-2.5 text-center text-sm font-medium text-obsidian"
                  >
                    Start a project
                  </a>
                </li>
              </ul>
              </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
