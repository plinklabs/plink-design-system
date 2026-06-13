import React from 'react';

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

export function PingDivider({ onInk = false, position = 0.5, size = 44, className = '', ...props }) {
  const magenta = onInk ? '#EC4899' : '#DB2777';
  const p = Math.max(0, Math.min(1, position));
  const node = React.createElement(
    'span',
    { className: 'pl-pingdiv__node', style: { width: size, height: size } },
    React.createElement(
      'svg',
      { viewBox: '0 0 48 48', width: size, height: size, 'aria-hidden': true, style: { display: 'block', overflow: 'visible' } },
      React.createElement('circle', { className: 'pl-pingdiv__ring', cx: 24, cy: 24, r: 21, fill: 'none', stroke: magenta, strokeWidth: 2, key: 'r1' }),
      React.createElement('circle', { className: 'pl-pingdiv__ring b', cx: 24, cy: 24, r: 21, fill: 'none', stroke: magenta, strokeWidth: 2, key: 'r2' }),
      React.createElement('circle', { cx: 24, cy: 24, r: 4.5, fill: magenta, key: 'core' })
    )
  );
  return React.createElement(
    'div',
    { className: ['pl-pingdiv', onInk ? 'pl-pingdiv--on-ink' : '', className].filter(Boolean).join(' '), 'aria-hidden': true, ...props },
    React.createElement('span', { className: 'pl-pingdiv__line', style: { flexGrow: p }, key: 'l1' }),
    node,
    React.createElement('span', { className: 'pl-pingdiv__line', style: { flexGrow: 1 - p }, key: 'l2' })
  );
}
