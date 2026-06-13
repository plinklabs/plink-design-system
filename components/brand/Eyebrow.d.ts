import * as React from 'react';

/**
 * Mono uppercase kicker with a magenta ping dot. Sits above flush-left headlines.
 */
export interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Use on a dark/ink background. */
  onInk?: boolean;
}

export function Eyebrow(props: EyebrowProps): JSX.Element;
