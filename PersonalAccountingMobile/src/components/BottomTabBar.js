import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fontFamily, spacing, typography } from '../theme';

const TABS = [
  { key: 'home', icon: 'home', label: 'الرئيسية' },
  { key: 'transactions', icon: 'receipt-long', label: 'المعاملات' },
  { key: 'add', icon: 'add-circle', label: 'إضافة', fab: true },
  { key: 'analytics', icon: 'bar-chart', label: 'التحليل' },
  { key: 'settings', icon: 'settings', label: 'الإعدادات' },
];

export default function BottomTabBar({ activeTab = 'home', onTabPress }) {
  return (
    <View style={styles.bar}>
      {TABS.map((tab) => {
        const active = tab.key === activeTab;
        if (tab.fab) {
          return (
            <Pressable
              key={tab.key}
              onPress={() => onTabPress?.(tab.key)}
              style={({ pressed }) => [styles.fabBtn, pressed && { opacity: 0.8 }]}
            >
              <MaterialIcons name={tab.icon} size={32} color={colors.onSecondary} />
            </Pressable>
          );
        }
        return (
          <Pressable
            key={tab.key}
            onPress={() => onTabPress?.(tab.key)}
            style={({ pressed }) => [styles.tabItem, pressed && { opacity: 0.7 }]}
          >
            <MaterialIcons
              name={tab.icon}
              size={22}
              color={active ? colors.secondary : colors.onSurfaceVariant}
            />
            <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.surfaceContainerLow,
    borderTopWidth: 1,
    borderTopColor: colors.white05,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
    paddingVertical: 4,
  },
  tabLabel: {
    ...typography.labelSm,
    fontFamily: fontFamily.medium,
    color: colors.onSurfaceVariant,
  },
  tabLabelActive: {
    color: colors.secondary,
    fontFamily: fontFamily.bold,
  },
  fabBtn: {
    width: 56,
    height: 56,
    borderRadius: 9999,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
});
