import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getDashboard } from '../api/dashboard';
import { mockDashboard } from '../api/mockDashboard';
import BalanceHero from '../components/BalanceHero';
import PrimaryActions from '../components/PrimaryActions';
import SectionHeader from '../components/SectionHeader';
import SummaryCards from '../components/SummaryCards';
import TopAppBar from '../components/TopAppBar';
import TransactionItem from '../components/TransactionItem';
import { colors, fontFamily, spacing, typography } from '../theme';

const EMPTY_BALANCE = { totalIncome: 0, totalExpense: 0, balance: 0 };

export default function HomeScreen({ onNavigate, refreshKey }) {
  const insets = useSafeAreaInsets();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currency, setCurrency] = useState('SYP');

  const load = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch {
      setDashboard(mockDashboard);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { if (refreshKey) load(true); }, [refreshKey, load]);

  const { currentBalances, recentTransactions } = dashboard ?? {};
  const activeBalance =
    currentBalances?.find((b) => b.currency === currency) ?? EMPTY_BALANCE;

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <TopAppBar />

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.secondary} />
        </View>
      ) : (
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
          <View style={styles.section}>
            <BalanceHero
              balance={activeBalance.balance}
              currency={currency}
              onCurrencyChange={setCurrency}
            />
          </View>

          <View style={styles.section}>
            <SummaryCards
              totalIncome={activeBalance.totalIncome}
              totalExpense={activeBalance.totalExpense}
              currency={currency}
            />
          </View>

          <View style={styles.section}>
            <PrimaryActions />
          </View>

          <View style={styles.section}>
            <SectionHeader title="آخر المعاملات" onLink={() => onNavigate?.('transactions')} />
          </View>

          {recentTransactions?.length ? (
            <View style={styles.card}>
              {recentTransactions.map((tx, index) => (
                <View key={tx.id ?? index}>
                  <TransactionItem transaction={tx} />
                  {index < recentTransactions.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyText}>لا توجد معاملات حديثة</Text>
            </View>
          )}

          <View style={{ height: spacing.xl }} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scroll: { flex: 1 },
  scrollContent: { gap: spacing.stackLg, paddingTop: spacing.gutter },
  section: { paddingHorizontal: spacing.containerMargin },
  card: {
    marginHorizontal: spacing.containerMargin,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.white05,
    overflow: 'hidden',
  },
  divider: {
    height: 1,
    backgroundColor: colors.white05,
    marginHorizontal: spacing.containerMargin,
  },
  emptyWrap: { alignItems: 'center', paddingVertical: spacing.xl },
  emptyText: {
    ...typography.bodyMd,
    fontFamily: fontFamily.regular,
    color: colors.onSurfaceVariant,
  },
});
