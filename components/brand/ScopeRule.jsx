import React from 'react';

/* Plink Labs — ScopeRule
   A thin oscilloscope/waveform line used as a recurring rule (plink = sound).
   The hairline flexes full-width; the waveform + round emission dot are a fixed,
   undistorted glyph (never stretched into ovals). */

if (typeof document !== 'undefined' && !document.getElementById('pl-scope-css')) {
  const s = document.createElement('style');
  s.id = 'pl-scope-css';
  s.textContent = `
  .pl-scope{ display: flex; align-items: center; width: 100%; }
  .pl-scope__line{ flex: 1 1 0; height: 1px; background: var(--hairline); }
  .pl-scope--on-ink .pl-scope__line{ background: var(--hairline-on-ink); }
  .pl-scope__glyph{ flex: none; display: block; line-height: 0; }
  `;
  document.head.appendChild(s);
}

export function ScopeRule({ onInk = false, position = 0.35, height = 80, className = '', ...props }) {
  const magenta = onInk ? '#EC4899' : '#DB2777';
  const line = onInk ? 'rgba(250,247,242,0.16)' : 'rgba(27,27,35,0.14)';
  const p = Math.max(0, Math.min(1, position));

  // Fixed glyph: a round emission dot in open flat space, then one clean plink to its right.
  const GW = 172, GH = height, mid = GH / 2;
  const amp = Math.min(mid - 8, 22);
  const dx = 30;               // dot sits on the baseline, well clear of the spike
  const wave =
    `M0 ${mid} L${dx - 12} ${mid}` +          // baseline up to a gap before the dot
    `M${dx + 12} ${mid} L74 ${mid}` +          // resume after the dot, flat lead-in
    ` L92 ${mid - amp} L110 ${mid + amp} L128 ${mid}` + // the plink
    ` L${GW} ${mid}`;                          // baseline tail

  const glyph = React.createElement(
    'svg',
    { className: 'pl-scope__glyph', viewBox: `0 0 ${GW} ${GH}`, width: GW, height: GH, 'aria-hidden': true, style: { overflow: 'visible' } },
    React.createElement('path', { d: wave, fill: 'none', stroke: magenta, strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round', key: 'w' }),
    React.createElement('circle', { cx: dx, cy: mid, r: 4.5, fill: magenta, key: 'd' })
  );

  return React.createElement(
    'div',
    { className: ['pl-scope', onInk ? 'pl-scope--on-ink' : '', className].filter(Boolean).join(' '), 'aria-hidden': true, ...props },
    React.createElement('span', { className: 'pl-scope__line', style: { flexGrow: p }, key: 'l1' }),
    glyph,
    React.createElement('span', { className: 'pl-scope__line', style: { flexGrow: 1 - p }, key: 'l2' })
  );
}
