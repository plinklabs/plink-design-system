import * as React from 'react';

/**
 * Crisp toggle — hairline track off, ink track with magenta knob on. No glow.
 */
export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional text label after the switch. */
  label?: string;
}

export function Switch(props: SwitchProps): JSX.Element;
