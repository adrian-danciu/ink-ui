import * as React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'text' | 'block' | 'circle';
  width?: number | `${number}%`;
  height?: number;
}

export function Skeleton({ variant = 'text', width, height, className, style, ...props }: SkeletonProps) {
  return <span {...props} className={['ui-skeleton', className].filter(Boolean).join(' ')} data-variant={variant} aria-hidden="true" style={{ width, height, ...style }} />;
}
