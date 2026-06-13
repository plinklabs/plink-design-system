import React from 'react';

/* Plink Labs — Logo
   The open-ring mark + "plink labs" wordmark. mark | full lockup. light | dark. */

export function Logo({ variant = 'full', theme = 'light', size = 24, className = '', ...props }) {
  const stroke = theme === 'dark' ? '#EC4899' : '#DB2777';
  const wordInk = theme === 'dark' ? '#FAF7F2' : '#1B1B23';
  const wordMuted = theme === 'dark' ? '#8E8A82' : '#9A958B';

  const mark = React.createElement(
    'svg',
    { viewBox: '0 0 120 120', width: size, height: size, 'aria-hidden': true, style: { display: 'block', flex: 'none' } },
    React.createElement('path', { d: 'M36 86.8 A36 36 0 1 1 84 86.8', fill: 'none', stroke, strokeWidth: 9, strokeLinecap: 'round', key: 'a' }),
    React.createElement('circle', { cx: 60, cy: 60, r: 13, fill: stroke, key: 'c' })
  );

  if (variant === 'mark') {
    return React.createElement('span', { className: ['pl-logo', className].filter(Boolean).join(' '), ...props }, mark);
  }

  return React.createElement(
    'span',
    {
      className: ['pl-logo', className].filter(Boolean).join(' '),
      style: { display: 'inline-flex', alignItems: 'center', gap: '0.46em' },
      ...props,
    },
    mark,
    React.createElement(
      'span',
      {
        key: 'w',
        style: {
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: size * 0.92,
          letterSpacing: '-0.02em',
          color: wordInk,
          lineHeight: 1,
        },
      },
      'plink',
      React.createElement('span', { style: { color: wordMuted, fontWeight: 400 }, key: 'l' }, ' labs')
    )
  );
}
