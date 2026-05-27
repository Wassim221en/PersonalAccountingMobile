import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fontFamily, radius, spacing, typography } from '../theme';
import { currencyLabel, formatAmount, formatTransactionDate } from '../utils/format';

function getCategoryIcon(categoryName = '') {
  const name = categoryName.toLowerCase();
  if (name.includes('تحويل')) return 'swap-horiz';
  if (name.includes('كهرباء') || name.includes('فاتورة')) return 'bolt';
  if (name.includes('سوبر') || name.includes('بقالة') || name.includes('طعام')) return 'shopping-cart';
  if (name.includes('راتب') || name.includes('دخل')) return 'payments';
  if (name.includes('مطعم') || name.includes('مقهى')) return 'restaurant';
  if (name.includes('إيجار') || name.includes('منزل')) return 'home';
  return 'receipt-long';
}

export default function TransactionItem({ transaction }) {
  const { amount, currency, note, date, categoryName, categoryType } = transaction;
  const isIncome = categoryType === 'Income';
  const icon = getCategoryIcon(categoryName ?? note);
  const iconColor = isIncome ? colors.secondary : colors.tertiary;
  const iconBg = isIncome ? 'rgba(0, 165, 114, 0.15)' : 'rgba(103, 2, 17, 0.25)';
  const amountColor = isIncome ? colors.secondaryFixed : colors.tertiaryFixed;
  const sign = isIncome ? '+' : '-';

  return (
    <View style={styles.row}>
      <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
        <MaterialIcons name={icon} size={20} color={iconColor} />
      </View>
      <View style={styles.middle}>
        <Text style={styles.name} numberOfLines={1}>{note ?? categoryName}</Text>
        <Text style={styles.date}>{formatTransactionDate(date)}</Text>
      </View>
      <Text style={[styles.amount, { color: amountColor }]}>
        {sign}{formatAmount(amount)} {currencyLabel(currency)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.containerMargin,
    gap: spacing.md,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  middle: { flex: 1 },
  name: {
    ...typography.bodyMd,
    fontFamily: fontFamily.medium,
    color: colors.onSurface,
    textAlign: 'right',
  },
  date: {
    ...typography.labelSm,
    fontFamily: fontFamily.regular,
    color: colors.onSurfaceVariant,
    marginTop: 2,
    textAlign: 'right',
  },
  amount: {
    ...typography.bodyMd,
    fontFamily: fontFamily.bold,
    flexShrink: 0,
  },
});
