import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import ScreenContainer from '../../../shared/components/ScreenContainer';
import LoadingIndicator from '../../../shared/components/LoadingIndicator';
import FloorList from '../components/FloorList';
import { useFloors } from '../hooks/useFloors';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

export default function FloorListScreen() {
  const router = useRouter();
  const { floors, loading, error } = useFloors();

  const handleFloorPress = (floorId) => {
    router.push(`/floors/${floorId}`);
  };

  return (
    <ScreenContainer useSafeArea={true} padding={false}>
      <View style={styles.header}>
        <Text style={styles.title}>House Floor Plans</Text>
        <Text style={styles.subtitle}>Select floor level to view rooms and active appliances</Text>
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <LoadingIndicator message="Mapping physical space divisions..." />
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FloorList floors={floors} onFloorPress={handleFloorPress} />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.medium,
    paddingTop: spacing.small,
    paddingBottom: spacing.xs,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.sizes.headingLarge,
    fontWeight: typography.weights.bold,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.sizes.body,
    marginTop: 2,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.large,
  },
  errorText: {
    color: colors.status.DISCONNECTED,
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.bold,
  },
});
