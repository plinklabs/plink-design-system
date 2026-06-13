import * as React from 'react';

/**
 * Mono text chip for tags, statuses, and technical labels.
 * Square-crisp — never a pill, never a green checkmark.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Fill/border treatment. Default outline. */
  variant?: 'outline' | 'ink' | 'accent' | 'spark';
  /** Show a leading status dot. */
  dot?: boolean;
}

export function Badge(props: BadgeProps): JSX.Element;
