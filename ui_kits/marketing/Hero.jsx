/* Plink Labs marketing — hero. Asymmetric editorial grid, oversized flush-left headline,
   faint open-ring watermark, one magenta word + ping, scope rule, spec strip. */

function Hero() {
  const { Eyebrow, Button, ScopeRule, SpecStrip } = window.PlinkLabsDesignSystem_59a0ef;
  return (
    <header className="mk-hero">
      <img className="mk-hero__watermark" src="../../assets/plink-mark.svg" alt="" aria-hidden="true" />
      <Eyebrow>Open source — free for every classroom</Eyebrow>
      <h1 className="mk-hero__h1">
        Good <span className="mk-spark">software</span> for the&nbsp;classroom
        <span className="mk-hero__ping" aria-hidden="true">
          <svg viewBox="0 0 120 120" width="0.42em" height="0.42em">
            <path d="M36 86.8 A36 36 0 1 1 84 86.8" fill="none" stroke="#DB2777" strokeWidth="11" strokeLinecap="round" />
            <circle cx="60" cy="60" r="15" fill="#DB2777" />
          </svg>
        </span>
      </h1>
      <p className="mk-hero__lede">
        Made by teachers, free for everyone. Open source, no ads, no tracking —
        just tools that help students learn and teachers teach.
      </p>
      <div className="mk-hero__actions">
        <Button variant="primary">Browse the products →</Button>
        <Button variant="ghost"><span style={{ color: 'var(--magenta)' }}>★</span> Star on GitHub</Button>
      </div>
      <div className="mk-hero__scope"><ScopeRule position={0.36} /></div>
      <SpecStrip items={["GPL-3.0", "GDPR-clean", "Works offline", "16px → projector"]} />
    </header>
  );
}

window.Hero = Hero;
