import * as React from 'react';
import type { AccentName } from '@adrian-danciu/ink-ui-tokens';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  accent?: AccentName;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return parts.length > 1 ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase() : (parts[0]?.slice(0, 2) ?? '?').toUpperCase();
}

export function Avatar({ name, src, size = 'md', accent, className, ...props }: AvatarProps) {
  const [imageFailed, setImageFailed] = React.useState(false);
  React.useEffect(() => setImageFailed(false), [src]);
  return <span {...props} className={['ui-avatar', className].filter(Boolean).join(' ')} data-size={size} data-ui-accent={accent} role="img" aria-label={name}>
    {src && !imageFailed ? <img src={src} alt="" onError={() => setImageFailed(true)} /> : <span aria-hidden="true">{initials(name)}</span>}
  </span>;
}
