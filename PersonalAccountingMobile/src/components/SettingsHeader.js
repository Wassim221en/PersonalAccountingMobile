import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fontFamily, spacing, typography } from '../theme';

const AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBdhkp7PpyakePgWKQW8hsXsqtjmloM5YdXFMhvgXz6IlsxCovtvc76On-dDSepNWHDRBehhoOVxGJovL6GB7W2lz6Q2AwZvP3Diu2_UTGFKodqyBvu3EbulPdCA4uWV7L9Bjw3hwfqCet7RAWt6ob6rla92-h1wFHo4V9d2bf-oxvMrYy66X8uh7uH_6mrViarf4lgzk4E0AlPe2tUJP54jsiAtMVGsjnLTJ0U1WC6A6_3zhkiEnkPu7WXdQG1EO5PE8p0BCERy6C8';

export default function SettingsHeader({ onBack }) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrap}>
        <Image source={{ uri: AVATAR_URL }} style={styles.avatar} />
      </View>
      <View style={styles.titleRow}>
        <Text style={styles.title}>الإعدادات</Text>
        <Pressable
          onPress={onBack}
          hitSlop={8}
          style={({ pressed }) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
        >
          <MaterialIcons name="arrow-forward" size={22} color={colors.primary} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.containerMargin,
    paddingVertical: spacing.gutter,
    backgroundColor: colors.surface,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  title: {
    ...typography.headlineSm,
    fontFamily: fontFamily.bold,
    color: colors.onSurface,
  },
  iconBtn: {
    width: 36, height: 36, borderRadius: 9999,
    alignItems: 'center', justifyContent: 'center',
  },
  iconBtnPressed: { backgroundColor: colors.surfaceContainerHigh },
  avatarWrap: {
    width: 40, height: 40, borderRadius: 9999, overflow: 'hidden',
    borderWidth: 1, borderColor: 'rgba(69, 70, 77, 0.3)',
    backgroundColor: colors.surfaceContainerHighest,
  },
  avatar: { width: '100%', height: '100%' },
});
