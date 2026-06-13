import React from 'react';

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

export function Tabs({ tabs = [], value, onChange, className = '', ...props }) {
  const active = value != null ? value : (tabs[0] && tabs[0].value);
  return React.createElement(
    'div',
    { className: ['pl-tabs', className].filter(Boolean).join(' '), role: 'tablist', ...props },
    tabs.map((t) =>
      React.createElement(
        'button',
        {
          key: t.value,
          role: 'tab',
          'aria-selected': t.value === active,
          className: ['pl-tab', t.value === active ? 'pl-tab--active' : ''].filter(Boolean).join(' '),
          onClick: () => onChange && onChange(t.value),
        },
        t.label
      )
    )
  );
}
