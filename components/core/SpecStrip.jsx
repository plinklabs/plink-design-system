import React from 'react';

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

export function SpecStrip({ items = [], onInk = false, className = '', ...props }) {
  const classes = ['pl-specstrip', onInk ? 'pl-specstrip--on-ink' : '', className].filter(Boolean).join(' ');
  return React.createElement(
    'div',
    { className: classes, ...props },
    items.map((it, i) => React.createElement('span', { className: 'pl-specstrip__item', key: i }, it))
  );
}
