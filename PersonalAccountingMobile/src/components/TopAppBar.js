import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fontFamily, spacing, typography } from '../theme';

const AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCRht6M1RXVC3kb4DAfWrfR-Rb9vYrszhBSNhOBDL4R5LZlHSNXcak9hW-iM0MXHuIF6p6LEn80qKolLSebXZDBAVaBmorOWwICsxgNld_bGhMCgq-HV_vD08sQ26CfRgkfsrCBivRUcmw9b9EWvqf5glkyjlIrV3EHXWaHREH2CCATUkvpSzwahUPYFkNKKXPMqB7ixMPDxjldwm2aIiSK-o_qckByeCilfiFKy4nv9RWloB5c5lL2_OYAUcl26YEHizbQ339ovHeW';

export default function TopAppBar({ onNotificationsPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.avatarWrap}>
          <Image source={{ uri: AVATAR_URL }} style={styles.avatar} />
        </View>
        <View style={styles.titleBlock}>
          <Text style={styles.greeting}>مرحباً بك</Text>
          <Text style={styles.title}>المحفظة الذكية</Text>
        </View>
      </View>
      <Pressable
        onPress={onNotificationsPress}
        style={({ pressed }) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
        hitSlop={8}
      >
        <MaterialIcons name="notifications-none" size={24} color={colors.primary} />
      </Pressable>
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
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatarWrap: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(69, 70, 77, 0.3)',
    backgroundColor: colors.surfaceContainerHighest,
  },
  avatar: { width: '100%', height: '100%' },
  titleBlock: { alignItems: 'flex-start' },
  greeting: {
    ...typography.labelLg,
    fontFamily: fontFamily.medium,
    color: colors.onSurfaceVariant,
  },
  title: {
    ...typography.headlineSm,
    fontFamily: fontFamily.bold,
    color: colors.onSurface,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnPressed: { backgroundColor: colors.surfaceContainerHigh },
});
