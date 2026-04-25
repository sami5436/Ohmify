export default function Home() {
  return (
    <div className="relative">
      <section className="relative min-h-[60vh] flex items-center justify-center bg-engineering-grid overflow-hidden">
        <div className="text-center px-6">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-signal mb-3">
            ohmify // scaffold
          </p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ink-primary">
            Interactive circuit lab.
          </h1>
          <p className="mt-3 text-ink-secondary max-w-md mx-auto">
            App scaffold ready. Hero, lab, concepts, audio, and glossary land in subsequent feature branches.
          </p>
        </div>
      </section>
    </div>
  );
}
