import { Pressable, Text, View, StyleProp, type PressableProps, type ViewStyle } from 'react-native';
import { tokens, type AccentName } from '@ui-library/tokens';
import { useTheme, useAccent, blackWeight } from '../../theme';

export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  children: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  accent?: AccentName;
  style?: StyleProp<ViewStyle>;
}

export function Button({ children, size = 'md', variant = 'primary', accent, style, disabled, ...props }: ButtonProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  const backgroundColor = variant === 'primary' ? selectedAccent.base : colors.surface;
  const color = variant === 'primary' ? selectedAccent.on : colors.text;
  const offset = tokens.shadowOffset.md;
  return (
    <View style={{ marginRight: offset, marginBottom: offset }}>
      <View
        pointerEvents="none"
        style={{ position: 'absolute', top: offset, left: offset, right: -offset, bottom: -offset, backgroundColor: colors.shadow, borderRadius: tokens.radius.sm }}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !!disabled }}
        disabled={disabled}
        style={({ pressed }) => [
          {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor,
            borderColor: colors.border,
            borderWidth: tokens.borderWidth.md,
            borderRadius: tokens.radius.sm,
            minHeight: tokens.componentSize[size],
            paddingHorizontal: size === 'lg' ? tokens.space[5] : tokens.space[4],
            opacity: disabled ? tokens.opacity.disabled : tokens.opacity.default,
            transform: pressed && !disabled ? [{ translateX: offset }, { translateY: offset }] : [],
          },
          style,
        ]}
        {...props}
      >
        <Text style={{ color, fontSize: size === 'lg' ? tokens.fontSize.md : tokens.fontSize.sm, fontWeight: blackWeight, letterSpacing: tokens.letterSpacing.wide, textTransform: 'uppercase' }}>
          {children}
        </Text>
      </Pressable>
    </View>
  );
}

