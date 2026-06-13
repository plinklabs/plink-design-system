import React from 'react';

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

export function Eyebrow({ onInk = false, children, className = '', ...props }) {
  const classes = ['pl-eyebrow', onInk ? 'pl-eyebrow--on-ink' : '', className].filter(Boolean).join(' ');
  return React.createElement(
    'p',
    { className: classes, ...props },
    React.createElement('span', { className: 'pl-eyebrow__dot', key: 'd' }),
    children
  );
}
