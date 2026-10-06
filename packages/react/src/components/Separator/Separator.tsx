import * as React from 'react';

export interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
}

export function Separator({ orientation = 'horizontal', className, ...props }: SeparatorProps) {
  return <hr {...props} className={['ui-separator', className].filter(Boolean).join(' ')} data-orientation={orientation} aria-orientation={orientation} />;
}
