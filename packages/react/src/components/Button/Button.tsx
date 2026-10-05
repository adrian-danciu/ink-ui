import * as React from 'react';
import type { AccentName } from '@ui-library/tokens';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  accent?: AccentName;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { size = 'md', variant = 'primary', accent, className, type = 'button', ...props },
  ref,
) {
  const classes = ['ui-button', className].filter(Boolean).join(' ');
  return <button ref={ref} type={type} className={classes} data-size={size} data-variant={variant} data-ui-accent={accent} {...props} />;
});
