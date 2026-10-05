import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { tokens, type AccentName } from '@ui-library/tokens';
import { useTheme, useAccent, blackWeight } from '../../theme';

export interface AccordionProps {
  items: readonly { title: string; value: string; content: React.ReactNode }[];
  value: string | null;
  onValueChange: (value: string | null) => void;
  accent?: AccentName;
}

export function Accordion({ items, value, onValueChange, accent }: AccordionProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  return <View style={{ borderColor: colors.border, borderWidth: tokens.borderWidth.md }}>
    {items.map((item, index) => {
      const open = value === item.value;
      return <View key={item.value} style={{ borderTopColor: colors.border, borderTopWidth: index ? tokens.borderWidth.md : tokens.borderWidth.none }}>
        <Pressable accessibilityRole="button" accessibilityLabel={item.title} accessibilityState={{ expanded: open }} onPress={() => onValueChange(open ? null : item.value)} style={{ alignItems: 'center', backgroundColor: open ? selectedAccent.base : colors.surface, flexDirection: 'row', justifyContent: 'space-between', minHeight: tokens.componentSize.md, paddingHorizontal: tokens.space[4], paddingVertical: tokens.space[3] }}>
          <Text style={{ color: open ? selectedAccent.on : colors.text, fontSize: tokens.fontSize.sm, fontWeight: blackWeight, letterSpacing: tokens.letterSpacing.wide, textTransform: 'uppercase' }}>{item.title}</Text>
          <Text style={{ color: open ? selectedAccent.on : colors.text, fontSize: tokens.fontSize.lg, fontWeight: blackWeight }}>{open ? '−' : '+'}</Text>
        </Pressable>
        {open && <View style={{ backgroundColor: colors.surface, padding: tokens.space[4] }}>{item.content}</View>}
      </View>;
    })}
  </View>;
}

