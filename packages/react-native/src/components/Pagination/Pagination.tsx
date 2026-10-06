import { Pressable, Text, View } from 'react-native';
import { tokens, type AccentName } from '@adrian-danciu/ink-ui-tokens';
import { blackWeight, useAccent, useTheme } from '../../theme';

export interface PaginationProps {
  page: number;
  count: number;
  onPageChange: (page: number) => void;
  label?: string;
  accent?: AccentName;
}

function pageItems(page: number, count: number) {
  const pages = [...new Set([1, count, page - 1, page, page + 1].filter(value => value >= 1 && value <= count))].sort((a, b) => a - b);
  return pages.flatMap((value, index) => index && value - pages[index - 1] > 1 ? [null, value] : [value]);
}

export function Pagination({ page, count, onPageChange, label = 'Pagination', accent }: PaginationProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  const total = Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0;
  if (!total) return null;
  const current = Number.isFinite(page) ? Math.min(total, Math.max(1, Math.floor(page))) : 1;
  const button = (text: string, target: number, selected = false, disabled = false, accessibleLabel?: string) => <Pressable key={text} accessibilityRole="button" accessibilityLabel={accessibleLabel ?? `Page ${text}`} accessibilityState={{ selected, disabled }} disabled={disabled} onPress={() => onPageChange(target)} style={{ alignItems: 'center', backgroundColor: selected ? selectedAccent.base : colors.surface, borderColor: colors.border, borderRadius: tokens.radius.sm, borderWidth: tokens.borderWidth.md, justifyContent: 'center', minHeight: tokens.componentSize.md, minWidth: tokens.componentSize.md, opacity: disabled ? tokens.opacity.disabled : tokens.opacity.default, paddingHorizontal: tokens.space[2] }}><Text style={{ color: selected ? selectedAccent.on : colors.text, fontSize: tokens.fontSize.sm, fontWeight: blackWeight }}>{text}</Text></Pressable>;
  return <View accessibilityLabel={label} style={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: tokens.space[2] }}>
    {button('‹', current - 1, false, current === 1, 'Previous page')}
    {pageItems(current, total).map((item, index) => item === null ? <Text key={`gap-${index}`} style={{ color: colors.textMuted }}>…</Text> : button(String(item), item, item === current))}
    {button('›', current + 1, false, current === total, 'Next page')}
  </View>;
}
