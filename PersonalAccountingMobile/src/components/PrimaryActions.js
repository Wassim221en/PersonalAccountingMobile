import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fontFamily, radius, spacing, typography } from '../theme';

const ACTIONS = [
  { key: 'send', icon: 'arrow-upward', label: 'إرسال', color: colors.tertiary, bg: 'rgba(103, 2, 17, 0.3)' },
  { key: 'receive', icon: 'arrow-downward', label: 'استلام', color: colors.secondary, bg: 'rgba(0, 165, 114, 0.2)' },
  { key: 'add', icon: 'add-circle-outline', label: 'إضافة', color: colors.primary, bg: 'rgba(190, 198, 224, 0.15)' },
  { key: 'history', icon: 'history', label: 'السجل', color: colors.primary, bg: 'rgba(190, 198, 224, 0.15)' },
];

export default function PrimaryActions({ onPress }) {
  return (
    <View style={styles.row}>
      {ACTIONS.map((action) => (
        <Pressable
          key={action.key}
          onPress={() => onPress?.(action.key)}
          style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
        >
          <View style={[styles.iconWrap, { backgroundColor: action.bg }]}>
            <MaterialIcons name={action.icon} size={22} color={action.color} />
          </View>
          <Text style={styles.label}>{action.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.containerMargin,
  },
  item: {
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  itemPressed: { opacity: 0.7 },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.white05,
  },
  label: {
    ...typography.labelSm,
    fontFamily: fontFamily.medium,
    color: colors.onSurfaceVariant,
  },
});
