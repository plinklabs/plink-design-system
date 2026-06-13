import React from 'react';

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

export function Badge({ variant = 'outline', dot = false, children, className = '', ...props }) {
  const classes = ['pl-badge', `pl-badge--${variant}`, className].filter(Boolean).join(' ');
  return React.createElement(
    'span',
    { className: classes, ...props },
    dot ? React.createElement('span', { className: 'pl-badge__dot', key: 'd' }) : null,
    children
  );
}
