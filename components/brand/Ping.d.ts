import * as React from 'react';

/**
 * The signature concentric-ring pulse — use for loading + success states, bullets, and accents.
 * Honours prefers-reduced-motion.
 */
export interface PingProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Overall diameter in px. Default 28. */
  size?: number;
  /** 'pulse' animates outward (loading/success); 'static' is a quiet ring bullet. Default 'pulse'. */
  mode?: 'pulse' | 'static';
  /** Use on a dark/ink background (brighter magenta). */
  onInk?: boolean;
}

export function Ping(props: PingProps): JSX.Element;
