import { ScrollView, Text, View } from 'react-native';
import { tokens } from '@adrian-danciu/ink-ui-tokens';
import { blackWeight, useTheme } from '../../theme';

export interface TableColumn { key: string; label: string; align?: 'left' | 'right' }
export interface TableRow { id: string; cells: Record<string, string | number> }
export interface TableProps {
  columns: readonly TableColumn[];
  rows: readonly TableRow[];
  caption?: string;
}

export function Table({ columns, rows, caption }: TableProps) {
  const colors = useTheme();
  return <View>
    {caption && <Text style={{ color: colors.textMuted, fontSize: tokens.fontSize.xs, marginBottom: tokens.space[2] }}>{caption}</Text>}
    <ScrollView horizontal accessibilityLabel={caption ?? 'Data table'}>
      <View style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: tokens.borderWidth.md }}>
        <View style={{ backgroundColor: colors.surfaceRaised, flexDirection: 'row' }}>
          {columns.map(column => <Text key={column.key} style={{ color: colors.text, fontSize: tokens.fontSize.xs, fontWeight: blackWeight, padding: tokens.space[3], textAlign: column.align ?? 'left', textTransform: 'uppercase', width: tokens.componentSize.lg * 3 }}>{column.label}</Text>)}
        </View>
        {rows.map(row => <View key={row.id} style={{ borderTopColor: colors.border, borderTopWidth: tokens.borderWidth.sm, flexDirection: 'row' }}>
          {columns.map(column => <Text key={column.key} style={{ color: colors.text, fontSize: tokens.fontSize.sm, padding: tokens.space[3], textAlign: column.align ?? 'left', width: tokens.componentSize.lg * 3 }}>{row.cells[column.key] ?? '—'}</Text>)}
        </View>)}
      </View>
    </ScrollView>
  </View>;
}
