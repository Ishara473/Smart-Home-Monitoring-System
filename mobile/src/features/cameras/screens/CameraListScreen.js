import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import ScreenContainer from '../../../shared/components/ScreenContainer';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';
import cameraMockData from '../data/cameraMockData';
import CameraCard from '../components/CameraCard';

export default function CameraListScreen() {
  const router = useRouter();

  return (
    <ScreenContainer useSafeArea={true} padding={false}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Surveillance Cameras</Text>
        <Text style={styles.subtitle}>Select a camera channel to monitor streams</Text>

        {cameraMockData.map((camera) => (
          <CameraCard
            key={camera.id}
            camera={camera}
            onPress={() => router.push(`/cameras/${camera.id}`)}
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
