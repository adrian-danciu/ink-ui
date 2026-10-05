import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { tokens, type AccentName } from '@ui-library/tokens';
import { useTheme, useAccent, blackWeight } from '../../theme';

export interface TabsProps {
  label: string;
  tabs: readonly { label: string; value: string; content: React.ReactNode }[];
  value: string;
  onValueChange: (value: string) => void;
  accent?: AccentName;
}

export function Tabs({ label, tabs, value, onValueChange, accent }: TabsProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  const selected = tabs.find(tab => tab.value === value);
  return <View>
    <View accessibilityLabel={label} style={{ borderBottomColor: colors.border, borderBottomWidth: tokens.borderWidth.md, flexDirection: 'row', flexWrap: 'wrap', gap: tokens.space[1] }}>
      {tabs.map(tab => {
        const active = tab.value === value;
        return <Pressable key={tab.value} accessibilityRole="tab" accessibilityLabel={tab.label} accessibilityState={{ selected: active }} onPress={() => onValueChange(tab.value)} style={{ backgroundColor: active ? selectedAccent.base : colors.surface, borderColor: colors.border, borderWidth: tokens.borderWidth.md, minHeight: tokens.componentSize.md, justifyContent: 'center', paddingHorizontal: tokens.space[3], paddingVertical: tokens.space[2] }}>
          <Text style={{ color: active ? selectedAccent.on : colors.text, fontSize: tokens.fontSize.sm, fontWeight: blackWeight, letterSpacing: tokens.letterSpacing.wide, textTransform: 'uppercase' }}>{tab.label}</Text>
        </Pressable>;
      })}
    </View>
    {selected && <View style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: tokens.borderWidth.md, borderTopWidth: tokens.borderWidth.none, padding: tokens.space[4] }}>{selected.content}</View>}
  </View>;
}

