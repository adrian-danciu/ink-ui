import { Text, View } from 'react-native';
import { accents, tokens } from '@ui-library/tokens';
import { useTheme, blackWeight } from '../../theme';

export interface AlertProps {
  title: string;
  description?: string;
  tone?: 'info' | 'success' | 'warning' | 'danger';
}

export function Alert({ title, description, tone = 'info' }: AlertProps) {
  const colors = useTheme();
  const accent = tone === 'warning' ? accents.yellow : accents.turquoise;
  const backgroundColor = tone === 'success' ? colors.success : tone === 'danger' ? colors.danger : accent.base;
  const color = tone === 'success' ? colors.successText : tone === 'danger' ? colors.dangerText : accent.on;
  const offset = tokens.shadowOffset.sm;
  return <View style={{ marginBottom: offset, marginRight: offset }}>
    <View pointerEvents="none" style={{ backgroundColor: colors.shadow, borderRadius: tokens.radius.sm, bottom: -offset, left: offset, position: 'absolute', right: -offset, top: offset }} />
    <View accessible accessibilityLabel={[title, description].filter(Boolean).join('. ')} style={{ backgroundColor, borderColor: colors.border, borderRadius: tokens.radius.sm, borderWidth: tokens.borderWidth.strong, gap: tokens.space[2], paddingHorizontal: tokens.space[4], paddingVertical: tokens.space[3] }}>
      <Text style={{ color, fontSize: tokens.fontSize.sm, fontWeight: blackWeight, letterSpacing: tokens.letterSpacing.wide, textTransform: 'uppercase' }}>{title}</Text>
      {description && <Text style={{ color, fontSize: tokens.fontSize.sm, lineHeight: tokens.lineHeight.body }}>{description}</Text>}
    </View>
  </View>;
}

