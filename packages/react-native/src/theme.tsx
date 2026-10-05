import * as React from 'react';
import type { TextStyle } from 'react-native';
import { accents, getTheme, themes, tokens, type AccentName, type ThemeMode, type ThemeName } from '@ui-library/tokens';

export type { AccentName, ThemeMode, ThemeName } from '@ui-library/tokens';

interface ThemeSelection { theme: ThemeName; mode: ThemeMode; accent: AccentName }
const ThemeContext = React.createContext<ThemeSelection>({ theme: 'paper', mode: 'light', accent: 'red' });

export interface ThemeProviderProps {
  theme: ThemeName;
  mode?: ThemeMode;
  accent?: AccentName;
  children: React.ReactNode;
}

export function ThemeProvider({ theme, mode = 'light', accent, children }: ThemeProviderProps) {
  return <ThemeContext.Provider value={{ theme, mode, accent: accent ?? themes[theme].defaultAccent as AccentName }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const { theme, mode } = React.useContext(ThemeContext);
  return getTheme(theme, mode);
}

export function useAccent(accent?: AccentName) {
  const selection = React.useContext(ThemeContext);
  return accents[accent ?? selection.accent];
}

export const blackWeight = String(tokens.fontWeight.black) as TextStyle['fontWeight'];
export const boldWeight = String(tokens.fontWeight.bold) as TextStyle['fontWeight'];

