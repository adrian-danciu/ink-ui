import { Pressable, Text, View } from 'react-native';
import { accents, tokens } from '@ui-library/tokens';
import { useTheme, blackWeight } from '../../theme';

export interface ToastProps {
  open: boolean;
  title: string;
  description?: string;
  tone?: 'info' | 'success' | 'warning' | 'danger';
  onDismiss: () => void;
}

export function Toast({ open, title, description, tone = 'info', onDismiss }: ToastProps) {
  const colors = useTheme();
  if (!open) return null;
  const accent = tone === 'warning' ? accents.yellow : accents.turquoise;
  const backgroundColor = tone === 'success' ? colors.success : tone === 'danger' ? colors.danger : accent.base;
  const color = tone === 'success' ? colors.successText : tone === 'danger' ? colors.dangerText : accent.on;
  const offset = tokens.shadowOffset.sm;
  return <View style={{ marginBottom: offset, marginRight: offset }}>
    <View pointerEvents="none" style={{ backgroundColor: colors.shadow, bottom: -offset, left: offset, position: 'absolute', right: -offset, top: offset }} />
    <View accessibilityLiveRegion={tone === 'danger' ? 'assertive' : 'polite'} style={{ alignItems: 'flex-start', backgroundColor, borderColor: colors.border, borderWidth: tokens.borderWidth.strong, flexDirection: 'row', gap: tokens.space[3], justifyContent: 'space-between', padding: tokens.space[3] }}>
      <View style={{ flex: 1, gap: tokens.space[1] }}><Text style={{ color, fontSize: tokens.fontSize.sm, fontWeight: blackWeight, letterSpacing: tokens.letterSpacing.wide, textTransform: 'uppercase' }}>{title}</Text>{description && <Text style={{ color, fontSize: tokens.fontSize.sm, lineHeight: tokens.lineHeight.body }}>{description}</Text>}</View>
      <Pressable accessibilityRole="button" accessibilityLabel="Dismiss notification" onPress={onDismiss} style={{ alignItems: 'center', borderColor: colors.border, borderWidth: tokens.borderWidth.md, height: tokens.componentSize.sm, justifyContent: 'center', width: tokens.componentSize.sm }}><Text style={{ color, fontSize: tokens.fontSize.lg, fontWeight: blackWeight }}>×</Text></Pressable>
    </View>
  </View>;
}

