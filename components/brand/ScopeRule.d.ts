import * as React from 'react';

/**
 * A thin oscilloscope/waveform line used as a recurring horizontal rule (plink = sound):
 * a flat signal that plinks once. Stretches full-bleed.
 */
export interface ScopeRuleProps extends React.SVGAttributes<SVGSVGElement> {
  /** Use on a dark/ink background. */
  onInk?: boolean;
  /** Horizontal position of the plink, 0–1. Default 0.35. */
  position?: number;
  /** SVG height in px. Default 80. */
  height?: number;
}

export function ScopeRule(props: ScopeRuleProps): JSX.Element;
