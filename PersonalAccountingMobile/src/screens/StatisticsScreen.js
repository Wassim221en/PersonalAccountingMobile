import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { getStatistics } from '../api/statistics';
import { CategoryBreakdown, DonutChart, TrendChart } from '../components/StatisticsParts';
import { colors, fontFamily, spacing } from '../theme';
import { currencyLabel, formatAmount } from '../utils/format';
import { styles } from './StatisticsScreen.styles';

const PERIODS = [
  { value: 'weekly', label: 'أسبوعي' },
  { value: 'monthly', label: 'شهري' },
  { value: 'yearly', label: 'سنوي' },
];

const CURRENCIES = ['SYP', 'USD', 'EUR'];
const MONTH_NAMES = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

export default function StatisticsScreen() {
  const insets = useSafeAreaInsets();
  const now = new Date();
  const [period, setPeriod] = useState('yearly');
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [currency, setCurrency] = useState('SYP');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const isMonthlyView = period === 'monthly' || period === 'weekly';

  const load = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const res = await getStatistics({
        year,
        month: isMonthlyView ? month : undefined,
        currency,
      });
      setData(res);
    } catch (e) {
      setError(e?.message ?? 'تعذّر تحميل الإحصائيات');
      setData(null);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [year, month, isMonthlyView, currency]);

  useEffect(() => { load(); }, [load]);

  const currencyData = useMemo(() => {
    const list = data?.currencies ?? [];
    return list.find((c) => c.currency === currency) ?? list[0] ?? null;
  }, [data, currency]);

  const kpi = useMemo(() => {
    if (!currencyData) return null;
    const { totalIncome, totalExpense, monthlyBreakdown, dailyBreakdown } = currencyData;

    const savingsRate = totalIncome > 0
      ? ((totalIncome - totalExpense) / totalIncome) * 100
      : 0;

    const daysInPeriod = isMonthlyView
      ? (dailyBreakdown?.length || new Date(year, month, 0).getDate())
      : 365;
    const dailyAvg = daysInPeriod > 0 ? totalExpense / daysInPeriod : 0;

    const highestMonth = (monthlyBreakdown ?? []).reduce(
      (max, m) => ((m.expense ?? 0) > (max?.expense ?? 0) ? m : max),
      null,
    );

    return { savingsRate, dailyAvg, highestMonth };
  }, [currencyData, isMonthlyView, year, month]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable style={styles.iconBtn}>
          <MaterialIcons name="notifications" size={22} color={colors.onSurfaceVariant} />
        </Pressable>
        <Text style={styles.title}>الإحصائيات</Text>
        <View style={styles.avatar}>
          <MaterialIcons name="person" size={18} color={colors.onSurfaceVariant} />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
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
        <Segment items={PERIODS} value={period} onChange={setPeriod} />
        <Segment
          items={CURRENCIES.map((c) => ({ value: c, label: c }))}
          value={currency}
          onChange={setCurrency}
        />

        <View style={styles.controlsRow}>
          <YearStepper year={year} onChange={setYear} />
          {isMonthlyView && <MonthChips value={month} onChange={setMonth} />}
        </View>

        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={colors.secondary} />
          </View>
        ) : error ? (
          <View style={styles.emptyChart}>
            <MaterialIcons name="error-outline" size={32} color={colors.error} />
            <Text style={styles.emptyText}>{error}</Text>
          </View>
        ) : (
          <>
            <SummaryRow data={currencyData} currency={currency} />
            <TrendChart data={currencyData} />
            <KpiGrid kpi={kpi} currency={currency} period={period} />
            {currencyData && (
              <DistributionSection data={currencyData} currency={currency} />
            )}
          </>
        )}

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </View>
  );
}

