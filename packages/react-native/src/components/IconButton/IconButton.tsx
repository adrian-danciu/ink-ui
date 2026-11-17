import * as React from 'react';
import { Animated, Pressable, Text, View, StyleProp, type PressableProps, type ViewStyle } from 'react-native';
import { tokens, type AccentName } from '@adrian-danciu/ink-ui-tokens';
import { useTheme, useAccent, useMotion, blackWeight } from '../../theme';

export interface IconButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  label: string;
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  accent?: AccentName;
  motion?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function IconButton({ label, icon, size = 'md', variant = 'secondary', accent, motion, style, disabled, onPressIn, onPressOut, ...props }: IconButtonProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  const motionEnabled = useMotion(motion);
  const offset = tokens.shadowOffset.md;
  const travel = React.useRef(new Animated.Value(0)).current;
  function move(toValue: number) {
    travel.stopAnimation();
    Animated.timing(travel, { toValue, duration: motionEnabled ? tokens.motionDuration.fast : 0, useNativeDriver: true }).start();
  }
  React.useEffect(() => { if (!motionEnabled) move(0); }, [motionEnabled]);
  return <View style={{ alignSelf: 'flex-start', marginBottom: offset, marginRight: offset }}>
    <View pointerEvents="none" style={{ backgroundColor: colors.shadow, bottom: -offset, left: offset, position: 'absolute', right: -offset, top: offset }} />
    <Animated.View style={{ transform: [{ translateX: travel }, { translateY: travel }] }}><Pressable {...props} onPressIn={event => { if (!disabled) move(offset); onPressIn?.(event); }} onPressOut={event => { move(0); onPressOut?.(event); }} accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ disabled: !!disabled }} disabled={disabled} style={[{ alignItems: 'center', backgroundColor: variant === 'primary' ? selectedAccent.base : colors.surface, borderColor: colors.border, borderRadius: tokens.radius.sm, borderWidth: tokens.borderWidth.md, height: tokens.componentSize[size], justifyContent: 'center', opacity: disabled ? tokens.opacity.disabled : tokens.opacity.default, width: tokens.componentSize[size] }, style]}>{typeof icon === 'string' || typeof icon === 'number' ? <Text style={{ color: variant === 'primary' ? selectedAccent.on : colors.text, fontSize: tokens.fontSize.lg, fontWeight: blackWeight }}>{icon}</Text> : icon}</Pressable></Animated.View>
  </View>;
}

