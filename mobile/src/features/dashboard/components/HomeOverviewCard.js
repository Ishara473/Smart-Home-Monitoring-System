import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';
import { borders } from '../../../shared/theme/borders';
import { shadows } from '../../../shared/theme/shadows';

export default function HomeOverviewCard({ homeInfo }) {
  if (!homeInfo) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.headerTitle}>Home Overview</Text>
      <Text style={styles.homeName}>{homeInfo.name}</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Floors</Text>
          <Text style={styles.statValue}>{homeInfo.floorsCount}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total Devices</Text>
          <Text style={styles.statValue}>{homeInfo.totalDevices}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Active Devices</Text>
          <Text style={[styles.statValue, styles.activeColor]}>{homeInfo.activeDevices}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borders.radius.large,
    padding: spacing.medium,
    marginVertical: spacing.small,
    borderWidth: borders.width.thin,
    borderColor: colors.divider,
    ...shadows.small,
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
    fontSize: typography.sizes.headingLarge,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.medium,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: typography.sizes.caption,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.xs,
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: typography.sizes.headingSmall,
    fontWeight: typography.weights.bold,
  },
  activeColor: {
    color: colors.status.ON,
  },
  divider: {
    width: borders.width.thin,
    height: 32,
    backgroundColor: colors.divider,
  },
});
