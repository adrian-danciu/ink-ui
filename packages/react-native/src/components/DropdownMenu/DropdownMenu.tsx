import * as React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { tokens, type AccentName } from '@adrian-danciu/ink-ui-tokens';
import { blackWeight, useAccent, useTheme } from '../../theme';

export interface DropdownMenuItem { id: string; label: string; disabled?: boolean; destructive?: boolean }
export interface DropdownMenuProps {
  label: string;
  items: readonly DropdownMenuItem[];
  onItemSelect: (id: string) => void;
  disabled?: boolean;
  accent?: AccentName;
}

export function DropdownMenu({ label, items, onItemSelect, disabled = false, accent }: DropdownMenuProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  const [open, setOpen] = React.useState(false);
  return <View>
    <Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ disabled, expanded: open }} disabled={disabled} onPress={() => setOpen(true)} style={{ alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: tokens.radius.sm, borderWidth: tokens.borderWidth.md, flexDirection: 'row', gap: tokens.space[3], minHeight: tokens.componentSize.md, opacity: disabled ? tokens.opacity.disabled : tokens.opacity.default, paddingHorizontal: tokens.space[3] }}><Text style={{ color: colors.text, fontSize: tokens.fontSize.sm, fontWeight: blackWeight, textTransform: 'uppercase' }}>{label}  ⌄</Text></Pressable>
    <Modal animationType="fade" transparent visible={open} onRequestClose={() => setOpen(false)}>
      <View style={{ flex: 1, justifyContent: 'center', padding: tokens.space[5] }}>
        <Pressable accessibilityLabel="Close menu" onPress={() => setOpen(false)} style={{ backgroundColor: colors.shadow, bottom: 0, left: 0, opacity: tokens.opacity.overlay, position: 'absolute', right: 0, top: 0 }} />
        <View accessibilityViewIsModal style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: tokens.borderWidth.strong, padding: tokens.space[2] }}>
          <Text accessibilityRole="header" style={{ color: colors.text, fontSize: tokens.fontSize.lg, fontWeight: blackWeight, padding: tokens.space[3], textTransform: 'uppercase' }}>{label}</Text>
          {items.map(item => <Pressable key={item.id} accessibilityRole="button" accessibilityLabel={item.label} accessibilityState={{ disabled: item.disabled }} disabled={item.disabled} onPress={() => { onItemSelect(item.id); setOpen(false); }} style={{ backgroundColor: colors.surface, borderTopColor: colors.border, borderTopWidth: tokens.borderWidth.sm, minHeight: tokens.componentSize.md, opacity: item.disabled ? tokens.opacity.disabled : tokens.opacity.default, padding: tokens.space[3] }}><Text style={{ color: item.destructive ? colors.danger : colors.text, fontSize: tokens.fontSize.sm, fontWeight: blackWeight }}>{item.label}</Text></Pressable>)}
          <Pressable accessibilityRole="button" accessibilityLabel="Close menu" onPress={() => setOpen(false)} style={{ alignSelf: 'flex-end', backgroundColor: selectedAccent.base, borderColor: colors.border, borderWidth: tokens.borderWidth.md, marginTop: tokens.space[3], padding: tokens.space[2] }}><Text style={{ color: selectedAccent.on, fontSize: tokens.fontSize.sm, fontWeight: blackWeight }}>CLOSE</Text></Pressable>
        </View>
      </View>
    </Modal>
  </View>;
}
