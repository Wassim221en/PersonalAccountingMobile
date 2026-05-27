import { Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme';
import { currencyLabel, formatAmount } from '../utils/format';
import { iconForCategory } from '../utils/categoryIcons';
import { styles } from '../screens/StatisticsScreen.styles';

const MONTH_SHORT = ['ينا', 'فبر', 'مار', 'أبر', 'ماي', 'يون', 'يول', 'أغس', 'سبت', 'أكت', 'نوف', 'ديس'];

const DONUT_COLORS = [
  colors.secondary,
  colors.primary,
  colors.tertiary,
  colors.secondaryContainer,
  colors.error,
  colors.onPrimaryContainer,
];

export function TrendChart({ data }) {
  const raw = data?.monthlyBreakdown ?? [];

  const points = Array.from({ length: 12 }, (_, i) => {
    const m = i + 1;
    const match = raw.find((d) => d.month === m);
    return {
      label: MONTH_SHORT[i],
      income: match?.income ?? 0,
      expense: match?.expense ?? 0,
    };
  });

  const maxVal = points.reduce((acc, p) => Math.max(acc, p.income, p.expense), 0) || 1;

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.secondary }]} />
            <Text style={styles.legendText}>دخل</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.error }]} />
            <Text style={styles.legendText}>مصاريف</Text>
          </View>
        </View>
        <Text style={styles.cardTitle}>التوجه السنوي</Text>
      </View>

      <View style={styles.chartArea}>
        {points.map((p, i) => {
          const hasData = p.income > 0 || p.expense > 0;
          const incomeH = hasData
            ? `${Math.max(2, Math.round((p.income / maxVal) * 100))}%`
            : '2%';
          const expenseH = hasData
            ? `${Math.max(2, Math.round((p.expense / maxVal) * 100))}%`
            : '2%';

          return (
            <View key={`${p.label}-${i}`} style={styles.chartColumn}>
              <View style={styles.chartBars}>
                <View
                  style={[
                    styles.chartBar,
                    {
                      height: incomeH,
                      backgroundColor: colors.secondary,
                      opacity: p.income > 0 ? 0.85 : 0.12,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.chartBar,
                    {
                      height: expenseH,
                      backgroundColor: colors.error,
                      opacity: p.expense > 0 ? 0.85 : 0.12,
                    },
                  ]}
                />
              </View>
              <Text style={styles.chartLabel}>{p.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export function CategoryBreakdown({ data, currency }) {
  const items = data?.categoryBreakdown ?? [];
  const sorted = [...items].sort((a, b) => (b.total ?? 0) - (a.total ?? 0));

  return (
    <View>
      {sorted.length === 0 ? (
        <View style={styles.emptyChart}>
          <MaterialIcons name="category" size={32} color={colors.onSurfaceVariant} />
          <Text style={styles.emptyText}>لا توجد فئات لعرضها</Text>
        </View>
      ) : (
        <View>
          {sorted.map((c, idx) => {
            const isIncome = c.type === 'Income';
            const fillColor = isIncome ? colors.secondary : colors.error;
            const bg = isIncome
              ? 'rgba(0, 165, 114, 0.15)'
              : 'rgba(255, 180, 171, 0.15)';
            const pct = Math.max(0, Math.min(100, c.percentage ?? 0));
            return (
              <View key={c.categoryId ?? `${c.categoryName}-${idx}`}>
                <View style={styles.catRow}>
                  <View style={styles.catHeader}>
                    <View style={styles.catRight}>
                      <Text style={[styles.catAmount, { color: fillColor }]}>
                        {formatAmount(c.total)} {currencyLabel(currency)}
                      </Text>
                      <Text style={styles.catPercent}>{pct.toFixed(1)}%</Text>
                    </View>
                    <View style={styles.catLeft}>
                      <View style={[styles.catIcon, { backgroundColor: bg }]}>
                        <MaterialIcons
                          name={iconForCategory(c.categoryName, c.type)}
                          size={18}
                          color={fillColor}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.catName} numberOfLines={1}>
                          {c.categoryName}
                        </Text>
                        <Text style={styles.catMeta}>{c.count ?? 0} عملية</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${pct}%`, backgroundColor: fillColor },
                      ]}
                    />
                  </View>
                </View>
                {idx < sorted.length - 1 && <View style={styles.divider} />}
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

export function DonutChart({ items }) {
  const sorted = [...items]
    .filter((c) => (c.total ?? 0) > 0)
    .sort((a, b) => (b.total ?? 0) - (a.total ?? 0));

  const top = sorted.slice(0, 5);
  const rest = sorted.slice(5);
  const restTotal = rest.reduce((s, c) => s + (c.percentage ?? 0), 0);

  const segments =
    rest.length > 0
      ? [
          ...top.map((c) => ({
            label: c.categoryName,
            pct: c.percentage ?? 0,
            amount: c.total ?? 0,
          })),
          { label: 'أخرى', pct: restTotal, amount: rest.reduce((s, c) => s + (c.total ?? 0), 0) },
        ]
      : top.map((c) => ({
          label: c.categoryName,
          pct: c.percentage ?? 0,
          amount: c.total ?? 0,
        }));

  if (segments.length === 0) {
    return (
      <View style={styles.emptyChart}>
        <MaterialIcons name="pie-chart" size={32} color={colors.onSurfaceVariant} />
        <Text style={styles.emptyText}>لا توجد بيانات</Text>
      </View>
    );
  }

  const totalPct = segments.reduce((s, seg) => s + seg.pct, 0);
  const remainingPct = Math.max(0, 100 - totalPct);

  return (
    <View style={styles.donutWrap}>
      <View style={styles.donutRelative}>
        <Svg width={208} height={208}>
          {makeSegments(segments, remainingPct)}
        </Svg>
      </View>
      <View style={styles.legendList}>
        {segments.map((seg, i) => (
          <View key={seg.label} style={styles.legendListItem}>
            <View
              style={[
                styles.legendDotBig,
                { backgroundColor: DONUT_COLORS[i % DONUT_COLORS.length] },
              ]}
            />
            <View style={styles.legendListCol}>
              <Text style={styles.legendListText}>{seg.label}</Text>
              <Text style={styles.legendListSub}>
                {seg.pct.toFixed(0)}% · {formatAmount(seg.amount)}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function makeSegments(segments, remainingPct) {
  const size = 208;
  const strokeWidth = 36;
  const radius = (size - strokeWidth) / 2;
  const half = size / 2;

  const hasRemaining = remainingPct > 0;
  const allSegments = hasRemaining
    ? [...segments, { label: '', pct: remainingPct, isRemaining: true }]
    : segments;

  const elements = [
    <Circle
      key="bg"
      cx={half}
      cy={half}
      r={radius}
      fill="transparent"
      stroke={colors.surfaceContainerHigh}
      strokeWidth={strokeWidth}
    />,
  ];

  let currentAngle = 0;

  allSegments.forEach((seg, idx) => {
    const pct = seg.pct;
    if (pct <= 0) return;

    const segAngle = (pct / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + segAngle;
    currentAngle = endAngle;

    const color = seg.isRemaining
      ? colors.surfaceContainerHigh
      : DONUT_COLORS[idx % DONUT_COLORS.length];

    const start = polarToCartesian(half, half, radius, endAngle);
    const end = polarToCartesian(half, half, radius, startAngle);
    const largeArc = segAngle > 180 ? 1 : 0;
    const d = `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y}`;

    elements.push(
      <Path
        key={idx}
        d={d}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="butt"
      />,
    );
  });

  return elements;
}

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}
