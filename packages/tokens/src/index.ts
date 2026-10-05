import source from './tokens.json';

export const tokens = source;
export type ThemeName = keyof typeof source.themes;
export type ThemeMode = keyof (typeof source.themes)['paper']['modes'];
export type AccentName = keyof typeof source.accents;
export type ThemeColors = (typeof source.themes)['paper']['modes'][ThemeMode];
export const themes = source.themes;
export const accents = source.accents;

export function getTheme(name: ThemeName, mode: ThemeMode): ThemeColors {
  return themes[name].modes[mode];
}

export function getAccent(name: AccentName) {
  return accents[name];
}
