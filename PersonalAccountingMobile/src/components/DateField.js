import { createElement } from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fontFamily, radius, spacing } from '../theme';

// Date input that uses the browser's native picker on web (input type="date")
// and falls back to a plain YYYY-MM-DD TextInput on native.
export default function DateField({ value, onChange }) {
  return (
    <View style={styles.wrap}>
      <View pointerEvents="none" style={styles.iconWrap}>
        <MaterialIcons name="calendar-today" size={20} color={colors.onSurfaceVariant} />
      </View>

      {Platform.OS === 'web'
        ? createElement('input', {
            type: 'date',
            value: value ?? '',
            onChange: (e) => onChange?.(e.target.value),
            style: webInputStyle,
          })
        : (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={colors.onSurfaceVariant}
            style={styles.input}
            keyboardType="numbers-and-punctuation"
          />
        )}
    </View>
  );
}

const webInputStyle = {
  width: '100%',
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  color: colors.onSurface,
  fontFamily: fontFamily.regular,
  fontSize: 16,
  paddingTop: spacing.md,
  paddingBottom: spacing.md,
  paddingInlineEnd: spacing.gutter,
  paddingInlineStart: 48,
  direction: 'rtl',
  textAlign: 'right',
  colorScheme: 'dark',
};

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radius['2xl'],
    overflow: 'hidden',
  },
  iconWrap: {
    position: 'absolute',
    left: spacing.gutter,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  input: {
    paddingHorizontal: spacing.gutter,
    paddingLeft: 48,
    paddingVertical: spacing.md,
    color: colors.onSurface,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    textAlign: 'right',
  },
});
