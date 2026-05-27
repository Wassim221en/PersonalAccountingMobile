import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fontFamily, radius, spacing, typography } from '../theme';
import { currencyLabel, formatAmount } from '../utils/format';

const CURRENCIES = ['SYP', 'USD', 'EUR'];

export default function BalanceHero({ balance = 0, currency, onCurrencyChange }) {
  const [internalCurrency, setInternalCurrency] = useState('SYP');
  const activeCurrency = currency ?? internalCurrency;
  const handleChange = (code) => {
    if (onCurrencyChange) onCurrencyChange(code);
    else setInternalCurrency(code);
  };

  return (
    <View style={styles.outer}>
      <LinearGradient
        colors={[colors.surfaceContainerHigh, colors.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={[styles.glow, styles.glowTopLeft]} />
        <View style={[styles.glow, styles.glowBottomRight]} />

        <View style={styles.headerRow}>
          <MaterialIcons name="visibility" size={14} color={colors.onSurfaceVariant} />
          <Text style={styles.headerLabel}>الرصيد الإجمالي</Text>
        </View>

        <View style={styles.amountRow}>
          <Text style={styles.currencyLabel}>{currencyLabel(activeCurrency)}</Text>
          <Text style={styles.amount} numberOfLines={1}>
            {formatAmount(balance)}
          </Text>
        </View>

        <View style={styles.toggle}>
          {CURRENCIES.map((code) => {
            const active = code === activeCurrency;
            return (
              <Pressable
                key={code}
                onPress={() => handleChange(code)}
                style={[styles.toggleBtn, active && styles.toggleBtnActive]}
              >
                <Text style={[styles.toggleText, active && styles.toggleTextActive]}>{code}</Text>
              </Pressable>
            );
          })}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: { borderRadius: radius['3xl'], overflow: 'hidden' },
  card: {
    position: 'relative',
    padding: spacing.stackLg,
    borderRadius: radius['3xl'],
    borderWidth: 1,
    borderColor: colors.white05,
    alignItems: 'center',
    overflow: 'hidden',
  },
  glow: { position: 'absolute', width: 192, height: 192, borderRadius: 9999, opacity: 0.6 },
  glowTopLeft: { top: -48, left: -48, backgroundColor: 'rgba(78, 222, 163, 0.18)' },
  glowBottomRight: { bottom: -48, right: -48, backgroundColor: 'rgba(190, 198, 224, 0.15)' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  headerLabel: {
    ...typography.labelLg,
    fontFamily: fontFamily.medium,
    color: colors.onSurfaceVariant,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
    marginBottom: spacing.stackLg,
  },
  amount: {
    ...typography.numeralXl,
    fontFamily: fontFamily.bold,
    color: colors.onSurface,
    letterSpacing: -0.5,
  },
  currencyLabel: {
    ...typography.labelLg,
    fontFamily: fontFamily.medium,
    color: colors.secondary,
  },
  toggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(4, 14, 31, 0.5)',
    padding: 4,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: colors.white05,
  },
  toggleBtn: {
    paddingHorizontal: spacing.stackLg,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  toggleBtnActive: { backgroundColor: 'rgba(0, 165, 114, 0.2)' },
  toggleText: {
    ...typography.labelSm,
    fontFamily: fontFamily.medium,
    color: colors.onSurfaceVariant,
  },
  toggleTextActive: {
    fontFamily: fontFamily.bold,
    color: colors.secondaryFixed,
  },
});
