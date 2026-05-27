// Design tokens extracted from the provided HTML mockup (dark navy theme).
// Keep names aligned with the Tailwind tokens used in the design for traceability.

export const colors = {
  background: '#081425',
  surface: '#081425',
  surfaceDim: '#081425',
  surfaceContainerLowest: '#040e1f',
  surfaceContainerLow: '#111c2d',
  surfaceContainer: '#152031',
  surfaceContainerHigh: '#1f2a3c',
  surfaceContainerHighest: '#2a3548',
  surfaceBright: '#2f3a4c',
  surfaceVariant: '#2a3548',

  onSurface: '#d8e3fb',
  onSurfaceVariant: '#c6c6cd',
  onBackground: '#d8e3fb',

  primary: '#bec6e0',
  primaryContainer: '#0f172a',
  onPrimary: '#283044',
  onPrimaryContainer: '#798098',

  secondary: '#4edea3',
  secondaryContainer: '#00a572',
  secondaryFixed: '#6ffbbe',
  secondaryFixedDim: '#4edea3',
  onSecondary: '#003824',
  onSecondaryContainer: '#00311f',

  tertiary: '#ffb3b0',
  tertiaryContainer: '#390005',
  tertiaryFixed: '#ffdad8',
  onTertiary: '#670211',
  onTertiaryContainer: '#d65759',

  error: '#ffb4ab',
  errorContainer: '#93000a',

  outline: '#909097',
  outlineVariant: '#45464d',

  // Glass / overlay helpers
  glassBg: 'rgba(30, 41, 59, 0.7)',
  glassBorder: 'rgba(255, 255, 255, 0.05)',
  white05: 'rgba(255, 255, 255, 0.05)',
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  full: 9999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  gutter: 16,
  lg: 20,
  stackLg: 24,
  xl: 32,
  containerMargin: 20,
};

export const typography = {
  // Mirrors the mockup's `font-*` / `text-*` scale.
  labelSm: { fontSize: 12, lineHeight: 16, fontWeight: '500' },
  labelLg: { fontSize: 14, lineHeight: 20, fontWeight: '500' },
  bodyMd: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
  bodyLg: { fontSize: 18, lineHeight: 26, fontWeight: '400' },
  headlineSm: { fontSize: 20, lineHeight: 28, fontWeight: '600' },
  headlineMd: { fontSize: 24, lineHeight: 32, fontWeight: '600' },
  headlineLg: { fontSize: 30, lineHeight: 38, fontWeight: '700' },
  numeralXl: { fontSize: 36, lineHeight: 44, fontWeight: '700' },
};

export const fontFamily = {
  regular: 'IBMPlexSansArabic_400Regular',
  medium: 'IBMPlexSansArabic_500Medium',
  semibold: 'IBMPlexSansArabic_600SemiBold',
  bold: 'IBMPlexSansArabic_700Bold',
};
