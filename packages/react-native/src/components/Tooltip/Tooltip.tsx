import * as React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { tokens, type AccentName } from '@adrian-danciu/ink-ui-tokens';
import { blackWeight, useAccent, useTheme } from '../../theme';

export interface TooltipProps {
  label: string;
  content: string;
  children?: string;
  side?: 'top' | 'bottom';
  accent?: AccentName;
}

export function Tooltip({ label, content, children, accent }: TooltipProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  const [open, setOpen] = React.useState(false);
  return <View>
    <Pressable accessibilityRole="button" accessibilityLabel={`${label}. More information`} onPress={() => setOpen(true)} onLongPress={() => setOpen(true)} style={{ backgroundColor: colors.surface, borderColor: colors.border, borderRadius: tokens.radius.sm, borderWidth: tokens.borderWidth.md, minHeight: tokens.componentSize.md, justifyContent: 'center', paddingHorizontal: tokens.space[3], paddingVertical: tokens.space[2] }}><Text style={{ color: colors.text, fontSize: tokens.fontSize.sm, fontWeight: blackWeight }}>{children ?? label}</Text></Pressable>
    <Modal animationType="fade" transparent visible={open} onRequestClose={() => setOpen(false)}>
      <Pressable accessibilityLabel="Dismiss information" onPress={() => setOpen(false)} style={{ alignItems: 'center', backgroundColor: colors.shadow, flex: 1, justifyContent: 'center', padding: tokens.space[5] }}>
        <View accessibilityViewIsModal style={{ backgroundColor: selectedAccent.base, borderColor: colors.border, borderWidth: tokens.borderWidth.md, padding: tokens.space[4] }}><Text style={{ color: selectedAccent.on, fontSize: tokens.fontSize.sm, fontWeight: blackWeight }}>{content}</Text></View>
      </Pressable>
    </Modal>
  </View>;
}
