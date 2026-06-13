import * as React from 'react';

/**
 * Instrument-panel surface — flat fill + 1px hairline border, no drop shadow.
 * Optional mono section number in the corner.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Surface treatment. ink = full-bleed dark panel. Default 'default' (paper). */
  variant?: 'default' | 'raised' | 'ink';
  /** Hairline highlights to ink on hover. */
  interactive?: boolean;
  /** Mono section number rendered top-right (e.g. "01"). */
  num?: string;
}

export function Card(props: CardProps): JSX.Element;
