import * as React from 'react';

/**
 * A row of mono technical specs separated by hairline rules — the "Labs" microcopy signature.
 */
export interface SpecStripProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Short uppercase spec strings, e.g. ["GPL-3.0", "Works offline"]. */
  items: string[];
  /** Use on a dark/ink background. */
  onInk?: boolean;
}

export function SpecStrip(props: SpecStripProps): JSX.Element;
