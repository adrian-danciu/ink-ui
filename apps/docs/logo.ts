import { accents, getTheme, themes, type AccentName, type ThemeMode, type ThemeName } from '@adrian-danciu/ink-ui-tokens';

export function logoSvg(theme: ThemeName, mode: ThemeMode, accent: AccentName | 'default') {
  const colors = getTheme(theme, mode);
  const accentName = accent === 'default' ? themes[theme].defaultAccent as AccentName : accent;
  const selectedAccent = accents[accentName];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Ink UI"><rect x="6" y="6" width="56" height="56" fill="${colors.shadow}"/><rect x="2" y="2" width="56" height="56" fill="${selectedAccent.base}" stroke="${colors.border}" stroke-width="3"/><path d="M21 18h7v28h-7zm19 0h6L36 46h-6z" fill="${selectedAccent.on}"/></svg>`;
}

export function logoDataUrl(theme: ThemeName, mode: ThemeMode, accent: AccentName | 'default') {
  return `data:image/svg+xml,${encodeURIComponent(logoSvg(theme, mode, accent))}`;
}
