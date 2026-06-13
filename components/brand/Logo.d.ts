import * as React from 'react';

/**
 * Plink Labs logo — open-ring mark, optionally with the "plink labs" wordmark.
 */
export interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 'full' (mark + wordmark) or 'mark' (ring only). Default 'full'. */
  variant?: 'full' | 'mark';
  /** 'light' (magenta on paper) or 'dark' (brighter magenta + paper text). Default 'light'. */
  theme?: 'light' | 'dark';
  /** Mark height in px (wordmark scales from it). Default 24. */
  size?: number;
}

export function Logo(props: LogoProps): JSX.Element;
