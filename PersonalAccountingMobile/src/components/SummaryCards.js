import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fontFamily, radius, spacing, typography } from '../theme';
import { currencyLabel, formatAmount } from '../utils/format';

function Card({ icon, iconColor, iconBg, label, amount, amountColor, currency }) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
        <MaterialIcons name={icon} size={18} color={iconColor} />
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.amount, { color: amountColor }]}>{formatAmount(amount)}</Text>
      <Text style={styles.currency}>{currencyLabel(currency)}</Text>
    </View>
  );
}

export default function SummaryCards({ totalIncome = 0, totalExpense = 0, currency = 'SYP' }) {
  return (
    <View style={styles.row}>
      <Card
        icon="arrow-downward"
        iconColor={colors.secondary}
        iconBg="rgba(0,165,114,0.15)"
        label="الدخل"
        amount={totalIncome}
        amountColor={colors.secondaryFixed}
        currency={currency}
      />
      <Card
        icon="arrow-upward"
        iconColor={colors.tertiary}
        iconBg="rgba(103,2,17,0.25)"
        label="المصروف"
        amount={totalExpense}
        amountColor={colors.tertiaryFixed}
        currency={currency}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.containerMargin,
  },
  card: {
    flex: 1,
    backgroundColor: colors.surfaceContainer,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.white05,
    padding: spacing.gutter,
    alignItems: 'flex-end',
    gap: 4,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  label: {
    ...typography.labelSm,
    fontFamily: fontFamily.medium,
    color: colors.onSurfaceVariant,
  },
  amount: {
    ...typography.headlineSm,
    fontFamily: fontFamily.bold,
  },
  currency: {
    ...typography.labelSm,
    fontFamily: fontFamily.medium,
    color: colors.onSurfaceVariant,
  },
});
