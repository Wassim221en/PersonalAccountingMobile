import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fontFamily, radius, spacing, typography } from '../theme';

// Generic bottom-sheet single-select picker.
// `items` = [{ value, label, icon?, subtitle? }]
export default function SelectionModal({
  visible,
  title,
  items = [],
  selectedValue,
  onSelect,
  onClose,
  emptyText = 'لا توجد عناصر',
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Pressable onPress={onClose} hitSlop={8} style={styles.closeBtn}>
              <MaterialIcons name="close" size={22} color={colors.onSurfaceVariant} />
            </Pressable>
            <Text style={styles.title}>{title}</Text>
          </View>

          {items.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>{emptyText}</Text>
            </View>
          ) : (
            <FlatList
              data={items}
              keyExtractor={(item) => String(item.value)}
              ItemSeparatorComponent={() => <View style={styles.divider} />}
              renderItem={({ item }) => {
                const active = item.value === selectedValue;
                return (
                  <Pressable
                    onPress={() => {
                      onSelect?.(item.value, item);
                      onClose?.();
                    }}
                    style={({ pressed }) => [
                      styles.row,
                      pressed && { backgroundColor: colors.surfaceContainerHigh },
                    ]}
                  >
                    {active && (
                      <MaterialIcons name="check" size={20} color={colors.secondary} />
                    )}
                    <View style={styles.rowMain}>
                      <View style={styles.rowText}>
                        <Text style={styles.rowLabel}>{item.label}</Text>
                        {item.subtitle && (
                          <Text style={styles.rowSubtitle}>{item.subtitle}</Text>
                        )}
                      </View>
                      {item.icon && (
                        <View style={styles.iconWrap}>
                          <MaterialIcons
                            name={item.icon}
                            size={20}
                            color={colors.onSurfaceVariant}
                          />
                        </View>
                      )}
                    </View>
                  </Pressable>
                );
              }}
              style={{ maxHeight: 400 }}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.surfaceContainerLow,
    borderTopLeftRadius: radius['3xl'],
    borderTopRightRadius: radius['3xl'],
    paddingHorizontal: spacing.stackLg,
    paddingTop: spacing.stackLg,
    paddingBottom: spacing.md,
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeBtn: { padding: spacing.xs },
  title: { ...typography.headlineSm, fontFamily: fontFamily.bold, color: colors.onSurface },
  empty: { alignItems: 'center', paddingVertical: spacing.xl },
  emptyText: { ...typography.bodyMd, fontFamily: fontFamily.regular, color: colors.onSurfaceVariant },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    gap: spacing.md,
  },
  rowMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  rowText: { flex: 1, alignItems: 'flex-end' },
  rowLabel: { ...typography.bodyLg, fontFamily: fontFamily.medium, color: colors.onSurface },
  rowSubtitle: {
    ...typography.labelSm,
    fontFamily: fontFamily.regular,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  iconWrap: {
    width: 36, height: 36, borderRadius: radius.md,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center', justifyContent: 'center',
  },
  divider: { height: 1, backgroundColor: colors.white05 },
});
