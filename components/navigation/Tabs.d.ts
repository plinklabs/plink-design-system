import * as React from 'react';

export interface TabItem {
  value: string;
  label: React.ReactNode;
}

/**
 * Mono-label tabs on a hairline baseline; active tab gets a magenta underline.
 * Controlled — pass `value` and `onChange`.
 */
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  tabs: TabItem[];
  /** Active tab value. Defaults to first tab. */
  value?: string;
  onChange?: (value: string) => void;
}

export function Tabs(props: TabsProps): JSX.Element;
