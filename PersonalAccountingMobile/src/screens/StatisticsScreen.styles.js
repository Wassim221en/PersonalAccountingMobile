import { StyleSheet } from 'react-native';
import { colors, fontFamily, radius, spacing, typography } from '../theme';

const GLASS_BG = 'rgba(30, 41, 59, 0.4)';

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: spacing.containerMargin,
    paddingVertical: spacing.gutter,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.white05,
    backgroundColor: colors.surface,
  },
  title: { ...typography.headlineSm, fontFamily: fontFamily.bold, color: colors.onSurface },
  iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: colors.surfaceContainerHighest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.containerMargin, paddingTop: spacing.stackLg, gap: spacing.stackLg, paddingBottom: spacing.xl },

  loader: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  // Segment controls
  segment: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainerHigh,
    padding: 4,
    borderRadius: radius['2xl'],
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    alignItems: 'center',
    borderRadius: radius.xl,
  },
  segmentBtnActive: { backgroundColor: colors.secondary },
  segmentText: { ...typography.labelLg, fontFamily: fontFamily.medium, color: colors.onSurfaceVariant },
  segmentTextActive: { color: colors.onSecondary, fontFamily: fontFamily.bold },

  // Year + month controls
  controlsRow: { gap: spacing.md },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.xl,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  stepperBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
  },
  stepperLabel: { ...typography.bodyMd, fontFamily: fontFamily.semibold, color: colors.onSurface },

  monthsScroll: { marginHorizontal: -spacing.containerMargin },
  monthsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.containerMargin,
    gap: spacing.sm,
  },
  monthChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  monthChipActive: { backgroundColor: colors.secondary, borderColor: colors.secondary },
  monthChipText: { ...typography.labelSm, fontFamily: fontFamily.medium, color: colors.onSurfaceVariant },
  monthChipTextActive: { color: colors.onSecondary, fontFamily: fontFamily.bold },

  // Summary row
  summaryRow: { flexDirection: 'row', gap: spacing.md },
  summaryCard: {
    flex: 1,
    backgroundColor: GLASS_BG,
    borderRadius: radius['3xl'],
    borderWidth: 1,
    borderColor: colors.white05,
    padding: spacing.gutter,
    gap: spacing.xs,
    alignItems: 'flex-end',
  },
  summaryLabel: { ...typography.labelSm, fontFamily: fontFamily.medium, color: colors.onSurfaceVariant },
  summaryAmount: { ...typography.headlineSm, fontFamily: fontFamily.bold, textAlign: 'right' },
  summarySub: { ...typography.labelSm, fontFamily: fontFamily.regular, color: colors.onSurfaceVariant },

  // Chart card
  card: {
    backgroundColor: GLASS_BG,
    borderRadius: radius['3xl'],
    borderWidth: 1,
    borderColor: colors.white05,
    padding: spacing.gutter,
    gap: spacing.gutter,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardTitle: { ...typography.headlineSm, fontFamily: fontFamily.semibold, color: colors.onSurface },

  legendRow: { flexDirection: 'row', gap: spacing.gutter, alignItems: 'center' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  legendDot: { width: 8, height: 8, borderRadius: 9999 },
  legendText: { ...typography.labelSm, fontFamily: fontFamily.medium, color: colors.onSurfaceVariant },

  chartArea: {
    height: 180,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 4,
  },
  chartColumn: { flex: 1, alignItems: 'center', gap: spacing.xs },
  chartBars: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 2,
    flex: 1,
  },
  chartBar: { width: 8, borderTopLeftRadius: 4, borderTopRightRadius: 4 },
  chartLabel: {
    ...typography.labelSm,
    fontSize: 10,
    fontFamily: fontFamily.regular,
    color: colors.onSurfaceVariant,
  },

  emptyChart: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    gap: spacing.sm,
  },
  emptyText: { ...typography.bodyMd, fontFamily: fontFamily.regular, color: colors.onSurfaceVariant },

  // KPI grid
  kpiGrid: { gap: spacing.md },
  kpiRow: { flexDirection: 'row', gap: spacing.md },
  kpiCard: {
    flex: 1,
    backgroundColor: GLASS_BG,
    borderRadius: radius['3xl'],
    borderWidth: 1,
    borderColor: colors.white05,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  kpiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  kpiIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kpiBadge: { ...typography.labelLg, fontFamily: fontFamily.semibold, color: colors.secondary },
  kpiLabel: { ...typography.labelSm, fontFamily: fontFamily.medium, color: colors.onSurfaceVariant },
  kpiValue: {
    ...typography.headlineSm,
    fontSize: 20,
    fontFamily: fontFamily.bold,
    color: colors.onSurface,
  },
  kpiFullCard: {
    backgroundColor: GLASS_BG,
    borderRadius: radius['3xl'],
    borderWidth: 1,
    borderColor: colors.white05,
    padding: spacing.gutter,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  kpiFullLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, flex: 1 },
  kpiFullText: { gap: 2 },
  kpiMonth: { ...typography.bodyLg, fontFamily: fontFamily.semibold, color: colors.onSurface },
  kpiFullAmount: { ...typography.labelLg, fontFamily: fontFamily.bold, color: colors.error },

  // Distribution card
  distCard: {
    backgroundColor: GLASS_BG,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.white05,
    padding: spacing.gutter,
  },
  distHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: spacing.stackLg,
  },

  // Donut chart
  donutWrap: { alignItems: 'center', marginBottom: spacing.xl },
  donutRelative: {
    width: 208,
    height: 208,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Category breakdown (inside distribution card)
  catRow: { gap: spacing.sm, paddingVertical: spacing.sm },
  catHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  catLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flex: 1 },
  catIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catName: {
    ...typography.bodyMd,
    fontFamily: fontFamily.medium,
    color: colors.onSurface,
    flex: 1,
    textAlign: 'right',
  },
  catMeta: { ...typography.labelSm, fontFamily: fontFamily.regular, color: colors.onSurfaceVariant },
  catRight: { alignItems: 'flex-start' },
  catAmount: { ...typography.bodyMd, fontFamily: fontFamily.semibold, color: colors.onSurface },
  catPercent: { ...typography.labelSm, fontFamily: fontFamily.medium, color: colors.onSurfaceVariant },
  progressTrack: {
    height: 6,
    borderRadius: 9999,
    backgroundColor: colors.surfaceContainerHigh,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 9999 },
  divider: { height: 1, backgroundColor: colors.white05 },

  // Donut legend list
  legendList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.gutter,
    paddingTop: spacing.gutter,
  },
  legendListItem: {
    width: '46%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  legendDotBig: { width: 10, height: 10, borderRadius: 9999 },
  legendListText: { ...typography.labelLg, fontFamily: fontFamily.medium, color: colors.onSurface },
  legendListSub: { ...typography.labelSm, fontFamily: fontFamily.regular, color: colors.onSurfaceVariant },
  legendListCol: { flexDirection: 'column' },
});
