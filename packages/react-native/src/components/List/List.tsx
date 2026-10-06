import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { tokens, type AccentName } from '@adrian-danciu/ink-ui-tokens';
import { blackWeight, useAccent, useTheme } from '../../theme';

export interface ListItem {
  id: string;
  title: string;
  description?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  disabled?: boolean;
}
export interface ListProps {
  items: readonly ListItem[];
  selectedId?: string;
  onItemSelect?: (id: string) => void;
  accent?: AccentName;
}

export function List({ items, selectedId, onItemSelect, accent }: ListProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  return <View style={{ borderColor: colors.border, borderRadius: tokens.radius.sm, borderWidth: tokens.borderWidth.md, overflow: 'hidden' }}>
    {items.map((item, index) => {
      const selected = selectedId === item.id;
      const content = <>
        {item.leading && <View style={{ marginRight: tokens.space[3] }}>{item.leading}</View>}
        <View style={{ flex: 1, gap: tokens.space[1] }}>
          <Text style={{ color: selected ? selectedAccent.on : colors.text, fontSize: tokens.fontSize.sm, fontWeight: blackWeight }}>{item.title}</Text>
          {item.description && <Text style={{ color: selected ? selectedAccent.on : colors.textMuted, fontSize: tokens.fontSize.xs, lineHeight: tokens.lineHeight.caption }}>{item.description}</Text>}
        </View>
        {item.trailing && <View style={{ marginLeft: tokens.space[3] }}>{item.trailing}</View>}
      </>;
      const style = { alignItems: 'center' as const, backgroundColor: selected ? selectedAccent.base : colors.surface, borderTopColor: colors.border, borderTopWidth: index ? tokens.borderWidth.sm : 0, flexDirection: 'row' as const, minHeight: tokens.componentSize.lg, padding: tokens.space[3], opacity: item.disabled ? tokens.opacity.disabled : tokens.opacity.default };
      return onItemSelect
        ? <Pressable key={item.id} accessibilityRole="button" accessibilityState={{ disabled: item.disabled, selected }} disabled={item.disabled} onPress={() => onItemSelect(item.id)} style={style}>{content}</Pressable>
        : <View key={item.id} style={style}>{content}</View>;
    })}
  </View>;
}
