import * as React from 'react';
import { themes, type AccentName, type ThemeMode, type ThemeName } from '@adrian-danciu/ink-ui-tokens';

export interface ThemeProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  theme: ThemeName;
  mode?: ThemeMode;
  accent?: AccentName;
  motion?: boolean;
  children: React.ReactNode;
}

export function ThemeProvider({ theme, mode = 'light', accent, motion = true, children, className, ...props }: ThemeProviderProps) {
  const classes = ['ui-theme', className].filter(Boolean).join(' ');
  return <div data-ui-theme={theme} data-ui-mode={mode} data-ui-accent={accent ?? themes[theme].defaultAccent} data-ui-motion={motion ? 'on' : 'off'} className={classes} {...props}>{children}</div>;
}
