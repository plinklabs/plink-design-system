import * as React from 'react';

/**
 * Section divider — a ping radiating across a full-width hairline rule. Place between sections.
 * The hairline flexes full-bleed; the ping node stays perfectly round. Honours prefers-reduced-motion.
 */
export interface PingDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Use on a dark/ink background. */
  onInk?: boolean;
  /** Horizontal position of the ping, 0–1. Default 0.5 (centre); try 0.33 for editorial asymmetry. */
  position?: number;
  /** Diameter of the ping node in px. Default 44. */
  size?: number;
}

export function PingDivider(props: PingDividerProps): JSX.Element;
