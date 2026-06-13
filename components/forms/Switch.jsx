import React from 'react';

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

export function Switch({ label, checked, defaultChecked, onChange, disabled, className = '', ...props }) {
  return React.createElement(
    'label',
    { className: ['pl-switch', className].filter(Boolean).join(' ') },
    React.createElement('input', { type: 'checkbox', checked, defaultChecked, onChange, disabled, ...props }),
    React.createElement(
      'span',
      { className: 'pl-switch__track', key: 't' },
      React.createElement('span', { className: 'pl-switch__knob' })
    ),
    label ? React.createElement('span', { key: 'l' }, label) : null
  );
}
