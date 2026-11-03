import * as React from 'react';
import { AccessibilityInfo, type TextStyle } from 'react-native';
import { accents, getTheme, themes, tokens, type AccentName, type ThemeMode, type ThemeName } from '@adrian-danciu/ink-ui-tokens';

export type { AccentName, ThemeMode, ThemeName } from '@adrian-danciu/ink-ui-tokens';

interface ThemeSelection { theme: ThemeName; mode: ThemeMode; accent: AccentName; motion: boolean }
const ThemeContext = React.createContext<ThemeSelection>({ theme: 'paper', mode: 'light', accent: 'red', motion: true });
let reducedMotion = true;
const motionListeners = new Set<() => void>();
let motionSubscription: { remove(): void } | undefined;

function updateReducedMotion(value: boolean) {
  if (reducedMotion === value) return;
  reducedMotion = value;
  motionListeners.forEach(listener => listener());
}

function subscribeReducedMotion(listener: () => void) {
  motionListeners.add(listener);
  if (!motionSubscription) {
    motionSubscription = AccessibilityInfo.addEventListener('reduceMotionChanged', updateReducedMotion);
    AccessibilityInfo.isReduceMotionEnabled().then(updateReducedMotion);
  }
  return () => {
    motionListeners.delete(listener);
    if (!motionListeners.size) {
      motionSubscription?.remove();
      motionSubscription = undefined;
    }
  };
}

const getReducedMotion = () => reducedMotion;

export interface ThemeProviderProps {
  theme: ThemeName;
  mode?: ThemeMode;
  accent?: AccentName;
  motion?: boolean;
  children: React.ReactNode;
}

export function ThemeProvider({ theme, mode = 'light', accent, motion = true, children }: ThemeProviderProps) {
  return <ThemeContext.Provider value={{ theme, mode, accent: accent ?? themes[theme].defaultAccent as AccentName, motion }}>{children}</ThemeContext.Provider>;
}

export function useMotion(motion?: boolean) {
  const selection = React.useContext(ThemeContext);
  const reduced = React.useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => true);
  return (motion ?? selection.motion) && !reduced;
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

