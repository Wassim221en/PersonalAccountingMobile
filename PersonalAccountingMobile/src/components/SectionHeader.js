import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, spacing, typography } from '../theme';

export default function SectionHeader({ title, linkLabel = 'عرض الكل', onLink }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {onLink && (
        <Pressable onPress={onLink} hitSlop={8}>
          <Text style={styles.link}>{linkLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.containerMargin,
  },
  title: {
    ...typography.headlineSm,
    fontFamily: fontFamily.semibold,
    color: colors.onSurface,
  },
  link: {
    ...typography.labelLg,
    fontFamily: fontFamily.medium,
    color: colors.secondary,
  },
});
