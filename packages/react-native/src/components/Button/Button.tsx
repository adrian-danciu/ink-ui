import * as React from 'react';
import { Animated, Pressable, Text, View, StyleProp, type PressableProps, type ViewStyle } from 'react-native';
import { tokens, type AccentName } from '@adrian-danciu/ink-ui-tokens';
import { useTheme, useAccent, useMotion, blackWeight } from '../../theme';

export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  children: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  accent?: AccentName;
  motion?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Button({ children, size = 'md', variant = 'primary', accent, motion, style, disabled, onPressIn, onPressOut, ...props }: ButtonProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  const motionEnabled = useMotion(motion);
  const backgroundColor = variant === 'primary' ? selectedAccent.base : colors.surface;
  const color = variant === 'primary' ? selectedAccent.on : colors.text;
  const offset = tokens.shadowOffset.md;
  const travel = React.useRef(new Animated.Value(0)).current;
  function move(toValue: number) {
    travel.stopAnimation();
    Animated.timing(travel, { toValue, duration: motionEnabled ? tokens.motionDuration.fast : 0, useNativeDriver: true }).start();
  }
  React.useEffect(() => { if (!motionEnabled) move(0); }, [motionEnabled]);
  return (
    <View style={{ marginRight: offset, marginBottom: offset }}>
      <View
        pointerEvents="none"
        style={{ position: 'absolute', top: offset, left: offset, right: -offset, bottom: -offset, backgroundColor: colors.shadow, borderRadius: tokens.radius.sm }}
      />
      <Animated.View style={{ transform: [{ translateX: travel }, { translateY: travel }] }}><Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !!disabled }}
        disabled={disabled}
        onPressIn={event => { if (!disabled) move(offset); onPressIn?.(event); }}
        onPressOut={event => { move(0); onPressOut?.(event); }}
        style={[
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
          },
          style,
        ]}
        {...props}
      >
        <Text style={{ color, fontSize: size === 'lg' ? tokens.fontSize.md : tokens.fontSize.sm, fontWeight: blackWeight, letterSpacing: tokens.letterSpacing.wide, textTransform: 'uppercase' }}>
          {children}
        </Text>
      </Pressable>
      </Animated.View>
    </View>
  );
}

