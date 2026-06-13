import React from 'react';

/* Plink Labs — Button
   Hairline + flat fill instrument-panel buttons. Crisp 6px radius.
   primary = the ONE magenta action per screen. Use sparingly. */

if (typeof document !== 'undefined' && !document.getElementById('pl-button-css')) {
  const s = document.createElement('style');
  s.id = 'pl-button-css';
  s.textContent = `
  .pl-btn{
    font-family: var(--font-body);
    font-weight: var(--body-weight-strong);
    font-size: var(--text-sm);
    line-height: 1;
    display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
    padding: 0.75rem 1.15rem;
    border-radius: var(--radius);
    border: var(--border-width) solid transparent;
    cursor: pointer;
    text-decoration: none;
    transition: background var(--dur-fast) var(--ease-standard),
                color var(--dur-fast) var(--ease-standard),
                transform var(--dur-fast) var(--ease-standard),
                border-color var(--dur-fast) var(--ease-standard);
    -webkit-font-smoothing: antialiased;
  }
  .pl-btn:active{ transform: translateY(0.5px) scale(0.985); }
  .pl-btn:focus-visible{ outline: 2px solid var(--focus-ring); outline-offset: 2px; }
  .pl-btn[disabled]{ opacity: 0.4; cursor: not-allowed; transform: none; }

  /* primary — the single magenta spark */
  .pl-btn--primary{ background: var(--magenta); color: #fff; }
  .pl-btn--primary:hover:not([disabled]){ background: var(--magenta-press); }

  /* secondary — confident ink */
  .pl-btn--secondary{ background: var(--ink); color: var(--paper); }
  .pl-btn--secondary:hover:not([disabled]){ background: #2c2c36; }

  /* outline — hairline instrument button */
  .pl-btn--outline{ background: transparent; color: var(--ink); border-color: var(--border-strong); }
  .pl-btn--outline:hover:not([disabled]){ background: rgba(27,27,35,0.04); border-color: var(--ink); }

  /* ghost — mono link, the quiet secondary action */
  .pl-btn--ghost{
    background: transparent; color: var(--ink);
    font-family: var(--font-mono); font-weight: 400; font-size: var(--text-sm);
    padding: 0.75rem 0.4rem; letter-spacing: var(--label-tracking-tight);
  }
  .pl-btn--ghost:hover:not([disabled]){ color: var(--magenta); }

  .pl-btn--sm{ padding: 0.5rem 0.8rem; font-size: var(--text-sm); }
  .pl-btn--lg{ padding: 0.95rem 1.5rem; font-size: var(--text-base); }
  .pl-btn--block{ width: 100%; }
  `;
  document.head.appendChild(s);
}

export function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  as,
  children,
  className = '',
  ...props
}) {
  const Tag = as || (props.href ? 'a' : 'button');
  const classes = [
    'pl-btn',
    `pl-btn--${variant}`,
    size === 'sm' ? 'pl-btn--sm' : size === 'lg' ? 'pl-btn--lg' : '',
    block ? 'pl-btn--block' : '',
    className,
  ].filter(Boolean).join(' ');
  return React.createElement(Tag, { className: classes, ...props }, children);
}
