import * as React from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { tokens, type AccentName } from '@adrian-danciu/ink-ui-tokens';
import { blackWeight, boldWeight, useAccent, useTheme } from '../../theme';

export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  side?: 'left' | 'right' | 'top' | 'bottom';
  accent?: AccentName;
  children?: React.ReactNode;
}

export function Sheet({ open, onOpenChange, title, description, side = 'right', accent, children }: SheetProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  const vertical = side === 'left' || side === 'right';
  return <Modal animationType="slide" transparent visible={open} onRequestClose={() => onOpenChange(false)}>
    <View style={{ flex: 1, flexDirection: vertical ? 'row' : 'column', justifyContent: side === 'right' || side === 'bottom' ? 'flex-end' : 'flex-start' }}>
      <Pressable accessibilityLabel="Close panel" onPress={() => onOpenChange(false)} style={{ backgroundColor: colors.shadow, bottom: 0, left: 0, opacity: tokens.opacity.overlay, position: 'absolute', right: 0, top: 0 }} />
      <View accessibilityViewIsModal style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: tokens.borderWidth.strong, height: vertical ? '100%' : undefined, maxHeight: vertical ? undefined : '80%', width: vertical ? '85%' : '100%' }}>
        <View style={{ alignItems: 'center', borderBottomColor: colors.border, borderBottomWidth: tokens.borderWidth.md, flexDirection: 'row', justifyContent: 'space-between', padding: tokens.space[4] }}>
          <Text style={{ color: colors.textMuted, fontSize: tokens.fontSize.caption, fontWeight: boldWeight }}>PANEL / 001</Text>
          <Pressable accessibilityRole="button" accessibilityLabel="Close panel" onPress={() => onOpenChange(false)} style={{ alignItems: 'center', backgroundColor: selectedAccent.base, borderColor: colors.border, borderWidth: tokens.borderWidth.md, height: tokens.componentSize.sm, justifyContent: 'center', width: tokens.componentSize.sm }}><Text style={{ color: selectedAccent.on, fontSize: tokens.fontSize.lg, fontWeight: blackWeight }}>×</Text></Pressable>
        </View>
        <ScrollView contentContainerStyle={{ gap: tokens.space[3], padding: tokens.space[5] }}>
          <Text accessibilityRole="header" style={{ color: colors.text, fontSize: tokens.fontSize['2xl'], fontWeight: blackWeight, textTransform: 'uppercase' }}>{title}</Text>
          {description && <Text style={{ color: colors.textMuted, fontSize: tokens.fontSize.sm, lineHeight: tokens.lineHeight.body }}>{description}</Text>}
          {children}
        </ScrollView>
      </View>
    </View>
  </Modal>;
}
