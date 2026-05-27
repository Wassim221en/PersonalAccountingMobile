import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { getCategories } from '../api/categories';
import { addTransaction } from '../api/transactions';
import DateField from '../components/DateField';
import SelectionModal from '../components/SelectionModal';
import { colors, spacing } from '../theme';
import { damascusDateFromYmd, todayYmdInDamascus } from '../utils/damascusDate';
import { iconForCategory } from '../utils/categoryIcons';
import { styles } from './AddTransactionScreen.styles';

const TYPES = [
  { value: 'Expense', label: 'دفع' },
  { value: 'Income', label: 'استلام' },
];

const CURRENCIES = ['SYP', 'USD', 'EUR'];

export default function AddTransactionScreen({ onClose, onSaved }) {
  const insets = useSafeAreaInsets();
  const [type, setType] = useState('Expense');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('SYP');
  const [categoryId, setCategoryId] = useState(null);
  const [date, setDate] = useState(todayYmdInDamascus());
  const [note, setNote] = useState('');
  const [categories, setCategories] = useState([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const cycleCurrency = () => {
    const idx = CURRENCIES.indexOf(currency);
    setCurrency(CURRENCIES[(idx + 1) % CURRENCIES.length]);
  };

  useEffect(() => {
    let cancelled = false;
    getCategories()
      .then((res) => { if (!cancelled) setCategories(res?.categories ?? []); })
      .catch(() => { if (!cancelled) setCategories([]); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!categoryId) return;
    const cat = categories.find((c) => c.id === categoryId);
    if (cat && cat.type !== type) setCategoryId(null);
  }, [type, categoryId, categories]);

  const filteredCategories = useMemo(
    () => categories.filter((c) => c.type === type),
    [categories, type],
  );

  const selectedCategory = filteredCategories.find((c) => c.id === categoryId);

  const handleSubmit = async () => {
    setError(null);
    const numericAmount = parseFloat(String(amount).replace(',', '.'));
    if (!numericAmount || numericAmount <= 0) {
      setError('الرجاء إدخال مبلغ صحيح');
      return;
    }
    if (!categoryId) { setError('الرجاء اختيار الفئة'); return; }
    if (!date) { setError('الرجاء اختيار التاريخ'); return; }

    setSubmitting(true);
    try {
      await addTransaction({
        amount: numericAmount,
        currency,
        note: note.trim(),
        date: damascusDateFromYmd(date),
        categoryId,
      });
      onSaved?.();
      onClose?.();
    } catch (e) {
      setError(e?.message ?? 'تعذّر حفظ العملية');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.screen, { paddingTop: insets.top }]}
    >
      <View style={styles.header}>
        <Pressable
          onPress={onClose}
          hitSlop={8}
          style={({ pressed }) => [styles.closeBtn, pressed && styles.closeBtnPressed]}
        >
          <MaterialIcons name="close" size={22} color={colors.onSurface} />
        </Pressable>
        <Text style={styles.title}>إضافة عملية جديدة</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.typeToggle}>
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

        <View style={styles.amountBlock}>
          <Text style={styles.label}>المبلغ</Text>
          <View style={styles.amountRow}>
            <Pressable
              onPress={cycleCurrency}
              style={({ pressed }) => [styles.currencyChip, pressed && { opacity: 0.7 }]}
            >
              <Text style={styles.currencyText}>{currency}</Text>
            </Pressable>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              placeholderTextColor="rgba(190,198,224,0.3)"
              keyboardType="decimal-pad"
              style={styles.amountInput}
              textAlign="center"
              autoFocus
            />
          </View>
        </View>


        <Field label="الفئة">
          <Pressable
            onPress={() => setPickerOpen(true)}
            style={({ pressed }) => [styles.selectBtn, pressed && styles.selectBtnPressed]}
          >
            <MaterialIcons name="expand-more" size={22} color={colors.onSurfaceVariant} />
            <Text
              style={[
                styles.selectText,
                !selectedCategory && { color: colors.onSurfaceVariant },
              ]}
              numberOfLines={1}
            >
              {selectedCategory?.name ?? 'اختر الفئة...'}
            </Text>
          </Pressable>
        </Field>

        <Field label="التاريخ">
          <DateField value={date} onChange={setDate} />
        </Field>

        <Field label="ملاحظة (اختياري)">
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="أضف تفاصيل عن العملية..."
            placeholderTextColor={colors.onSurfaceVariant}
            multiline
            numberOfLines={4}
            style={styles.noteInput}
            textAlign="right"
            maxLength={500}
          />
        </Field>

        {error && <Text style={styles.error}>{error}</Text>}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.gutter) }]}>
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
            <Text style={styles.submitText}>حفظ العملية</Text>
          )}
        </Pressable>
      </View>

      <SelectionModal
        visible={pickerOpen}
        title={type === 'Expense' ? 'فئة المصروف' : 'فئة الدخل'}
        items={filteredCategories.map((c) => ({
          value: c.id,
          label: c.name,
          icon: iconForCategory(c.name, c.type),
        }))}
        selectedValue={categoryId}
        onSelect={setCategoryId}
        onClose={() => setPickerOpen(false)}
        emptyText={`لا توجد فئات ${type === 'Expense' ? 'مصاريف' : 'دخل'} – أضِفها من الإعدادات`}
      />
    </KeyboardAvoidingView>
  );
}

function Field({ label, children }) {
  return (
    <View style={styles.field}>
      <Text style={[styles.label, { textAlign: 'right' }]}>{label}</Text>
      {children}
    </View>
  );
}
