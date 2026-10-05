import * as React from 'react';
import { Pressable, Text, View, StyleProp, type PressableProps, type ViewStyle } from 'react-native';
import { tokens, type AccentName } from '@ui-library/tokens';
import { useTheme, useAccent, blackWeight } from '../../theme';

export interface IconButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  label: string;
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  accent?: AccentName;
  style?: StyleProp<ViewStyle>;
}

export function IconButton({ label, icon, size = 'md', variant = 'secondary', accent, style, disabled, ...props }: IconButtonProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  const offset = tokens.shadowOffset.md;
  return <View style={{ alignSelf: 'flex-start', marginBottom: offset, marginRight: offset }}>
    <View pointerEvents="none" style={{ backgroundColor: colors.shadow, bottom: -offset, left: offset, position: 'absolute', right: -offset, top: offset }} />
    <Pressable {...props} accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ disabled: !!disabled }} disabled={disabled} style={({ pressed }) => [{ alignItems: 'center', backgroundColor: variant === 'primary' ? selectedAccent.base : colors.surface, borderColor: colors.border, borderRadius: tokens.radius.sm, borderWidth: tokens.borderWidth.md, height: tokens.componentSize[size], justifyContent: 'center', opacity: disabled ? tokens.opacity.disabled : tokens.opacity.default, transform: pressed && !disabled ? [{ translateX: offset }, { translateY: offset }] : [], width: tokens.componentSize[size] }, style]}>{typeof icon === 'string' || typeof icon === 'number' ? <Text style={{ color: variant === 'primary' ? selectedAccent.on : colors.text, fontSize: tokens.fontSize.lg, fontWeight: blackWeight }}>{icon}</Text> : icon}</Pressable>
  </View>;
}

