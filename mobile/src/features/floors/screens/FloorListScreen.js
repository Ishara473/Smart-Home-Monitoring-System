import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import ScreenContainer from '../../../shared/components/ScreenContainer';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';
import { floorRepository } from '../../../core/repositories/floorRepository';
import FloorCard from '../components/FloorCard';

export default function FloorListScreen() {
  const router = useRouter();
  const floors = floorRepository.getFloors();

  const handleFloorSelect = (floorId) => {
    router.push(`/floors/${floorId}`);
  };

  return (
    <ScreenContainer useSafeArea={true} padding={false}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>House Floor Plans</Text>
        <Text style={styles.subtitle}>Select a floor layout to manage devices spatially</Text>
        
        {floors.map((floor) => (
          <FloorCard
            key={floor.id}
            floor={floor}
            onPress={() => handleFloorSelect(floor.id)}
          />
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: spacing.medium,
    paddingBottom: spacing.xxl,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.sizes.headingLarge,
    fontWeight: typography.weights.bold,
    marginTop: spacing.small,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.sizes.body,
    marginBottom: spacing.medium,
  },
});
