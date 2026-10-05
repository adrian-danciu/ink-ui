import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { tokens } from '@adrian-danciu/ink-ui-tokens';
import { blackWeight, boldWeight, useAccent, useTheme } from '../../theme';

export interface SideNavLink { label: string; href: string }
export interface SideNavGroup { title: string; links: readonly SideNavLink[] }
export interface SideNavProps {
  groups: readonly SideNavGroup[];
  currentPath?: string;
  label?: string;
  header?: ReactNode;
  footer?: ReactNode;
  onNavigate: (href: string) => void;
}

export function SideNav({ groups, currentPath, label = 'Side navigation', header, footer, onNavigate }: SideNavProps) {
  const colors = useTheme();
  const accent = useAccent();
  return <View accessibilityLabel={label} style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: tokens.borderWidth.strong }}>
    {header && <View style={{ borderBottomColor: colors.border, borderBottomWidth: tokens.borderWidth.md, padding: tokens.space[5] }}>{header}</View>}
    <View style={{ paddingHorizontal: tokens.space[3], paddingVertical: tokens.space[5] }}>
      {groups.map((group, groupIndex) => <View key={group.title} style={{ marginTop: groupIndex ? tokens.space[6] : tokens.space[0] }}>
        <Text style={{ color: colors.textMuted, fontFamily: tokens.fontFamily.mono, fontSize: tokens.fontSize.caption, fontWeight: boldWeight, letterSpacing: tokens.letterSpacing.wide, marginHorizontal: tokens.space[2], marginBottom: tokens.space[2], textTransform: 'uppercase' }}>{group.title}</Text>
        {group.links.map(link => {
          const active = currentPath === link.href;
          return <Pressable key={link.href} accessibilityRole="button" accessibilityLabel={link.label} accessibilityState={{ selected: active }} onPress={() => onNavigate(link.href)} style={{ backgroundColor: active ? accent.base : colors.surface, borderColor: active ? colors.border : 'transparent', borderWidth: tokens.borderWidth.md, marginBottom: tokens.space[1], minHeight: tokens.componentSize.md, justifyContent: 'center', paddingHorizontal: tokens.space[3], paddingVertical: tokens.space[2] }}>
            <Text style={{ color: active ? accent.on : colors.text, fontSize: tokens.fontSize.sm, fontWeight: active ? blackWeight : boldWeight }}>{link.label}</Text>
          </Pressable>;
        })}
      </View>)}
    </View>
    {footer && <View style={{ borderTopColor: colors.border, borderTopWidth: tokens.borderWidth.md, padding: tokens.space[5] }}>{footer}</View>}
  </View>;
}
