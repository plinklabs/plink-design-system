import React from 'react';

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

export function Ping({ size = 28, mode = 'pulse', onInk = false, className = '', ...props }) {
  const core = Math.max(4, Math.round(size * 0.26));
  const classes = ['pl-ping', `pl-ping--${mode}`, onInk ? 'pl-ping--on-ink' : '', className].filter(Boolean).join(' ');
  const rings = mode === 'static'
    ? [React.createElement('span', { className: 'pl-ping__ring', key: 'r', style: { transform: 'scale(0.72)' } })]
    : [
        React.createElement('span', { className: 'pl-ping__ring', key: 'a' }),
        React.createElement('span', { className: 'pl-ping__ring b', key: 'b' }),
      ];
  return React.createElement(
    'span',
    { className: classes, style: { width: size, height: size }, ...props },
    ...rings,
    React.createElement('span', { className: 'pl-ping__core', key: 'core', style: { width: core, height: core } })
  );
}
