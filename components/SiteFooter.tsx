"use client";

const FOOTER_NAV: { label: string; links: { href: string; label: string }[] }[] = [
  {
    label: "Lab",
    links: [
      { href: "#lab", label: "Interactive lab" },
      { href: "#audio", label: "Audio circuit" },
      { href: "#concepts", label: "Concepts" },
      { href: "#glossary", label: "Glossary" },
    ],
  },
  {
    label: "Reference",
    links: [
      { href: "#concepts", label: "Ohm's law" },
      { href: "#concepts", label: "Power" },
      { href: "#concepts", label: "Signal flow" },
      { href: "#glossary", label: "Component library" },
    ],
  },
  {
    label: "Project",
    links: [
      { href: "https://github.com/sami5436/Ohmify", label: "Source" },
      { href: "#", label: "Changelog" },
      { href: "#", label: "Roadmap" },
      { href: "#", label: "Issues" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-line-subtle bg-bg-base overflow-hidden">
      {/* Background trace */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18] pointer-events-none"
        viewBox="0 0 1200 360"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <pattern id="footer-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#243043" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="1200" height="360" fill="url(#footer-grid)" />
        {/* Long trace */}
        <path
          d="M -40 80 H 380 L 420 120 H 1240"
          stroke="#3DF5D2"
          strokeOpacity="0.5"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M -40 80 H 380 L 420 120 H 1240"
          stroke="#3DF5D2"
          strokeWidth="0.7"
          strokeDasharray="2 9"
          fill="none"
          className="animate-flow"
        />
      </svg>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-md border border-line-muted bg-bg-elevated">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M2 12 H6 L8 7 L11 17 L14 7 L16 17 L18 12 H22"
                    stroke="#3DF5D2"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="font-mono text-sm tracking-tight text-ink-primary">
                ohmify<span className="text-signal">.</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-ink-secondary">
              An interactive lab for understanding how electricity moves.
              Built for tinkerers, students, and the formerly intimidated.
            </p>

            {/* Mini status panel */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-md border border-line-subtle bg-bg-surface/70 px-3 py-1.5 font-mono text-[11px] text-ink-secondary">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-signal animate-ping opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
              </span>
              circuit · live · 60fps
            </div>
          </div>

          {FOOTER_NAV.map((group) => (
            <nav key={group.label} aria-label={group.label}>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-3">
                {group.label}
              </p>
              <ul className="space-y-2">
                {group.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[13px] text-ink-secondary hover:text-ink-primary transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-5 border-t border-line-subtle flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 font-mono text-[11px] tabular text-ink-muted">
          <p>© {new Date().getFullYear()} ohmify · all rights reserved</p>
          <div className="flex items-center gap-4">
            <span>v 0.1.0</span>
            <span className="hidden sm:inline">build · static</span>
            <span className="text-signal">V = I · R</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
