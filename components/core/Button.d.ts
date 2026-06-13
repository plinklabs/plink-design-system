import * as React from 'react';

/**
 * Primary instrument-panel button. Crisp 6px radius, flat fill, hairline borders.
 * `primary` is the single magenta spark — at most one per screen.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. primary = the one magenta action; use ghost/outline for the rest. */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Size. Default md. */
  size?: 'sm' | 'md' | 'lg';
  /** Full-width. */
  block?: boolean;
  /** Render as a different element (e.g. 'a'). Inferred as 'a' when href is set. */
  as?: any;
  href?: string;
}

export function Button(props: ButtonProps): JSX.Element;
