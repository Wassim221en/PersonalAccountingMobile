import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fontFamily, radius, spacing, typography } from '../theme';

const TYPES = [
  { value: 'Expense', label: 'مصروف' },
  { value: 'Income', label: 'دخل' },
];

export default function CategoryFormModal({
  visible,
  initialCategory,
  defaultType = 'Expense',
  onSubmit,
  onClose,
}) {
  const [name, setName] = useState('');
  const [type, setType] = useState(defaultType);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (visible) {
      setName(initialCategory?.name ?? '');
      setType(initialCategory?.type ?? defaultType);
      setError(null);
    }
  }, [visible, initialCategory, defaultType]);

  const isEditing = Boolean(initialCategory);
  const title = isEditing ? 'تعديل الفئة' : 'إضافة فئة';

  const handleSubmit = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('الرجاء إدخال اسم الفئة');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({ name: trimmed, type });
      onClose?.();
    } catch (e) {
      setError(e?.message ?? 'حدث خطأ غير متوقع');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.backdrop}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Pressable onPress={onClose} hitSlop={8} style={styles.closeBtn}>
              <MaterialIcons name="close" size={22} color={colors.onSurfaceVariant} />
            </Pressable>
            <Text style={styles.title}>{title}</Text>
          </View>

          <Text style={styles.label}>اسم الفئة</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="مثال: طعام"
            placeholderTextColor={colors.onSurfaceVariant}
            style={styles.input}
            textAlign="right"
            autoFocus
          />

          <Text style={styles.label}>النوع</Text>
          <View style={styles.typeRow}>
            {TYPES.map((t) => {
              const active = t.value === type;
              return (
                <Pressable
                  key={t.value}
                  onPress={() => setType(t.value)}
                  style={[styles.typeBtn, active && styles.typeBtnActive]}
                >
                  <Text style={[styles.typeText, active && styles.typeTextActive]}>{t.label}</Text>
                </Pressable>
              );
            })}
          </View>

          {error && <Text style={styles.error}>{error}</Text>}

          <Pressable
            onPress={handleSubmit}
            disabled={submitting}
            style={({ pressed }) => [
              styles.submitBtn,
              (submitting || pressed) && { opacity: 0.85 },
            ]}
          >
            {submitting ? (
              <ActivityIndicator color={colors.onSecondary} />
            ) : (
              <Text style={styles.submitText}>{isEditing ? 'حفظ التعديلات' : 'إضافة'}</Text>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.surfaceContainerLow,
    borderTopLeftRadius: radius['3xl'],
    borderTopRightRadius: radius['3xl'],
    padding: spacing.stackLg,
    gap: spacing.md,
  },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  closeBtn: { padding: spacing.xs },
  title: { ...typography.headlineSm, fontFamily: fontFamily.bold, color: colors.onSurface },
  label: { ...typography.labelLg, fontFamily: fontFamily.medium, color: colors.onSurfaceVariant, textAlign: 'right' },
  input: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.gutter,
    paddingVertical: spacing.md,
    color: colors.onSurface,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.white05,
  },
  typeRow: { flexDirection: 'row', gap: spacing.sm },
  typeBtn: {
    flex: 1, paddingVertical: spacing.md, borderRadius: radius.lg, alignItems: 'center',
    backgroundColor: colors.surfaceContainerHigh, borderWidth: 1, borderColor: colors.white05,
  },
  typeBtnActive: { backgroundColor: 'rgba(0,165,114,0.2)', borderColor: colors.secondary },
  typeText: { ...typography.labelLg, fontFamily: fontFamily.medium, color: colors.onSurfaceVariant },
  typeTextActive: { color: colors.secondaryFixed, fontFamily: fontFamily.bold },
  error: { ...typography.labelSm, color: colors.error, textAlign: 'right' },
  submitBtn: {
    backgroundColor: colors.secondaryContainer, borderRadius: radius.full,
    paddingVertical: spacing.md, alignItems: 'center', marginTop: spacing.sm,
  },
  submitText: { ...typography.bodyMd, fontFamily: fontFamily.bold, color: colors.onSecondary },
});
