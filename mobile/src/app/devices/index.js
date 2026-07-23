import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import ScreenContainer from '../../shared/components/ScreenContainer';
import { colors } from '../../shared/theme/colors';
import { spacing } from '../../shared/theme/spacing';
import { typography } from '../../shared/theme/typography';

export default function DevicesListPlaceholder() {
  return (
    <ScreenContainer useSafeArea={true}>
      <Stack.Screen options={{ title: 'All Devices' }} />
      <View style={styles.content}>
        <Text style={styles.title}>All Devices</Text>
        <Text style={styles.subtitle}>Future interactive device list placeholder screen</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.large,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.sizes.headingMedium,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.small,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.sizes.body,
    textAlign: 'center',
  },
});
