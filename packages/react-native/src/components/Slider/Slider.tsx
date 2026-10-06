import * as React from 'react';
import { Text, View, type GestureResponderEvent } from 'react-native';
import { tokens, type AccentName } from '@adrian-danciu/ink-ui-tokens';
import { blackWeight, useAccent, useTheme } from '../../theme';

export interface SliderProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  accent?: AccentName;
}

export function Slider({ label, value, onValueChange, min = 0, max = 100, step = 1, disabled = false, accent }: SliderProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  const [trackWidth, setTrackWidth] = React.useState(1);
  const low = Number.isFinite(min) ? min : 0;
  const high = Number.isFinite(max) && max > low ? max : low + 100;
  const increment = Number.isFinite(step) && step > 0 ? step : 1;
  const current = Number.isFinite(value) ? Math.min(high, Math.max(low, value)) : low;
  const percent = (current - low) / (high - low);
  function updateFromPosition(event: GestureResponderEvent) {
    if (disabled) return;
    const fraction = Math.min(1, Math.max(0, event.nativeEvent.locationX / trackWidth));
    const snapped = low + Math.round(((fraction * (high - low)) / increment)) * increment;
    onValueChange(Math.min(high, Math.max(low, Number(snapped.toFixed(6)))));
  }
  return <View style={{ gap: tokens.space[3], opacity: disabled ? tokens.opacity.disabled : tokens.opacity.default }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={{ color: colors.text, fontSize: tokens.fontSize.sm, fontWeight: blackWeight }}>{label}</Text><Text style={{ color: colors.text, fontSize: tokens.fontSize.sm, fontWeight: blackWeight }}>{current}</Text></View>
    <View accessible accessibilityRole="adjustable" accessibilityLabel={label} accessibilityValue={{ min: low, max: high, now: current }} accessibilityState={{ disabled }} accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]} onAccessibilityAction={event => { if (disabled) return; const delta = event.nativeEvent.actionName === 'increment' ? increment : -increment; onValueChange(Math.min(high, Math.max(low, Number((current + delta).toFixed(6))))); }} onLayout={event => setTrackWidth(Math.max(1, event.nativeEvent.layout.width))} onStartShouldSetResponder={() => !disabled} onMoveShouldSetResponder={() => !disabled} onResponderGrant={updateFromPosition} onResponderMove={updateFromPosition} style={{ height: tokens.componentSize.md, justifyContent: 'center' }}>
      <View pointerEvents="none" style={{ backgroundColor: colors.surfaceRaised, borderColor: colors.border, borderWidth: tokens.borderWidth.md, height: tokens.controlSize.progress }}><View style={{ backgroundColor: selectedAccent.base, height: '100%', width: `${percent * 100}%` }} /></View>
      <View pointerEvents="none" style={{ backgroundColor: colors.surface, borderColor: colors.border, borderRadius: tokens.radius.sm, borderWidth: tokens.borderWidth.strong, height: tokens.componentSize.sm, left: `${percent * 100}%`, marginLeft: -tokens.componentSize.sm / 2, position: 'absolute', width: tokens.componentSize.sm }} />
    </View>
  </View>;
}
