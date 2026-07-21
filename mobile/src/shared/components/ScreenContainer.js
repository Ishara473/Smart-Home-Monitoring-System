import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

export default function ScreenContainer({
  children,
  style,
  useSafeArea = true,
  padding = true,
}) {
  const ContainerComponent = useSafeArea ? SafeAreaView : View;

  return (
    <ContainerComponent
      style={[
        styles.container,
        padding && styles.padding,
        style,
      ]}
    >
      {children}
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  padding: {
    padding: spacing.medium,
  },
});
