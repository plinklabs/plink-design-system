import React from 'react';

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

export function Card({ variant = 'default', interactive = false, num, children, className = '', ...props }) {
  const classes = [
    'pl-card',
    variant !== 'default' ? `pl-card--${variant}` : '',
    interactive ? 'pl-card--interactive' : '',
    className,
  ].filter(Boolean).join(' ');
  return React.createElement(
    'div',
    { className: classes, ...props },
    num != null ? React.createElement('span', { className: 'pl-card__num', key: 'n' }, num) : null,
    children
  );
}
