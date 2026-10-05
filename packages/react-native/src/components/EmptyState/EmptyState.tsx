import * as React from 'react';
import { Text, View } from 'react-native';
import { tokens, type AccentName } from '@ui-library/tokens';
import { useTheme, useAccent, blackWeight } from '../../theme';

export interface EmptyStateProps {
  title: string;
  description?: string;
  accent?: AccentName;
  children?: React.ReactNode;
}

export function EmptyState({ title, description, accent, children }: EmptyStateProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  const offset = tokens.shadowOffset.md;
  return <View style={{ marginBottom: offset, marginRight: offset }}>
    <View pointerEvents="none" style={{ backgroundColor: colors.shadow, bottom: -offset, left: offset, position: 'absolute', right: -offset, top: offset }} />
    <View style={{ alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderWidth: tokens.borderWidth.md, padding: tokens.space[6] }}>
      <View style={{ alignItems: 'center', backgroundColor: selectedAccent.base, borderColor: colors.border, borderWidth: tokens.borderWidth.md, height: tokens.controlSize.emptyMark, justifyContent: 'center', marginBottom: tokens.space[4], width: tokens.controlSize.emptyMark }}><Text style={{ color: selectedAccent.on, fontSize: tokens.fontSize['2xl'] }}>✳</Text></View>
      <Text style={{ color: colors.text, fontSize: tokens.fontSize.xl, fontWeight: blackWeight, lineHeight: tokens.lineHeight.title, textAlign: 'center', textTransform: 'uppercase' }}>{title}</Text>
      {description && <Text style={{ color: colors.textMuted, fontSize: tokens.fontSize.sm, lineHeight: tokens.lineHeight.body, marginTop: tokens.space[2], textAlign: 'center' }}>{description}</Text>}
      {children && <View style={{ marginTop: tokens.space[4] }}>{children}</View>}
    </View>
  </View>;
}

