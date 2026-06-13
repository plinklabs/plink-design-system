/* Plink Labs marketing — footer. Mono microcopy, hairline rules, the mark. */

function Footer() {
  const { Logo } = window.PlinkLabsDesignSystem_59a0ef;
  const cols = [
    { h: 'Products', items: ['Metronome', 'Tuner', 'Timer', 'Noise Meter', 'Picker', 'Sampler'] },
    { h: 'Project', items: ['Mission', 'Roadmap', 'Changelog', 'Contribute'] },
    { h: 'Source', items: ['GitHub', 'Licence — GPL-3.0', 'Issues', 'Mirror'] },
  ];
  return (
    <footer className="mk-footer" id="source">
      <div className="mk-footer__top">
        <div className="mk-footer__brand">
          <Logo size={24} />
          <p className="mk-footer__note">A sound lab for the classroom. Made by teachers, free for everyone.</p>
        </div>
        <div className="mk-footer__cols">
          {cols.map((c) => (
            <div className="mk-footer__col" key={c.h}>
              <div className="mk-footer__h">{c.h}</div>
              <ul>{c.items.map((it) => <li key={it}><a href="#">{it}</a></li>)}</ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mk-footer__bar">
        <span>// plink labs — no ads, no tracking, no accounts</span>
        <span>GPL-3.0 · {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}

window.Footer = Footer;
