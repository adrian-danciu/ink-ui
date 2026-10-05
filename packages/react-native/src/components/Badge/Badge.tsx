import { Text, View } from 'react-native';
import { tokens, type AccentName } from '@ui-library/tokens';
import { useTheme, useAccent, blackWeight } from '../../theme';

export interface BadgeProps {
  children: string;
  tone?: 'accent' | 'neutral' | 'success' | 'danger';
  accent?: AccentName;
}

export function Badge({ children, tone = 'accent', accent }: BadgeProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  const backgroundColor = tone === 'accent' ? selectedAccent.base : tone === 'success' ? colors.success : tone === 'danger' ? colors.danger : colors.surfaceRaised;
  const color = tone === 'accent' ? selectedAccent.on : tone === 'success' ? colors.successText : tone === 'danger' ? colors.dangerText : colors.text;
  return <View style={{ alignSelf: 'flex-start', backgroundColor, borderColor: colors.border, borderWidth: tokens.borderWidth.sm, borderRadius: tokens.radius.sm, paddingHorizontal: tokens.space[2], paddingVertical: tokens.space[1] }}>
    <Text style={{ color, fontSize: tokens.fontSize.xs, fontWeight: blackWeight, letterSpacing: tokens.letterSpacing.wide, lineHeight: tokens.lineHeight.caption, textTransform: 'uppercase' }}>{children}</Text>
  </View>;
}

