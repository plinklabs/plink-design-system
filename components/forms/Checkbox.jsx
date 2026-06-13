import React from 'react';

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

export function Checkbox({ label, checked, defaultChecked, onChange, disabled, className = '', ...props }) {
  return React.createElement(
    'label',
    { className: ['pl-check', className].filter(Boolean).join(' ') },
    React.createElement('input', { type: 'checkbox', checked, defaultChecked, onChange, disabled, ...props }),
    React.createElement(
      'span',
      { className: 'pl-check__box', key: 'b' },
      React.createElement(
        'svg',
        { viewBox: '0 0 12 12', fill: 'none', 'aria-hidden': true },
        React.createElement('path', { d: 'M2 6.2 L4.6 9 L10 3', stroke: '#EC4899', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })
      )
    ),
    label ? React.createElement('span', { key: 'l' }, label) : null
  );
}
