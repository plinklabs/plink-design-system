/* Plink Labs marketing — the one full-bleed INK section. Mission statement + ping divider. */

function Mission() {
  const { Eyebrow, SpecStrip, Button } = window.PlinkLabsDesignSystem_59a0ef;
  return (
    <section className="mk-mission" id="mission">
      <div className="mk-wrap">
        <Eyebrow onInk>03 / Mission</Eyebrow>
        <p className="mk-mission__statement">
          Software for school should be <span className="mk-spark-dark">quiet, honest, and free</span>.
          No ads in front of a child. No data sold. No login to use a metronome.
        </p>
        <div className="mk-mission__cols">
          <div className="mk-mission__col">
            <span className="mk-mono-num">01</span>
            <p>Built by teachers, in classrooms, against real lesson plans — not a growth funnel.</p>
          </div>
          <div className="mk-mission__col">
            <span className="mk-mono-num">02</span>
            <p>Every tool is GPL-3.0. Fork it, host it, remix it for your own school. The code is yours.</p>
          </div>
          <div className="mk-mission__col">
            <span className="mk-mono-num">03</span>
            <p>Works offline and on a decade-old projector. Accessibility and legibility come first.</p>
          </div>
        </div>
        <div className="mk-mission__foot">
          <Button variant="primary">Read the manifesto →</Button>
          <SpecStrip onInk items={["No ads", "No tracking", "No accounts", "Forever free"]} />
        </div>
      </div>
    </section>
  );
}

window.Mission = Mission;
