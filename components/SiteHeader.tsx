"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV = [
  { href: "#lab", label: "Lab" },
  { href: "#concepts", label: "Concepts" },
  { href: "#audio", label: "Audio" },
  { href: "#glossary", label: "Glossary" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "bg-bg-base/80 backdrop-blur-md border-b border-line-subtle"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Ohmify home"
        >
          <LogoMark />
          <span className="font-mono text-sm tracking-tight text-ink-primary">
            ohmify
            <span className="text-signal">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="px-3 py-1.5 text-[13px] font-medium text-ink-secondary hover:text-ink-primary transition-colors rounded-md hover:bg-bg-elevated/60"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#lab"
            className="ml-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-bg-base bg-signal hover:bg-signal-glow transition-colors rounded-md shadow-signal-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-bg-base animate-pulse-slow" />
            Open lab
          </a>
        </nav>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border border-line-subtle text-ink-secondary"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            {open ? (
              <path
                d="M3 3l10 10M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M2 4h12M2 8h12M2 12h12"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-line-subtle bg-bg-surface/95 backdrop-blur">
          <nav className="px-5 py-3 flex flex-col">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="py-2 text-sm text-ink-secondary hover:text-ink-primary"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </a>
            ))}
            <a
              href="#lab"
              className="mt-2 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-bg-base bg-signal rounded-md"
              onClick={() => setOpen(false)}
            >
              Open lab
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function LogoMark() {
  return (
    <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-md border border-line-muted bg-bg-elevated overflow-hidden">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        {/* Stylized resistor + wave */}
        <path
          d="M2 12 H6 L8 7 L11 17 L14 7 L16 17 L18 12 H22"
          stroke="#3DF5D2"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-signal/10" />
    </span>
  );
}
