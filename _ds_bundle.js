/* @ds-bundle: {"format":3,"namespace":"PlinkLabsDesignSystem_59a0ef","components":[{"name":"Eyebrow","sourcePath":"components/brand/Eyebrow.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Ping","sourcePath":"components/brand/Ping.jsx"},{"name":"PingDivider","sourcePath":"components/brand/PingDivider.jsx"},{"name":"ScopeRule","sourcePath":"components/brand/ScopeRule.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"SpecStrip","sourcePath":"components/core/SpecStrip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/brand/Eyebrow.jsx":"de3ab53f3311","components/brand/Logo.jsx":"ffc082d5842d","components/brand/Ping.jsx":"6bef9470820b","components/brand/PingDivider.jsx":"89f8bca2a169","components/brand/ScopeRule.jsx":"54978ebc7205","components/core/Badge.jsx":"af13c407456a","components/core/Button.jsx":"fbf9ddc0e9c7","components/core/Card.jsx":"e37c0eb543a5","components/core/SpecStrip.jsx":"88adb460a5e6","components/forms/Checkbox.jsx":"0b62d9881de7","components/forms/Input.jsx":"1179070e2685","components/forms/Switch.jsx":"652404d53f99","components/navigation/Tabs.jsx":"b55aa78a18f0","ui_kits/marketing/Footer.jsx":"1d6ec8bc5e31","ui_kits/marketing/Hero.jsx":"58937f8a498d","ui_kits/marketing/Mission.jsx":"4846fe4b5448","ui_kits/marketing/Nav.jsx":"165ced54fcaa","ui_kits/marketing/Products.jsx":"a85c23ef51b3"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PlinkLabsDesignSystem_59a0ef = window.PlinkLabsDesignSystem_59a0ef || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Eyebrow.jsx
try { (() => {
/* Plink Labs — Eyebrow
   Mono uppercase kicker with a magenta ping dot. Sits above oversized flush-left headlines. */

