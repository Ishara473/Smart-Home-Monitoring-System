import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import ScreenContainer from '../../../shared/components/ScreenContainer';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';
import { useDashboard } from '../hooks/useDashboard';
import {
  GreetingCard,
  HomeOverviewCard,
  FloorSummaryCard,
  SafetyAlertCard,
  QuickActions,
  RecentActivity,
} from '../components';

export default function DashboardScreen() {
  const router = useRouter();
  const { dashboardData } = useDashboard();

  const handleFloorPress = (floorId) => {
    router.push(`/floors/${floorId}`);
  };

  return (
    <ScreenContainer useSafeArea={true} padding={false}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.dashboardTitle}>Smart Home Dashboard</Text>
        <Text style={styles.dashboardSubtitle}>
          Real-time monitoring & safety management
        </Text>

        {/* 1. Dynamic greeting and profile status */}
        <GreetingCard />

        {/* 2. Quick navigation shortcuts */}
        <QuickActions />

        {/* 3. Home Overview statistics grid */}
        <HomeOverviewCard homeInfo={dashboardData.homeOverview} />

        {/* 4. Active Safety Alerts Section */}
        {dashboardData.safetyAlerts && dashboardData.safetyAlerts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Safety Alerts</Text>
            {dashboardData.safetyAlerts.map((alert) => (
              <SafetyAlertCard key={alert.id} alert={alert} />
            ))}
          </View>
        )}

        {/* 5. Floor Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>House Floors Overview</Text>
          {dashboardData.floorsSummary.map((floor) => (
            <FloorSummaryCard
              key={floor.id}
              floor={floor}
              onPress={() => handleFloorPress(floor.id)}
            />
          ))}
        </View>

        {/* 6. Scrollable Recent Activity logs */}
        <RecentActivity activities={dashboardData.recentActivity} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: spacing.medium,
    paddingBottom: spacing.xxl,
  },
  dashboardTitle: {
    color: colors.textPrimary,
    fontSize: typography.sizes.headingLarge,
    fontWeight: typography.weights.bold,
    marginTop: spacing.small,
  },
  dashboardSubtitle: {
    color: colors.textSecondary,
    fontSize: typography.sizes.body,
    marginBottom: spacing.medium,
  },
  section: {
    marginVertical: spacing.small,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.sizes.titleLarge,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.small,
  },
});
