import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import {
  addCategory,
  deleteCategory,
  getCategories,
  modifyCategory,
} from '../api/categories';
import CategoryFormModal from '../components/CategoryFormModal';
import CategoryListItem from '../components/CategoryListItem';
import SettingsHeader from '../components/SettingsHeader';
import { colors, fontFamily, radius, spacing, typography } from '../theme';

function confirmDelete(name, onConfirm) {
  const title = 'حذف الفئة';
  const message = `هل تريد حذف الفئة "${name}"؟`;
  if (Platform.OS === 'web') {
    // eslint-disable-next-line no-undef
    if (typeof window !== 'undefined' && window.confirm(`${title}\n${message}`)) onConfirm();
    return;
  }
  Alert.alert(title, message, [
    { text: 'إلغاء', style: 'cancel' },
    { text: 'حذف', style: 'destructive', onPress: onConfirm },
  ]);
}

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formDefaultType, setFormDefaultType] = useState('Expense');

  const load = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data?.categories ?? []);
    } catch (e) {
      console.warn('Failed to load categories:', e?.message);
      setCategories([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = (type) => {
    setEditing(null);
    setFormDefaultType(type);
    setFormVisible(true);
  };

  const openEdit = (category) => {
    setEditing(category);
    setFormVisible(true);
  };

  const handleSubmit = async ({ name, type }) => {
    if (editing) {
      await modifyCategory({ id: editing.id, name, type });
    } else {
      await addCategory({ name, type });
    }
    await load(true);
  };

  const handleDelete = (category) => {
    confirmDelete(category.name, async () => {
      try {
        await deleteCategory(category.id);
        await load(true);
      } catch (e) {
        Alert.alert('خطأ', e?.message ?? 'تعذّر حذف الفئة');
      }
    });
  };

  const expenses = categories.filter((c) => c.type === 'Expense');
  const incomes = categories.filter((c) => c.type === 'Income');

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <SettingsHeader />

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.secondary} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => load(true)}
              tintColor={colors.secondary}
              colors={[colors.secondary]}
            />
          }
        >
          <CategorySection
            title="فئات المصاريف"
            items={expenses}
            emptyText="لا توجد فئات مصاريف بعد"
            onAdd={() => openAdd('Expense')}
            onEdit={openEdit}
            onDelete={handleDelete}
          />

          <CategorySection
            title="فئات الدخل"
            items={incomes}
            emptyText="لا توجد فئات دخل بعد"
            onAdd={() => openAdd('Income')}
            onEdit={openEdit}
            onDelete={handleDelete}
          />

          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>نصيحة ذكية</Text>
            <Text style={styles.tipBody}>
              تنظيم فئاتك يساعد المحرك الذكي على تقديم تحليلات أدق لمصاريفك الشهرية وتوفير حتى ٢٠٪ من دخلك.
            </Text>
          </View>

          <View style={{ height: spacing.xl }} />
        </ScrollView>
      )}

      <CategoryFormModal
        visible={formVisible}
        initialCategory={editing}
        defaultType={formDefaultType}
        onSubmit={handleSubmit}
        onClose={() => setFormVisible(false)}
      />
    </View>
  );
}

function CategorySection({ title, items, emptyText, onAdd, onEdit, onDelete }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Pressable
          onPress={onAdd}
          style={({ pressed }) => [styles.addBtn, pressed && { opacity: 0.85 }]}
        >
          <MaterialIcons name="add" size={18} color={colors.onSecondary} />
          <Text style={styles.addBtnText}>إضافة فئة</Text>
        </Pressable>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyText}>{emptyText}</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {items.map((cat) => (
            <CategoryListItem
              key={cat.id}
              category={cat}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: {
    paddingHorizontal: spacing.containerMargin,
    paddingTop: spacing.stackLg,
    gap: spacing.stackLg,
  },
  section: { gap: spacing.gutter },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    ...typography.headlineSm,
    fontFamily: fontFamily.semibold,
    color: colors.onSurface,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: spacing.gutter,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
  },
  addBtnText: {
    ...typography.labelLg,
    fontFamily: fontFamily.bold,
    color: colors.onSecondary,
  },
  list: { gap: spacing.md },
  emptyWrap: { alignItems: 'center', paddingVertical: spacing.lg },
  emptyText: {
    ...typography.bodyMd,
    fontFamily: fontFamily.regular,
    color: colors.onSurfaceVariant,
  },
  tipCard: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.white05,
    padding: spacing.stackLg,
    alignItems: 'center',
    gap: spacing.sm,
  },
  tipTitle: {
    ...typography.bodyLg,
    fontFamily: fontFamily.bold,
    color: colors.onSurface,
  },
  tipBody: {
    ...typography.bodyMd,
    fontFamily: fontFamily.regular,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
  },
});
