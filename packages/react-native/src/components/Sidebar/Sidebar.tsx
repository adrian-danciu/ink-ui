import * as React from 'react';
import { Modal, Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { tokens } from '@adrian-danciu/ink-ui-tokens';
import { blackWeight, boldWeight, useAccent, useTheme } from '../../theme';

export interface SidebarLink { label: string; href: string; icon?: React.ReactNode; iconPosition?: 'left' | 'right' }
export interface SidebarGroup { title: string; links: readonly SidebarLink[] }
export interface SidebarProps {
  groups: readonly SidebarGroup[];
  currentPath?: string;
  label?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  collapsible?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  onNavigate: (href: string) => void;
}

export function Sidebar({ groups, currentPath, label = 'Sidebar navigation', header, footer, iconPosition = 'left', collapsible = false, collapsed, defaultCollapsed = false, onCollapsedChange, mobileOpen, onMobileOpenChange, onNavigate }: SidebarProps) {
  const colors = useTheme();
  const accent = useAccent();
  const { width: screenWidth } = useWindowDimensions();
  const [internalCollapsed, setInternalCollapsed] = React.useState(defaultCollapsed);
  const isCollapsed = collapsible && (collapsed ?? internalCollapsed);
  const drawer = mobileOpen !== undefined;

  function toggleCollapsed() {
    const next = !isCollapsed;
    if (collapsed === undefined) setInternalCollapsed(next);
    onCollapsedChange?.(next);
  }

  const content = <View accessibilityLabel={label} style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: tokens.borderWidth.strong, flex: drawer ? 1 : undefined, width: isCollapsed && !drawer ? tokens.componentSize.lg + tokens.space[4] : undefined }}>
    {collapsible && !drawer && <Pressable accessibilityRole="button" accessibilityLabel={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} accessibilityState={{ expanded: !isCollapsed }} onPress={toggleCollapsed} style={{ alignItems: 'center', alignSelf: 'flex-end', borderColor: colors.border, borderWidth: tokens.borderWidth.md, justifyContent: 'center', margin: tokens.space[2], minHeight: tokens.componentSize.md, minWidth: tokens.componentSize.md }}><Text style={{ color: colors.text, fontSize: tokens.fontSize.lg }}>{isCollapsed ? '→' : '←'}</Text></Pressable>}
    {drawer && <Pressable accessibilityRole="button" accessibilityLabel="Close navigation" onPress={() => onMobileOpenChange?.(false)} style={{ alignItems: 'center', alignSelf: 'flex-end', borderColor: colors.border, borderWidth: tokens.borderWidth.md, justifyContent: 'center', margin: tokens.space[2], minHeight: tokens.componentSize.md, minWidth: tokens.componentSize.md }}><Text style={{ color: colors.text, fontSize: tokens.fontSize.lg }}>×</Text></Pressable>}
    {header && (!isCollapsed || drawer) && <View style={{ borderBottomColor: colors.border, borderBottomWidth: tokens.borderWidth.md, padding: tokens.space[5] }}>{header}</View>}
    <ScrollView style={{ flexGrow: drawer ? 1 : undefined }} contentContainerStyle={{ paddingHorizontal: isCollapsed && !drawer ? tokens.space[1] : tokens.space[3], paddingVertical: tokens.space[5] }}>
      {groups.map((group, groupIndex) => <View key={group.title} style={{ marginTop: groupIndex ? tokens.space[6] : tokens.space[0] }}>
        {(!isCollapsed || drawer) && <Text style={{ color: colors.textMuted, fontFamily: tokens.fontFamily.mono, fontSize: tokens.fontSize.caption, fontWeight: boldWeight, letterSpacing: tokens.letterSpacing.wide, marginHorizontal: tokens.space[2], marginBottom: tokens.space[2], textTransform: 'uppercase' }}>{group.title}</Text>}
        {group.links.map(link => {
          const active = currentPath === link.href;
          const showLabel = !isCollapsed || drawer;
          const icon = link.icon ? <View accessible={false} style={{ alignItems: 'center', justifyContent: 'center', width: tokens.space[5] }}>{link.icon}</View> : null;
          return <Pressable key={link.href} accessibilityRole="button" accessibilityLabel={link.label} accessibilityState={{ selected: active }} onPress={() => { onNavigate(link.href); if (drawer) onMobileOpenChange?.(false); }} style={{ alignItems: 'center', backgroundColor: active ? accent.base : colors.surface, borderColor: active ? colors.border : 'transparent', borderWidth: tokens.borderWidth.md, flexDirection: 'row', gap: tokens.space[2], justifyContent: showLabel ? 'flex-start' : 'center', marginBottom: tokens.space[1], minHeight: tokens.componentSize.md, paddingHorizontal: showLabel ? tokens.space[3] : tokens.space[1], paddingVertical: tokens.space[2] }}>
            {(link.iconPosition ?? iconPosition) === 'left' && icon}
            {showLabel ? <Text style={{ color: active ? accent.on : colors.text, flex: 1, fontSize: tokens.fontSize.sm, fontWeight: active ? blackWeight : boldWeight }}>{link.label}</Text> : !icon && <Text style={{ color: active ? accent.on : colors.text, fontSize: tokens.fontSize.sm, fontWeight: blackWeight }}>{link.label.charAt(0).toUpperCase()}</Text>}
            {(link.iconPosition ?? iconPosition) === 'right' && icon}
          </Pressable>;
        })}
      </View>)}
    </ScrollView>
    {footer && (!isCollapsed || drawer) && <View style={{ borderTopColor: colors.border, borderTopWidth: tokens.borderWidth.md, padding: tokens.space[5] }}>{footer}</View>}
  </View>;

  if (!drawer) return content;
  return <Modal visible={!!mobileOpen} transparent animationType="slide" onRequestClose={() => onMobileOpenChange?.(false)}>
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ width: Math.min(tokens.componentSize.lg * 6, screenWidth - tokens.space[8]) }}>{content}</View>
      <Pressable accessibilityRole="button" accessibilityLabel="Close navigation" onPress={() => onMobileOpenChange?.(false)} style={{ backgroundColor: colors.border, flex: 1, opacity: tokens.opacity.overlay }} />
    </View>
  </Modal>;
}
