import * as React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { tokens, type AccentName } from '@ui-library/tokens';
import { useTheme, useAccent, blackWeight, boldWeight } from '../../theme';

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  accent?: AccentName;
  children?: React.ReactNode;
}

export function Dialog({ open, onOpenChange, title, description, accent, children }: DialogProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  return <Modal animationType="fade" transparent visible={open} onRequestClose={() => onOpenChange(false)}>
    <View style={{ flex: 1, justifyContent: 'center', padding: tokens.space[5] }}>
      <View pointerEvents="none" style={{ backgroundColor: colors.shadow, bottom: 0, left: 0, opacity: tokens.opacity.overlay, position: 'absolute', right: 0, top: 0 }} />
      <View accessibilityViewIsModal style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: tokens.borderWidth.strong, padding: tokens.space[5] }}>
        <View style={{ alignItems: 'center', borderBottomColor: colors.border, borderBottomWidth: tokens.borderWidth.md, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: tokens.space[2] }}>
          <Text style={{ color: colors.textMuted, fontSize: tokens.fontSize.caption, fontWeight: boldWeight, letterSpacing: tokens.letterSpacing.wide }}>ATTENTION / 001</Text>
          <Pressable accessibilityRole="button" accessibilityLabel="Close dialog" onPress={() => onOpenChange(false)} style={{ alignItems: 'center', backgroundColor: selectedAccent.base, borderColor: colors.border, borderWidth: tokens.borderWidth.md, height: tokens.componentSize.sm, justifyContent: 'center', width: tokens.componentSize.sm }}><Text style={{ color: selectedAccent.on, fontSize: tokens.fontSize.lg, fontWeight: blackWeight }}>×</Text></Pressable>
        </View>
        <Text accessibilityRole="header" style={{ color: colors.text, fontSize: tokens.fontSize['2xl'], fontWeight: blackWeight, lineHeight: tokens.lineHeight.title, marginTop: tokens.space[4], textTransform: 'uppercase' }}>{title}</Text>
        {description && <Text style={{ color: colors.textMuted, fontSize: tokens.fontSize.sm, lineHeight: tokens.lineHeight.body, marginTop: tokens.space[2] }}>{description}</Text>}
        {children && <View style={{ marginTop: tokens.space[5] }}>{children}</View>}
      </View>
    </View>
  </Modal>;
}

