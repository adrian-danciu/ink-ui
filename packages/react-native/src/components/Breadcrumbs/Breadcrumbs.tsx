import { Pressable, Text, View } from 'react-native';
import { tokens } from '@adrian-danciu/ink-ui-tokens';
import { blackWeight, boldWeight, useTheme } from '../../theme';

export interface BreadcrumbItem { label: string; href?: string }
export interface BreadcrumbsProps {
  items: readonly BreadcrumbItem[];
  label?: string;
  onNavigate?: (href: string) => void;
}

export function Breadcrumbs({ items, label = 'Breadcrumb', onNavigate }: BreadcrumbsProps) {
  const colors = useTheme();
  return <View accessibilityLabel={label} style={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: tokens.space[2] }}>
    {items.map((item, index) => {
      const current = index === items.length - 1;
      return <View key={`${item.href ?? item.label}-${index}`} style={{ alignItems: 'center', flexDirection: 'row', gap: tokens.space[2] }}>
        {index > 0 && <Text style={{ color: colors.textMuted, fontSize: tokens.fontSize.xs }}>/</Text>}
        {!current && item.href && onNavigate ? <Pressable accessibilityRole="link" accessibilityLabel={item.label} onPress={() => onNavigate(item.href!)} style={{ minHeight: tokens.componentSize.md, justifyContent: 'center' }}><Text style={{ color: colors.text, fontFamily: tokens.fontFamily.mono, fontSize: tokens.fontSize.xs, fontWeight: boldWeight, textDecorationLine: 'underline', textTransform: 'uppercase' }}>{item.label}</Text></Pressable> : <Text accessibilityRole={current ? 'text' : undefined} style={{ color: colors.text, fontFamily: tokens.fontFamily.mono, fontSize: tokens.fontSize.xs, fontWeight: current ? blackWeight : boldWeight, textTransform: 'uppercase' }}>{item.label}</Text>}
      </View>;
    })}
  </View>;
}