if (typeof document !== 'undefined' && !document.getElementById('pl-eyebrow-css')) {
  const s = document.createElement('style');
  s.id = 'pl-eyebrow-css';
  s.textContent = `
  .pl-eyebrow{
    display: inline-flex; align-items: center; gap: 0.65rem;
    font-family: var(--font-mono); font-size: var(--label);
    letter-spacing: var(--label-tracking); text-transform: uppercase;
    color: var(--ink); margin: 0;
  }
  .pl-eyebrow__dot{ width: 9px; height: 9px; border-radius: 50%; background: var(--magenta); flex: none; }
  .pl-eyebrow--on-ink{ color: var(--on-ink); }
  .pl-eyebrow--on-ink .pl-eyebrow__dot{ background: var(--magenta-on-dark); }
  `;
  document.head.appendChild(s);
}
function Eyebrow({
  onInk = false,
  children,
  className = '',
  ...props
}) {
  const classes = ['pl-eyebrow', onInk ? 'pl-eyebrow--on-ink' : '', className].filter(Boolean).join(' ');
  return React.createElement('p', {
    className: classes,
    ...props
  }, React.createElement('span', {
    className: 'pl-eyebrow__dot',
    key: 'd'
  }), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
/* Plink Labs — Logo
   The open-ring mark + "plink labs" wordmark. mark | full lockup. light | dark. */

function Logo({
  variant = 'full',
  theme = 'light',
  size = 24,
  className = '',
  ...props
}) {
  const stroke = theme === 'dark' ? '#EC4899' : '#DB2777';
  const wordInk = theme === 'dark' ? '#FAF7F2' : '#1B1B23';
  const wordMuted = theme === 'dark' ? '#8E8A82' : '#9A958B';
  const mark = React.createElement('svg', {
    viewBox: '0 0 120 120',
    width: size,
    height: size,
    'aria-hidden': true,
    style: {
      display: 'block',
      flex: 'none'
    }
  }, React.createElement('path', {
    d: 'M36 86.8 A36 36 0 1 1 84 86.8',
    fill: 'none',
    stroke,
    strokeWidth: 9,
    strokeLinecap: 'round',
    key: 'a'
  }), React.createElement('circle', {
    cx: 60,
    cy: 60,
    r: 13,
    fill: stroke,
    key: 'c'
  }));
  if (variant === 'mark') {
    return React.createElement('span', {
      className: ['pl-logo', className].filter(Boolean).join(' '),
      ...props
    }, mark);
  }
  return React.createElement('span', {
    className: ['pl-logo', className].filter(Boolean).join(' '),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.46em'
    },
    ...props
  }, mark, React.createElement('span', {
    key: 'w',
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: size * 0.92,
      letterSpacing: '-0.02em',
      color: wordInk,
      lineHeight: 1
    }
  }, 'plink', React.createElement('span', {
    style: {
      color: wordMuted,
      fontWeight: 400
    },
    key: 'l'
  }, ' labs')));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/brand/Ping.jsx
try { (() => {
/* Plink Labs — Ping
   The signature concentric-ring pulse. Loading + success states, bullets, accents.
   Rings radiate on the ping easing; respects prefers-reduced-motion. */

if (typeof document !== 'undefined' && !document.getElementById('pl-ping-css')) {
  const s = document.createElement('style');
  s.id = 'pl-ping-css';
  s.textContent = `
  .pl-ping{ display: inline-grid; place-items: center; position: relative; line-height: 0; }
  .pl-ping__ring{
    position: absolute; inset: 0; margin: auto;
    border-radius: 50%; border: 2px solid var(--magenta);
    transform-origin: center;
  }
  .pl-ping__core{ border-radius: 50%; background: var(--magenta); }
  .pl-ping--on-ink .pl-ping__ring{ border-color: var(--magenta-on-dark); }
  .pl-ping--on-ink .pl-ping__core{ background: var(--magenta-on-dark); }
  .pl-ping--static .pl-ping__ring{ opacity: 0.45; }
  @media (prefers-reduced-motion: no-preference){
    .pl-ping--pulse .pl-ping__ring{ animation: pl-ping-kf var(--dur-ping) var(--ease-ping) infinite; }
    .pl-ping--pulse .pl-ping__ring.b{ animation-delay: calc(var(--dur-ping) / -2); }
  }
  @keyframes pl-ping-kf{
    0%{ transform: scale(0.3); opacity: 0.55; }
    100%{ transform: scale(1); opacity: 0; }
  }
  `;
  document.head.appendChild(s);
}
function Ping({
  size = 28,
  mode = 'pulse',
  onInk = false,
  className = '',
  ...props
}) {
  const core = Math.max(4, Math.round(size * 0.26));
  const classes = ['pl-ping', `pl-ping--${mode}`, onInk ? 'pl-ping--on-ink' : '', className].filter(Boolean).join(' ');
  const rings = mode === 'static' ? [React.createElement('span', {
    className: 'pl-ping__ring',
    key: 'r',
    style: {
      transform: 'scale(0.72)'
    }
  })] : [React.createElement('span', {
    className: 'pl-ping__ring',
    key: 'a'
  }), React.createElement('span', {
    className: 'pl-ping__ring b',
    key: 'b'
  })];
  return React.createElement('span', {
    className: classes,
    style: {
      width: size,
      height: size
    },
    ...props
  }, ...rings, React.createElement('span', {
    className: 'pl-ping__core',
    key: 'core',
    style: {
      width: core,
      height: core
    }
  }));
}
Object.assign(__ds_scope, { Ping });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Ping.jsx", error: String((e && e.message) || e) }); }

// components/brand/PingDivider.jsx
try { (() => {
/* Plink Labs — PingDivider
   The section divider: a ping radiating across a hairline rule. Place between sections.
   The hairline flexes to full width; the ping is a fixed, perfectly-round node (never stretched). */

if (typeof document !== 'undefined' && !document.getElementById('pl-pingdiv-css')) {
  const s = document.createElement('style');
  s.id = 'pl-pingdiv-css';
  s.textContent = `
  .pl-pingdiv{ display: flex; align-items: center; width: 100%; }
  .pl-pingdiv__line{ flex: 1 1 0; height: 1px; background: var(--hairline); }
  .pl-pingdiv--on-ink .pl-pingdiv__line{ background: var(--hairline-on-ink); }
  .pl-pingdiv__node{ position: relative; flex: none; display: block; line-height: 0; margin: 0 18px; }
  .pl-pingdiv__ring{ transform-box: fill-box; transform-origin: center; }
  @media (prefers-reduced-motion: no-preference){
    .pl-pingdiv__ring{ animation: pl-pingdiv-kf var(--dur-ping) var(--ease-ping) infinite; }
    .pl-pingdiv__ring.b{ animation-delay: calc(var(--dur-ping) / -2); }
  }
  @keyframes pl-pingdiv-kf{
    0%{ transform: scale(0.25); opacity: 0.6; }
    100%{ transform: scale(1); opacity: 0; }
  }
  `;
  document.head.appendChild(s);
}
function PingDivider({
  onInk = false,
  position = 0.5,
  size = 44,
  className = '',
  ...props
}) {
  const magenta = onInk ? '#EC4899' : '#DB2777';
  const p = Math.max(0, Math.min(1, position));
  const node = React.createElement('span', {
    className: 'pl-pingdiv__node',
    style: {
      width: size,
      height: size
    }
  }, React.createElement('svg', {
    viewBox: '0 0 48 48',
    width: size,
    height: size,
    'aria-hidden': true,
    style: {
      display: 'block',
      overflow: 'visible'
    }
  }, React.createElement('circle', {
    className: 'pl-pingdiv__ring',
    cx: 24,
    cy: 24,
    r: 21,
    fill: 'none',
    stroke: magenta,
    strokeWidth: 2,
    key: 'r1'
  }), React.createElement('circle', {
    className: 'pl-pingdiv__ring b',
    cx: 24,
    cy: 24,
    r: 21,
    fill: 'none',
    stroke: magenta,
    strokeWidth: 2,
    key: 'r2'
  }), React.createElement('circle', {
    cx: 24,
    cy: 24,
    r: 4.5,
    fill: magenta,
    key: 'core'
  })));
  return React.createElement('div', {
    className: ['pl-pingdiv', onInk ? 'pl-pingdiv--on-ink' : '', className].filter(Boolean).join(' '),
    'aria-hidden': true,
    ...props
  }, React.createElement('span', {
    className: 'pl-pingdiv__line',
    style: {
      flexGrow: p
    },
    key: 'l1'
  }), node, React.createElement('span', {
    className: 'pl-pingdiv__line',
    style: {
      flexGrow: 1 - p
    },
    key: 'l2'
  }));
}
Object.assign(__ds_scope, { PingDivider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/PingDivider.jsx", error: String((e && e.message) || e) }); }

// components/brand/ScopeRule.jsx
try { (() => {
/* Plink Labs — ScopeRule
   A thin oscilloscope/waveform line used as a recurring rule (plink = sound).
   The hairline flexes full-width; the waveform + round emission dot are a fixed,
   undistorted glyph (never stretched into ovals). */

if (typeof document !== 'undefined' && !document.getElementById('pl-scope-css')) {
  const s = document.createElement('style');
  s.id = 'pl-scope-css';
  s.textContent = `
  .pl-scope{ display: flex; align-items: center; width: 100%; }
  .pl-scope__line{ flex: 1 1 0; height: 1px; background: var(--hairline); }
  .pl-scope--on-ink .pl-scope__line{ background: var(--hairline-on-ink); }
  .pl-scope__glyph{ flex: none; display: block; line-height: 0; }
  `;
  document.head.appendChild(s);
}
function ScopeRule({
  onInk = false,
  position = 0.35,
  height = 80,
  className = '',
  ...props
}) {
  const magenta = onInk ? '#EC4899' : '#DB2777';
  const line = onInk ? 'rgba(250,247,242,0.16)' : 'rgba(27,27,35,0.14)';
  const p = Math.max(0, Math.min(1, position));

  // Fixed glyph: a round emission dot in open flat space, then one clean plink to its right.
  const GW = 172,
    GH = height,
    mid = GH / 2;
  const amp = Math.min(mid - 8, 22);
  const dx = 30; // dot sits on the baseline, well clear of the spike
  const wave = `M0 ${mid} L${dx - 12} ${mid}` +
  // baseline up to a gap before the dot
  `M${dx + 12} ${mid} L74 ${mid}` +
  // resume after the dot, flat lead-in
  ` L92 ${mid - amp} L110 ${mid + amp} L128 ${mid}` +
  // the plink
  ` L${GW} ${mid}`; // baseline tail

  const glyph = React.createElement('svg', {
    className: 'pl-scope__glyph',
    viewBox: `0 0 ${GW} ${GH}`,
    width: GW,
    height: GH,
    'aria-hidden': true,
    style: {
      overflow: 'visible'
    }
  }, React.createElement('path', {
    d: wave,
    fill: 'none',
    stroke: magenta,
    strokeWidth: 2.2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    key: 'w'
  }), React.createElement('circle', {
    cx: dx,
    cy: mid,
    r: 4.5,
    fill: magenta,
    key: 'd'
  }));
  return React.createElement('div', {
    className: ['pl-scope', onInk ? 'pl-scope--on-ink' : '', className].filter(Boolean).join(' '),
    'aria-hidden': true,
    ...props
  }, React.createElement('span', {
    className: 'pl-scope__line',
    style: {
      flexGrow: p
    },
    key: 'l1'
  }), glyph, React.createElement('span', {
    className: 'pl-scope__line',
    style: {
      flexGrow: 1 - p
    },
    key: 'l2'
  }));
}
Object.assign(__ds_scope, { ScopeRule });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/ScopeRule.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
/* Plink Labs — Badge
   Mono text chip. Never a pill with a green checkmark. Square-crisp, hairline or flat fill. */

if (typeof document !== 'undefined' && !document.getElementById('pl-badge-css')) {
  const s = document.createElement('style');
  s.id = 'pl-badge-css';
  s.textContent = `
  .pl-badge{
    display: inline-flex; align-items: center; gap: 0.4rem;
    font-family: var(--font-mono); font-size: var(--label-sm);
    letter-spacing: var(--label-tracking-tight);
    text-transform: uppercase;
    padding: 0.28rem 0.5rem;
    border-radius: var(--radius-sm);
    border: var(--border-width) solid transparent;
    white-space: nowrap; line-height: 1;
  }
  .pl-badge--outline{ color: var(--ink-60); border-color: var(--border-strong); background: transparent; }
  .pl-badge--ink{ color: var(--paper); background: var(--ink); }
  .pl-badge--accent{ color: #fff; background: var(--magenta); }
  .pl-badge--spark{ color: var(--magenta); border-color: var(--magenta); background: transparent; }
  .pl-badge__dot{ width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex: none; }
  `;
  document.head.appendChild(s);
}
function Badge({
  variant = 'outline',
  dot = false,
  children,
  className = '',
  ...props
}) {
  const classes = ['pl-badge', `pl-badge--${variant}`, className].filter(Boolean).join(' ');
  return React.createElement('span', {
    className: classes,
    ...props
  }, dot ? React.createElement('span', {
    className: 'pl-badge__dot',
    key: 'd'
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
/* Plink Labs — Button
   Hairline + flat fill instrument-panel buttons. Crisp 6px radius.
   primary = the ONE magenta action per screen. Use sparingly. */

if (typeof document !== 'undefined' && !document.getElementById('pl-button-css')) {
  const s = document.createElement('style');
  s.id = 'pl-button-css';
  s.textContent = `
  .pl-btn{
    font-family: var(--font-body);
    font-weight: var(--body-weight-strong);
    font-size: var(--text-sm);
    line-height: 1;
    display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
    padding: 0.75rem 1.15rem;
    border-radius: var(--radius);
    border: var(--border-width) solid transparent;
    cursor: pointer;
    text-decoration: none;
    transition: background var(--dur-fast) var(--ease-standard),
                color var(--dur-fast) var(--ease-standard),
                transform var(--dur-fast) var(--ease-standard),
                border-color var(--dur-fast) var(--ease-standard);
    -webkit-font-smoothing: antialiased;
  }
  .pl-btn:active{ transform: translateY(0.5px) scale(0.985); }
  .pl-btn:focus-visible{ outline: 2px solid var(--focus-ring); outline-offset: 2px; }
  .pl-btn[disabled]{ opacity: 0.4; cursor: not-allowed; transform: none; }

  /* primary — the single magenta spark */
  .pl-btn--primary{ background: var(--magenta); color: #fff; }
  .pl-btn--primary:hover:not([disabled]){ background: var(--magenta-press); }

  /* secondary — confident ink */
  .pl-btn--secondary{ background: var(--ink); color: var(--paper); }
  .pl-btn--secondary:hover:not([disabled]){ background: #2c2c36; }

  /* outline — hairline instrument button */
  .pl-btn--outline{ background: transparent; color: var(--ink); border-color: var(--border-strong); }
  .pl-btn--outline:hover:not([disabled]){ background: rgba(27,27,35,0.04); border-color: var(--ink); }

  /* ghost — mono link, the quiet secondary action */
  .pl-btn--ghost{
    background: transparent; color: var(--ink);
    font-family: var(--font-mono); font-weight: 400; font-size: var(--text-sm);
    padding: 0.75rem 0.4rem; letter-spacing: var(--label-tracking-tight);
  }
  .pl-btn--ghost:hover:not([disabled]){ color: var(--magenta); }

  .pl-btn--sm{ padding: 0.5rem 0.8rem; font-size: var(--text-sm); }
  .pl-btn--lg{ padding: 0.95rem 1.5rem; font-size: var(--text-base); }
  .pl-btn--block{ width: 100%; }
  `;
  document.head.appendChild(s);
}
function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  as,
  children,
  className = '',
  ...props
}) {
  const Tag = as || (props.href ? 'a' : 'button');
  const classes = ['pl-btn', `pl-btn--${variant}`, size === 'sm' ? 'pl-btn--sm' : size === 'lg' ? 'pl-btn--lg' : '', block ? 'pl-btn--block' : '', className].filter(Boolean).join(' ');
  return React.createElement(Tag, {
    className: classes,
    ...props
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
/* Plink Labs — Card
   Instrument-panel surface: flat fill + 1px ink hairline. NO drop shadows.
   Optional mono section number top-left. Crisp 6px radius. */

if (typeof document !== 'undefined' && !document.getElementById('pl-card-css')) {
  const s = document.createElement('style');
  s.id = 'pl-card-css';
  s.textContent = `
  .pl-card{
    position: relative;
    background: var(--paper);
    border: var(--border-width) solid var(--border);
    border-radius: var(--radius);
    padding: var(--space-5);
    color: var(--ink);
  }
  .pl-card--raised{ background: var(--paper-2); }
  .pl-card--ink{ background: var(--ink); color: var(--on-ink); border-color: var(--hairline-on-ink); }
  .pl-card--interactive{ transition: border-color var(--dur-fast) var(--ease-standard); cursor: pointer; }
  .pl-card--interactive:hover{ border-color: var(--ink); }
  .pl-card--ink.pl-card--interactive:hover{ border-color: var(--magenta-on-dark); }
  .pl-card__num{
    position: absolute; top: var(--space-4); right: var(--space-4);
    font-family: var(--font-mono); font-size: var(--label-sm);
    color: var(--muted); letter-spacing: var(--label-tracking-tight);
  }
  `;
  document.head.appendChild(s);
}
function Card({
  variant = 'default',
  interactive = false,
  num,
  children,
  className = '',
  ...props
}) {
  const classes = ['pl-card', variant !== 'default' ? `pl-card--${variant}` : '', interactive ? 'pl-card--interactive' : '', className].filter(Boolean).join(' ');
  return React.createElement('div', {
    className: classes,
    ...props
  }, num != null ? React.createElement('span', {
    className: 'pl-card__num',
    key: 'n'
  }, num) : null, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/SpecStrip.jsx
try { (() => {
/* Plink Labs — SpecStrip
   A row of mono technical specs separated by hairline rules. The "Labs" microcopy signature. */

if (typeof document !== 'undefined' && !document.getElementById('pl-specstrip-css')) {
  const s = document.createElement('style');
  s.id = 'pl-specstrip-css';
  s.textContent = `
  .pl-specstrip{
    display: flex; flex-wrap: wrap; align-items: center;
    font-family: var(--font-mono); font-size: var(--label);
    letter-spacing: var(--label-tracking-tight); text-transform: uppercase;
    color: var(--muted);
    border-top: var(--border-width) solid var(--border);
    padding-top: var(--space-3);
  }
  .pl-specstrip__item{ padding: 0 var(--space-4); border-right: var(--border-width) solid var(--border); }
  .pl-specstrip__item:first-child{ padding-left: 0; }
  .pl-specstrip__item:last-child{ border-right: none; }
  .pl-specstrip--on-ink{ color: var(--on-ink-muted); border-top-color: var(--hairline-on-ink); }
  .pl-specstrip--on-ink .pl-specstrip__item{ border-right-color: var(--hairline-on-ink); }
  `;
  document.head.appendChild(s);
}
function SpecStrip({
  items = [],
  onInk = false,
  className = '',
  ...props
}) {
  const classes = ['pl-specstrip', onInk ? 'pl-specstrip--on-ink' : '', className].filter(Boolean).join(' ');
  return React.createElement('div', {
    className: classes,
    ...props
  }, items.map((it, i) => React.createElement('span', {
    className: 'pl-specstrip__item',
    key: i
  }, it)));
}
Object.assign(__ds_scope, { SpecStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SpecStrip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/* Plink Labs — Checkbox
   Square-crisp box (4px). Unchecked = hairline. Checked = ink fill with a magenta check. */

if (typeof document !== 'undefined' && !document.getElementById('pl-checkbox-css')) {
  const s = document.createElement('style');
  s.id = 'pl-checkbox-css';
  s.textContent = `
  .pl-check{ display: inline-flex; align-items: center; gap: 0.6rem; cursor: pointer; font-family: var(--font-body); font-size: var(--text-sm); color: var(--ink); }
  .pl-check input{ position: absolute; opacity: 0; pointer-events: none; }
  .pl-check__box{
    width: 20px; height: 20px; border-radius: var(--radius-sm); flex: none;
    border: var(--border-width) solid var(--border-strong); background: var(--paper);
    display: grid; place-items: center;
    transition: background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard);
  }
  .pl-check__box svg{ width: 12px; height: 12px; opacity: 0; transform: scale(0.6); transition: opacity var(--dur-fast), transform var(--dur-fast) var(--ease-ping); }
  .pl-check:hover .pl-check__box{ border-color: var(--ink); }
  .pl-check input:checked + .pl-check__box{ background: var(--ink); border-color: var(--ink); }
  .pl-check input:checked + .pl-check__box svg{ opacity: 1; transform: scale(1); }
  .pl-check input:focus-visible + .pl-check__box{ outline: 2px solid var(--focus-ring); outline-offset: 2px; }
  .pl-check input:disabled + .pl-check__box{ opacity: 0.4; }
  `;
  document.head.appendChild(s);
}
function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  className = '',
  ...props
}) {
  return React.createElement('label', {
    className: ['pl-check', className].filter(Boolean).join(' ')
  }, React.createElement('input', {
    type: 'checkbox',
    checked,
    defaultChecked,
    onChange,
    disabled,
    ...props
  }), React.createElement('span', {
    className: 'pl-check__box',
    key: 'b'
  }, React.createElement('svg', {
    viewBox: '0 0 12 12',
    fill: 'none',
    'aria-hidden': true
  }, React.createElement('path', {
    d: 'M2 6.2 L4.6 9 L10 3',
    stroke: '#EC4899',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }))), label ? React.createElement('span', {
    key: 'l'
  }, label) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
/* Plink Labs — Input
   Hairline border, paper fill, crisp 6px radius, magenta focus ring. Optional mono label. */

if (typeof document !== 'undefined' && !document.getElementById('pl-input-css')) {
  const s = document.createElement('style');
  s.id = 'pl-input-css';
  s.textContent = `
  .pl-field{ display: flex; flex-direction: column; gap: 0.4rem; }
  .pl-field__label{
    font-family: var(--font-mono); font-size: var(--label); letter-spacing: var(--label-tracking-tight);
    text-transform: uppercase; color: var(--muted);
  }
  .pl-input{
    font-family: var(--font-body); font-size: var(--text-base); color: var(--ink);
    background: var(--paper); border: var(--border-width) solid var(--border-strong);
    border-radius: var(--radius); padding: 0.7rem 0.85rem; width: 100%; box-sizing: border-box;
    transition: border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard);
    -webkit-font-smoothing: antialiased;
  }
  .pl-input::placeholder{ color: var(--muted); }
  .pl-input:hover{ border-color: var(--ink); }
  .pl-input:focus{ outline: none; border-color: var(--magenta); box-shadow: 0 0 0 3px rgba(219,39,119,0.18); }
  .pl-input[disabled]{ opacity: 0.5; cursor: not-allowed; }
  .pl-input--invalid{ border-color: var(--magenta); }
  textarea.pl-input{ resize: vertical; min-height: 5rem; line-height: var(--body-lh); }
  `;
  document.head.appendChild(s);
}
function Input({
  label,
  multiline = false,
  invalid = false,
  id,
  className = '',
  ...props
}) {
  const Tag = multiline ? 'textarea' : 'input';
  const field = React.createElement(Tag, {
    id,
    className: ['pl-input', invalid ? 'pl-input--invalid' : '', className].filter(Boolean).join(' '),
    'aria-invalid': invalid || undefined,
    ...props
  });
  if (!label) return field;
  return React.createElement('label', {
    className: 'pl-field',
    htmlFor: id
  }, React.createElement('span', {
    className: 'pl-field__label',
    key: 'l'
  }, label), field);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/* Plink Labs — Switch
   A crisp toggle. Off = hairline track, On = ink track with magenta knob. No glow, no gloss. */

if (typeof document !== 'undefined' && !document.getElementById('pl-switch-css')) {
  const s = document.createElement('style');
  s.id = 'pl-switch-css';
  s.textContent = `
  .pl-switch{ display: inline-flex; align-items: center; gap: 0.6rem; cursor: pointer; font-family: var(--font-body); font-size: var(--text-sm); color: var(--ink); }
  .pl-switch input{ position: absolute; opacity: 0; pointer-events: none; }
  .pl-switch__track{
    width: 42px; height: 24px; border-radius: 12px; background: transparent;
    border: var(--border-width) solid var(--border-strong); position: relative; flex: none;
    transition: background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard);
  }
  .pl-switch__knob{
    position: absolute; top: 50%; left: 3px; transform: translateY(-50%);
    width: 16px; height: 16px; border-radius: 50%; background: var(--ink);
    transition: left var(--dur) var(--ease-ping), background var(--dur-fast) var(--ease-standard);
  }
  .pl-switch input:checked + .pl-switch__track{ background: var(--ink); border-color: var(--ink); }
  .pl-switch input:checked + .pl-switch__track .pl-switch__knob{ left: 21px; background: var(--magenta); }
  .pl-switch input:focus-visible + .pl-switch__track{ outline: 2px solid var(--focus-ring); outline-offset: 2px; }
  .pl-switch input:disabled + .pl-switch__track{ opacity: 0.4; }
  `;
  document.head.appendChild(s);
}
function Switch({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  className = '',
  ...props
}) {
  return React.createElement('label', {
    className: ['pl-switch', className].filter(Boolean).join(' ')
  }, React.createElement('input', {
    type: 'checkbox',
    checked,
    defaultChecked,
    onChange,
    disabled,
    ...props
  }), React.createElement('span', {
    className: 'pl-switch__track',
    key: 't'
  }, React.createElement('span', {
    className: 'pl-switch__knob'
  })), label ? React.createElement('span', {
    key: 'l'
  }, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/* Plink Labs — Tabs
   Mono labels on a hairline baseline. Active = ink text + a magenta underline that slides. */

if (typeof document !== 'undefined' && !document.getElementById('pl-tabs-css')) {
  const s = document.createElement('style');
  s.id = 'pl-tabs-css';
  s.textContent = `
  .pl-tabs{ display: flex; gap: var(--space-5); border-bottom: var(--border-width) solid var(--border); }
  .pl-tab{
    appearance: none; background: none; border: none; cursor: pointer;
    font-family: var(--font-mono); font-size: var(--label); letter-spacing: var(--label-tracking-tight);
    text-transform: uppercase; color: var(--muted);
    padding: 0 0 0.8rem; margin-bottom: -1px;
    border-bottom: 2px solid transparent;
    transition: color var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard);
  }
  .pl-tab:hover{ color: var(--ink); }
  .pl-tab--active{ color: var(--ink); border-bottom-color: var(--magenta); }
  .pl-tab:focus-visible{ outline: 2px solid var(--focus-ring); outline-offset: 3px; }
  `;
  document.head.appendChild(s);
}
function Tabs({
  tabs = [],
  value,
  onChange,
  className = '',
  ...props
}) {
  const active = value != null ? value : tabs[0] && tabs[0].value;
  return React.createElement('div', {
    className: ['pl-tabs', className].filter(Boolean).join(' '),
    role: 'tablist',
    ...props
  }, tabs.map(t => React.createElement('button', {
    key: t.value,
    role: 'tab',
    'aria-selected': t.value === active,
    className: ['pl-tab', t.value === active ? 'pl-tab--active' : ''].filter(Boolean).join(' '),
    onClick: () => onChange && onChange(t.value)
  }, t.label)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Footer.jsx
try { (() => {
/* Plink Labs marketing — footer. Mono microcopy, hairline rules, the mark. */

function Footer() {
  const {
    Logo
  } = window.PlinkLabsDesignSystem_59a0ef;
  const cols = [{
    h: 'Products',
    items: ['Timer', 'Picker', 'Planner', 'Attendance', 'Flashcards', 'Whiteboard']
  }, {
    h: 'Project',
    items: ['Mission', 'Roadmap', 'Changelog', 'Contribute']
  }, {
    h: 'Source',
    items: ['GitHub', 'Licence — GPL-3.0', 'Issues', 'Mirror']
  }];
  return /*#__PURE__*/React.createElement("footer", {
    className: "mk-footer",
    id: "source"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-footer__top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-footer__brand"
  }, /*#__PURE__*/React.createElement(Logo, {
    size: 24
  }), /*#__PURE__*/React.createElement("p", {
    className: "mk-footer__note"
  }, "A lab for the classroom. Made by teachers, free for everyone.")), /*#__PURE__*/React.createElement("div", {
    className: "mk-footer__cols"
  }, cols.map(c => /*#__PURE__*/React.createElement("div", {
    className: "mk-footer__col",
    key: c.h
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-footer__h"
  }, c.h), /*#__PURE__*/React.createElement("ul", null, c.items.map(it => /*#__PURE__*/React.createElement("li", {
    key: it
  }, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, it)))))))), /*#__PURE__*/React.createElement("div", {
    className: "mk-footer__bar"
  }, /*#__PURE__*/React.createElement("span", null, "// plink labs \u2014 no ads, no tracking, no accounts"), /*#__PURE__*/React.createElement("span", null, "GPL-3.0 \xB7 ", new Date().getFullYear())));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Hero.jsx
try { (() => {
/* Plink Labs marketing — hero. Asymmetric editorial grid, oversized flush-left headline,
   faint open-ring watermark, one magenta word + ping, scope rule, spec strip. */

function Hero() {
  const {
    Eyebrow,
    Button,
    ScopeRule,
    SpecStrip
  } = window.PlinkLabsDesignSystem_59a0ef;
  return /*#__PURE__*/React.createElement("header", {
    className: "mk-hero"
  }, /*#__PURE__*/React.createElement("img", {
    className: "mk-hero__watermark",
    src: "../../assets/plink-mark.svg",
    alt: "",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement(Eyebrow, null, "Open source \u2014 free for every classroom"), /*#__PURE__*/React.createElement("h1", {
    className: "mk-hero__h1"
  }, "Good ", /*#__PURE__*/React.createElement("span", {
    className: "mk-spark"
  }, "software"), " for the\xA0classroom", /*#__PURE__*/React.createElement("span", {
    className: "mk-hero__ping",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 120 120",
    width: "0.42em",
    height: "0.42em"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M36 86.8 A36 36 0 1 1 84 86.8",
    fill: "none",
    stroke: "#DB2777",
    strokeWidth: "11",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "60",
    r: "15",
    fill: "#DB2777"
  })))), /*#__PURE__*/React.createElement("p", {
    className: "mk-hero__lede"
  }, "Made by teachers, free for everyone. Open source, no ads, no tracking \u2014 just tools that help students learn and teachers teach."), /*#__PURE__*/React.createElement("div", {
    className: "mk-hero__actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Browse the products \u2192"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--magenta)'
    }
  }, "\u2605"), " Star on GitHub")), /*#__PURE__*/React.createElement("div", {
    className: "mk-hero__scope"
  }, /*#__PURE__*/React.createElement(ScopeRule, {
    position: 0.36
  })), /*#__PURE__*/React.createElement(SpecStrip, {
    items: ["GPL-3.0", "GDPR-clean", "Works offline", "16px → projector"]
  }));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Mission.jsx
try { (() => {
/* Plink Labs marketing — the one full-bleed INK section. Mission statement + ping divider. */

function Mission() {
  const {
    Eyebrow,
    SpecStrip,
    Button
  } = window.PlinkLabsDesignSystem_59a0ef;
  return /*#__PURE__*/React.createElement("section", {
    className: "mk-mission",
    id: "mission"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-wrap"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    onInk: true
  }, "03 / Mission"), /*#__PURE__*/React.createElement("p", {
    className: "mk-mission__statement"
  }, "Software for school should be ", /*#__PURE__*/React.createElement("span", {
    className: "mk-spark-dark"
  }, "quiet, honest, and free"), ". No ads in front of a child. No data sold. No login to use a timer."), /*#__PURE__*/React.createElement("div", {
    className: "mk-mission__cols"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-mission__col"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mk-mono-num"
  }, "01"), /*#__PURE__*/React.createElement("p", null, "Built by teachers, in classrooms, against real lesson plans \u2014 not a growth funnel.")), /*#__PURE__*/React.createElement("div", {
    className: "mk-mission__col"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mk-mono-num"
  }, "02"), /*#__PURE__*/React.createElement("p", null, "Every tool is GPL-3.0. Fork it, host it, remix it for your own school. The code is yours.")), /*#__PURE__*/React.createElement("div", {
    className: "mk-mission__col"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mk-mono-num"
  }, "03"), /*#__PURE__*/React.createElement("p", null, "Works offline and on a decade-old projector. Accessibility and legibility come first."))), /*#__PURE__*/React.createElement("div", {
    className: "mk-mission__foot"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Read the manifesto \u2192"), /*#__PURE__*/React.createElement(SpecStrip, {
    onInk: true,
    items: ["No ads", "No tracking", "No accounts", "Forever free"]
  }))));
}
window.Mission = Mission;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Mission.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Nav.jsx
try { (() => {
/* Plink Labs marketing — top navigation */

function Nav() {
  const {
    Logo,
    Button
  } = window.PlinkLabsDesignSystem_59a0ef;
  return /*#__PURE__*/React.createElement("nav", {
    className: "mk-nav"
  }, /*#__PURE__*/React.createElement(Logo, {
    size: 26
  }), /*#__PURE__*/React.createElement("div", {
    className: "mk-nav__links"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#products"
  }, "Products"), /*#__PURE__*/React.createElement("a", {
    href: "#mission"
  }, "Mission"), /*#__PURE__*/React.createElement("a", {
    href: "#source"
  }, "GitHub"), /*#__PURE__*/React.createElement(Button, {
    as: "a",
    href: "#products",
    variant: "secondary",
    size: "sm"
  }, "Browse products")));
}
window.Nav = Nav;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Products.jsx
try { (() => {
/* Plink Labs marketing — the products grid. Flat hairline instrument cards, mono numbers. */

const PL_PRODUCTS = [{
  num: '01',
  name: 'Timer',
  tag: 'Classroom',
  desc: 'Big, readable countdowns for activities and transitions. Plinks gently when time is up.'
}, {
  num: '02',
  name: 'Picker',
  tag: 'Fairness',
  desc: 'Random name and group picker. Transparent shuffle, no repeats until everyone has had a turn.'
}, {
  num: '03',
  name: 'Planner',
  tag: 'Lessons',
  desc: 'Lay out a lesson as simple timed blocks. Drag to reorder, run it as a calm checklist.'
}, {
  num: '04',
  name: 'Attendance',
  tag: 'Roll',
  desc: 'A quiet roll call. Tap to mark present and export a clean register — nothing leaves the room.'
}, {
  num: '05',
  name: 'Flashcards',
  tag: 'Review',
  desc: 'Spaced-repetition cards for quick review. Build your own decks, flip with a keypress.'
}, {
  num: '06',
  name: 'Whiteboard',
  tag: 'Canvas',
  desc: 'A plain, fast whiteboard. Hairline grid, one ink colour, no clutter — readable from the back row.'
}];
function ProductCard({
  p
}) {
  const {
    Card,
    Badge,
    Ping
  } = window.PlinkLabsDesignSystem_59a0ef;
  return /*#__PURE__*/React.createElement(Card, {
    num: p.num,
    interactive: true,
    className: "mk-product"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mk-product__mark"
  }, /*#__PURE__*/React.createElement(Ping, {
    mode: "static",
    size: 20
  })), /*#__PURE__*/React.createElement("h3", {
    className: "mk-product__name"
  }, p.name), /*#__PURE__*/React.createElement("p", {
    className: "mk-product__desc"
  }, p.desc), /*#__PURE__*/React.createElement("div", {
    className: "mk-product__foot"
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, p.tag), /*#__PURE__*/React.createElement("span", {
    className: "mk-product__open"
  }, "Open \u2192")));
}
function Products() {
  return /*#__PURE__*/React.createElement("section", {
    className: "mk-products",
    id: "products"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mk-section-num"
  }, "02 / Products"), /*#__PURE__*/React.createElement("h2", {
    className: "mk-section-title"
  }, "Six small tools, ", /*#__PURE__*/React.createElement("span", {
    className: "mk-spark"
  }, "one"), " lab."), /*#__PURE__*/React.createElement("p", {
    className: "mk-section-lede"
  }, "Each does one thing precisely. All free, all open source, all built to be read from the back of the room.")), /*#__PURE__*/React.createElement("div", {
    className: "mk-product-grid"
  }, PL_PRODUCTS.map(p => /*#__PURE__*/React.createElement(ProductCard, {
    key: p.num,
    p: p
  }))));
}
window.Products = Products;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Products.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Ping = __ds_scope.Ping;

__ds_ns.PingDivider = __ds_scope.PingDivider;

__ds_ns.ScopeRule = __ds_scope.ScopeRule;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.SpecStrip = __ds_scope.SpecStrip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