function Segment({ items, value, onChange }) {
  return (
    <View style={styles.segment}>
      {items.map((it) => {
        const active = it.value === value;
        return (
          <Pressable
            key={it.value}
            onPress={() => onChange(it.value)}
            style={[styles.segmentBtn, active && styles.segmentBtnActive]}
          >
            <Text style={[styles.segmentText, active && styles.segmentTextActive]}>
              {it.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function YearStepper({ year, onChange }) {
  return (
    <View style={styles.stepper}>
      <Pressable onPress={() => onChange(year - 1)} style={styles.stepperBtn} hitSlop={8}>
        <MaterialIcons name="chevron-right" size={22} color={colors.onSurface} />
      </Pressable>
      <Text style={styles.stepperLabel}>{year}</Text>
      <Pressable onPress={() => onChange(year + 1)} style={styles.stepperBtn} hitSlop={8}>
        <MaterialIcons name="chevron-left" size={22} color={colors.onSurface} />
      </Pressable>
    </View>
  );
}

function MonthChips({ value, onChange }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.monthsScroll}
      contentContainerStyle={styles.monthsRow}
    >
      {MONTH_NAMES.map((name, i) => {
        const m = i + 1;
        const active = m === value;
        return (
          <Pressable
            key={m}
            onPress={() => onChange(m)}
            style={[styles.monthChip, active && styles.monthChipActive]}
          >
            <Text style={[styles.monthChipText, active && styles.monthChipTextActive]}>
              {name}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

function SummaryRow({ data, currency }) {
  const income = data?.totalIncome ?? 0;
  const expense = data?.totalExpense ?? 0;
  const balance = data?.balance ?? 0;
  return (
    <View style={styles.summaryRow}>
      <SummaryCard label="الدخل" amount={income} currency={currency} color={colors.secondary} />
      <SummaryCard label="المصروف" amount={expense} currency={currency} color={colors.error} />
      <SummaryCard label="الرصيد" amount={balance} currency={currency} color={colors.onSurface} />
    </View>
  );
}

function SummaryCard({ label, amount, currency, color }) {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={[styles.summaryAmount, { color }]} numberOfLines={1}>
        {formatAmount(amount)}
      </Text>
      <Text style={styles.summarySub}>{currencyLabel(currency)}</Text>
    </View>
  );
}

function KpiGrid({ kpi, currency, period }) {
  if (!kpi) return null;

  const savingsRate = kpi.savingsRate ?? 0;
  const dailyAvg = kpi.dailyAvg ?? 0;
  const highestMonth = kpi.highestMonth;

  const monthName = highestMonth
    ? MONTH_NAMES[(highestMonth.month ?? 1) - 1]
    : null;
  const highestAmount = highestMonth?.expense ?? 0;

  return (
    <View style={styles.kpiGrid}>
      <View style={styles.kpiRow}>
        <View style={styles.kpiCard}>
          <View style={styles.kpiHeader}>
            <View style={[styles.kpiIcon, { backgroundColor: 'rgba(78, 222, 163, 0.1)' }]}>
              <MaterialIcons name="savings" size={20} color={colors.secondary} />
            </View>
            {savingsRate >= 0 && (
              <Text style={styles.kpiBadge}>
                {savingsRate >= 0 ? '+' : ''}
                {Math.abs(savingsRate).toFixed(0)}%
              </Text>
            )}
          </View>
          <Text style={styles.kpiLabel}>معدل الإدخار</Text>
          <Text style={styles.kpiValue}>{savingsRate.toFixed(1)}%</Text>
        </View>
        <View style={styles.kpiCard}>
          <View style={styles.kpiHeader}>
            <View style={[styles.kpiIcon, { backgroundColor: 'rgba(190, 198, 224, 0.1)' }]}>
              <MaterialIcons name="payments" size={20} color={colors.primary} />
            </View>
          </View>
          <Text style={styles.kpiLabel}>متوسط الإنفاق اليومي</Text>
          <Text style={styles.kpiValue} numberOfLines={1}>
            {formatAmount(dailyAvg)} {currencyLabel(currency)}
          </Text>
        </View>
      </View>
      {highestMonth && (
        <View style={styles.kpiFullCard}>
          <View style={styles.kpiFullLeft}>
            <View style={[styles.kpiIcon, { backgroundColor: 'rgba(255, 179, 176, 0.1)' }]}>
              <MaterialIcons name="calendar-month" size={20} color={colors.tertiary} />
            </View>
            <View style={styles.kpiFullText}>
              <Text style={styles.kpiLabel}>أكثر شهر إنفاقاً</Text>
              <Text style={styles.kpiMonth}>{monthName} {highestMonth.year ?? year}</Text>
            </View>
          </View>
          <Text style={styles.kpiFullAmount}>
            {formatAmount(highestAmount)} {currencyLabel(currency)}
          </Text>
        </View>
      )}
    </View>
  );
}

function DistributionSection({ data, currency }) {
  const allCategories = data?.categoryBreakdown ?? [];
  const expenseCats = allCategories.filter((c) => (c.type ?? 'Expense') === 'Expense');

  return (
    <View style={styles.distCard}>
      <View style={styles.distHeader}>
        <Text style={styles.cardTitle}>توزيع المصاريف</Text>
      </View>

      <DonutChart items={expenseCats} />

      <CategoryBreakdown data={data} currency={currency} />
    </View>
  );
}
