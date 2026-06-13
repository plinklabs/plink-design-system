import React from 'react';

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

export function Input({ label, multiline = false, invalid = false, id, className = '', ...props }) {
  const Tag = multiline ? 'textarea' : 'input';
  const field = React.createElement(Tag, {
    id, className: ['pl-input', invalid ? 'pl-input--invalid' : '', className].filter(Boolean).join(' '),
    'aria-invalid': invalid || undefined, ...props,
  });
  if (!label) return field;
  return React.createElement(
    'label',
    { className: 'pl-field', htmlFor: id },
    React.createElement('span', { className: 'pl-field__label', key: 'l' }, label),
    field
  );
}
