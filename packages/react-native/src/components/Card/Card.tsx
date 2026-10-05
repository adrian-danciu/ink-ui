import * as React from 'react';
import { Text, View, StyleProp, type ViewStyle } from 'react-native';
import { tokens, type AccentName } from '@ui-library/tokens';
import { useTheme, useAccent, blackWeight, boldWeight } from '../../theme';

export interface CardProps {
  title: string;
  eyebrow?: string;
  description?: string;
  accent?: AccentName;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Card({ title, eyebrow, description, accent, children, style }: CardProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  const offset = tokens.shadowOffset.md;
  return <View style={{ marginRight: offset, marginBottom: offset }}>
    <View pointerEvents="none" style={{ position: 'absolute', top: offset, left: offset, right: -offset, bottom: -offset, backgroundColor: colors.shadow, borderRadius: tokens.radius.sm }} />
    <View style={[{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: tokens.borderWidth.md, borderRadius: tokens.radius.sm, padding: tokens.space[4] }, style]}>
      <View style={{ backgroundColor: selectedAccent.base, height: tokens.space[1], marginBottom: tokens.space[4] }} />
      {eyebrow && <Text style={{ color: colors.textMuted, fontSize: tokens.fontSize.caption, fontWeight: boldWeight, letterSpacing: tokens.letterSpacing.wide, marginBottom: tokens.space[2], textTransform: 'uppercase' }}>{eyebrow}</Text>}
      <Text style={{ color: colors.text, fontSize: tokens.fontSize.xl, fontWeight: blackWeight, letterSpacing: tokens.letterSpacing.tight, lineHeight: tokens.lineHeight.title, textTransform: 'uppercase' }}>{title}</Text>
      {description && <Text style={{ color: colors.textMuted, fontSize: tokens.fontSize.sm, lineHeight: tokens.lineHeight.body, marginTop: tokens.space[2] }}>{description}</Text>}
      {children && <View style={{ marginTop: tokens.space[4] }}>{children}</View>}
    </View>
  </View>;
}

