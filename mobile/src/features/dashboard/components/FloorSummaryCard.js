import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';
import { borders } from '../../../shared/theme/borders';

export default function FloorSummaryCard({ floor, onPress }) {
  if (!floor) return null;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressedCard,
      ]}
      onPress={onPress}
    >
      <View style={styles.leftContainer}>
        <Text style={styles.floorName}>{floor.name}</Text>
        <Text style={styles.deviceCount}>
          {floor.deviceCount} Devices ({floor.activeDevicesCount} Active)
        </Text>
      </View>
      
      <View style={styles.badgeContainer}>
        <View style={[styles.statusDot, { backgroundColor: colors.status[floor.status] || colors.status.ON }]} />
        <Text style={styles.statusText}>{floor.status}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borders.radius.medium,
    padding: spacing.medium,
    marginVertical: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: borders.width.thin,
    borderColor: colors.divider,
  },
  pressedCard: {
    backgroundColor: colors.surfaceHighlight,
  },
  leftContainer: {
    flex: 1,
  },
  floorName: {
    color: colors.textPrimary,
    fontSize: typography.sizes.titleLarge,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
  deviceCount: {
    color: colors.textSecondary,
    fontSize: typography.sizes.bodySmall,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.xs,
    borderRadius: borders.radius.round,
    borderWidth: borders.width.thin,
    borderColor: colors.divider,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  statusText: {
    color: colors.textPrimary,
    fontSize: typography.sizes.caption,
    fontWeight: typography.weights.bold,
  },
});
