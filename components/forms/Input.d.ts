import * as React from 'react';

/**
 * Text input / textarea — hairline border, paper fill, magenta focus ring.
 * Pass `label` for a mono uppercase field label.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Mono uppercase label shown above the field. */
  label?: string;
  /** Render a multi-line textarea instead. */
  multiline?: boolean;
  /** Invalid styling. */
  invalid?: boolean;
}

export function Input(props: InputProps): JSX.Element;
