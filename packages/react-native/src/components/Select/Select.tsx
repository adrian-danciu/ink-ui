import * as React from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { tokens } from '@ui-library/tokens';
import { useTheme, blackWeight, boldWeight } from '../../theme';

export interface SelectProps {
  label: string;
  options: readonly { label: string; value: string }[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
}

export function Select({ label, options, value, onValueChange, placeholder = 'Choose an option', disabled }: SelectProps) {
  const colors = useTheme();
  const [open, setOpen] = React.useState(false);
  const selected = options.find(option => option.value === value);
  return <View style={{ gap: tokens.space[2] }}>
    <Text style={{ color: colors.text, fontSize: tokens.fontSize.sm, fontWeight: blackWeight, letterSpacing: tokens.letterSpacing.wide, textTransform: 'uppercase' }}>{label}</Text>
    <Pressable accessibilityRole="button" accessibilityLabel={`${label}, ${selected?.label ?? placeholder}`} accessibilityState={{ disabled: !!disabled, expanded: open }} disabled={disabled} onPress={() => setOpen(true)} style={{ alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: tokens.radius.sm, borderWidth: tokens.borderWidth.md, flexDirection: 'row', justifyContent: 'space-between', minHeight: tokens.componentSize.md, opacity: disabled ? tokens.opacity.disabled : tokens.opacity.default, paddingHorizontal: tokens.space[3] }}>
      <Text style={{ color: selected ? colors.text : colors.textMuted, fontSize: tokens.fontSize.md }}>{selected?.label ?? placeholder}</Text>
      <Text style={{ color: colors.text, fontSize: tokens.fontSize.md, fontWeight: blackWeight }}>⌄</Text>
    </Pressable>
    <Modal animationType="fade" transparent visible={open} onRequestClose={() => setOpen(false)}>
      <View style={{ flex: 1, justifyContent: 'center', padding: tokens.space[5] }}>
        <Pressable accessibilityLabel="Close options" onPress={() => setOpen(false)} style={{ backgroundColor: colors.shadow, bottom: 0, left: 0, opacity: tokens.opacity.overlay, position: 'absolute', right: 0, top: 0 }} />
        <View accessibilityViewIsModal style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: tokens.borderWidth.strong, maxHeight: '80%', padding: tokens.space[4] }}>
          <Text accessibilityRole="header" style={{ color: colors.text, fontSize: tokens.fontSize.xl, fontWeight: blackWeight, marginBottom: tokens.space[3], textTransform: 'uppercase' }}>{label}</Text>
          <ScrollView>{options.map(option => <Pressable key={option.value} accessibilityRole="radio" accessibilityLabel={option.label} accessibilityState={{ selected: value === option.value }} onPress={() => { onValueChange(option.value); setOpen(false); }} style={{ backgroundColor: value === option.value ? colors.surfaceRaised : colors.surface, borderBottomColor: colors.border, borderBottomWidth: tokens.borderWidth.sm, minHeight: tokens.componentSize.md, justifyContent: 'center', paddingHorizontal: tokens.space[3] }}><Text style={{ color: colors.text, fontSize: tokens.fontSize.sm, fontWeight: value === option.value ? blackWeight : boldWeight }}>{option.label}</Text></Pressable>)}</ScrollView>
          <Pressable accessibilityRole="button" accessibilityLabel="Cancel selection" onPress={() => setOpen(false)} style={{ alignSelf: 'flex-end', marginTop: tokens.space[3], padding: tokens.space[2] }}><Text style={{ color: colors.text, fontSize: tokens.fontSize.sm, fontWeight: blackWeight }}>CANCEL</Text></Pressable>
        </View>
      </View>
    </Modal>
  </View>;
}

