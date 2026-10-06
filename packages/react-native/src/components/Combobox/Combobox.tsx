import * as React from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { tokens, type AccentName } from '@adrian-danciu/ink-ui-tokens';
import { blackWeight, useAccent, useTheme } from '../../theme';

export interface ComboboxOption { label: string; value: string; disabled?: boolean }
export interface ComboboxProps {
  label: string;
  options: readonly ComboboxOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  accent?: AccentName;
}

export function Combobox({ label, options, value, onValueChange, placeholder = 'Search options', emptyMessage = 'No matches', disabled = false, accent }: ComboboxProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const selected = options.find(option => option.value === value);
  const filtered = options.filter(option => option.label.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  return <View style={{ gap: tokens.space[2] }}>
    <Text style={{ color: colors.text, fontSize: tokens.fontSize.sm, fontWeight: blackWeight, textTransform: 'uppercase' }}>{label}</Text>
    <Pressable accessibilityRole="button" accessibilityLabel={`${label}, ${selected?.label ?? placeholder}`} accessibilityState={{ disabled, expanded: open }} disabled={disabled} onPress={() => { setQuery(''); setOpen(true); }} style={{ backgroundColor: colors.surface, borderColor: colors.border, borderRadius: tokens.radius.sm, borderWidth: tokens.borderWidth.md, justifyContent: 'center', minHeight: tokens.componentSize.md, opacity: disabled ? tokens.opacity.disabled : tokens.opacity.default, paddingHorizontal: tokens.space[3] }}><Text style={{ color: selected ? colors.text : colors.textMuted, fontSize: tokens.fontSize.md }}>{selected?.label ?? placeholder}</Text></Pressable>
    <Modal animationType="fade" transparent visible={open} onRequestClose={() => setOpen(false)}>
      <View style={{ flex: 1, justifyContent: 'center', padding: tokens.space[5] }}>
        <Pressable accessibilityLabel="Close options" onPress={() => setOpen(false)} style={{ backgroundColor: colors.shadow, bottom: 0, left: 0, opacity: tokens.opacity.overlay, position: 'absolute', right: 0, top: 0 }} />
        <View accessibilityViewIsModal style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: tokens.borderWidth.strong, maxHeight: '80%', padding: tokens.space[4] }}>
          <Text accessibilityRole="header" style={{ color: colors.text, fontSize: tokens.fontSize.lg, fontWeight: blackWeight, marginBottom: tokens.space[3], textTransform: 'uppercase' }}>{label}</Text>
          <TextInput autoFocus accessibilityLabel={`Search ${label}`} placeholder={placeholder} placeholderTextColor={colors.textMuted} value={query} onChangeText={setQuery} style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: tokens.borderWidth.md, color: colors.text, fontSize: tokens.fontSize.md, minHeight: tokens.componentSize.md, paddingHorizontal: tokens.space[3] }} />
          <ScrollView keyboardShouldPersistTaps="handled" style={{ marginTop: tokens.space[3] }}>
            {filtered.length ? filtered.map(option => <Pressable key={option.value} accessibilityRole="button" accessibilityLabel={option.label} accessibilityState={{ disabled: option.disabled, selected: option.value === value }} disabled={option.disabled} onPress={() => { onValueChange(option.value); setOpen(false); }} style={{ backgroundColor: option.value === value ? selectedAccent.base : colors.surface, borderBottomColor: colors.border, borderBottomWidth: tokens.borderWidth.sm, minHeight: tokens.componentSize.md, opacity: option.disabled ? tokens.opacity.disabled : tokens.opacity.default, padding: tokens.space[3] }}><Text style={{ color: option.value === value ? selectedAccent.on : colors.text, fontSize: tokens.fontSize.sm, fontWeight: blackWeight }}>{option.label}</Text></Pressable>) : <Text style={{ color: colors.textMuted, fontSize: tokens.fontSize.sm, padding: tokens.space[3] }}>{emptyMessage}</Text>}
          </ScrollView>
          <Pressable accessibilityRole="button" accessibilityLabel="Close options" onPress={() => setOpen(false)} style={{ alignSelf: 'flex-end', marginTop: tokens.space[3], padding: tokens.space[2] }}><Text style={{ color: colors.text, fontSize: tokens.fontSize.sm, fontWeight: blackWeight }}>CLOSE</Text></Pressable>
        </View>
      </View>
    </Modal>
  </View>;
}
