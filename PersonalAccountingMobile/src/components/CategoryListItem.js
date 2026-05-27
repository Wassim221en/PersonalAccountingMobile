import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fontFamily, radius, spacing, typography } from '../theme';
import { iconForCategory } from '../utils/categoryIcons';

export default function CategoryListItem({ category, onEdit, onDelete }) {
  const { name, type } = category;
  const isIncome = type === 'Income';
  const iconColor = isIncome ? colors.secondary : colors.tertiary;
  const iconBg = isIncome ? 'rgba(0,165,114,0.18)' : 'rgba(103,2,17,0.30)';

  return (
    <View style={styles.row}>
      <View style={styles.actions}>
        <Pressable
          onPress={() => onDelete?.(category)}
          hitSlop={8}
          style={({ pressed }) => [styles.actionBtn, pressed && styles.pressed]}
        >
          <MaterialIcons name="delete-outline" size={22} color={colors.onSurfaceVariant} />
        </Pressable>
        <Pressable
          onPress={() => onEdit?.(category)}
          hitSlop={8}
          style={({ pressed }) => [styles.actionBtn, pressed && styles.pressed]}
        >
          <MaterialIcons name="edit" size={22} color={colors.onSurfaceVariant} />
        </Pressable>
      </View>

      <View style={styles.main}>
        <View style={styles.textBlock}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <Text style={styles.subtitle}>{isIncome ? 'دخل' : 'مصروف'}</Text>
        </View>
        <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
          <MaterialIcons name={iconForCategory(name, type)} size={22} color={iconColor} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainer,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.white05,
    paddingHorizontal: spacing.gutter,
    paddingVertical: spacing.md,
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
    justifyContent: 'flex-end',
  },
  textBlock: { alignItems: 'flex-end' },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    ...typography.bodyLg,
    fontFamily: fontFamily.medium,
    color: colors.onSurface,
  },
  subtitle: {
    ...typography.labelSm,
    fontFamily: fontFamily.regular,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  actionBtn: {
    padding: spacing.sm,
    borderRadius: radius.full,
  },
  pressed: { backgroundColor: colors.surfaceContainerHigh },
});
