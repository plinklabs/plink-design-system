import * as React from 'react';

/**
 * Square-crisp checkbox — hairline box, ink fill with a magenta check when on.
 */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional text label after the box. */
  label?: string;
}

export function Checkbox(props: CheckboxProps): JSX.Element;
