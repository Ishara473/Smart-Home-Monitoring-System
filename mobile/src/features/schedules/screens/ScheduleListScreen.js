import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import ScreenContainer from '../../../shared/components/ScreenContainer';
import LoadingIndicator from '../../../shared/components/LoadingIndicator';
import ScheduleList from '../components/ScheduleList';
import { useSchedules } from '../hooks/useSchedules';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

export default function ScheduleListScreen() {
  const router = useRouter();
  const { schedules, loading, error } = useSchedules();

  const handleSchedulePress = (scheduleId) => {
    router.push(`/schedules/${scheduleId}`);
  };

  return (
    <ScreenContainer useSafeArea={true} padding={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Automation Schedules</Text>
        <Text style={styles.subtitle}>Set time-based schedules and safety cutoffs</Text>
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <LoadingIndicator message="Initializing automation engine logs..." />
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <ScheduleList schedules={schedules} onSchedulePress={handleSchedulePress} />
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
