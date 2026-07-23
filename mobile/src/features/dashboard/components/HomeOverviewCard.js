import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';
import { borders } from '../../../shared/theme/borders';

export default function HomeOverviewCard({ homeInfo }) {
  if (!homeInfo) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Home Overview</Text>
      <Text style={styles.homeName}>{homeInfo.name}</Text>

      <View style={styles.grid}>
        {/* Stat 1: Floors */}
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="layers" size={20} color={colors.textSecondary} />
          <Text style={styles.statValue}>{homeInfo.floorsCount}</Text>
          <Text style={styles.statLabel}>Total Floors</Text>
        </View>

        {/* Stat 2: Total Devices */}
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="devices" size={20} color={colors.textSecondary} />
          <Text style={styles.statValue}>{homeInfo.totalDevices}</Text>
          <Text style={styles.statLabel}>Total Devices</Text>
        </View>

        {/* Stat 3: Active Devices */}
        <View style={[styles.statCard, styles.activeBorder]}>
          <MaterialCommunityIcons name="power" size={20} color={colors.status.ON} />
          <Text style={[styles.statValue, styles.activeText]}>{homeInfo.activeDevices}</Text>
          <Text style={styles.statLabel}>Active Now</Text>
        </View>

        {/* Stat 4: Cameras */}
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="video" size={20} color={colors.textSecondary} />
          <Text style={styles.statValue}>{homeInfo.totalCameras || 2}</Text>
          <Text style={styles.statLabel}>Cameras</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.small,
  },
  headerTitle: {
    color: colors.textSecondary,
    fontSize: typography.sizes.caption,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  homeName: {
    color: colors.textPrimary,
    fontSize: typography.sizes.titleLarge,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.medium,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.medium,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.surface,
    borderRadius: borders.radius.medium,
    padding: spacing.medium,
    borderWidth: borders.width.thin,
    borderColor: colors.divider,
    alignItems: 'flex-start',
  },
  activeBorder: {
    borderColor: `${colors.status.ON}30`,
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: typography.sizes.headingMedium,
    fontWeight: typography.weights.bold,
    marginTop: spacing.small,
  },
  activeText: {
    color: colors.status.ON,
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: typography.sizes.caption,
    marginTop: 2,
  },
});
