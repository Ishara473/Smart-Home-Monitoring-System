import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';
import { borders } from '../../../shared/theme/borders';
import { shadows } from '../../../shared/theme/shadows';

export default function FloorCard({ floor, onPress }) {
  if (!floor) return null;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressedCard,
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <Text style={styles.floorName}>{floor.name}</Text>
        
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{floor.roomCount} Rooms</Text>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.metaText}>{floor.deviceCount} Devices</Text>
        </View>
      </View>
      
      <View style={styles.badge}>
        <View style={[styles.dot, { backgroundColor: colors.status[floor.status] || colors.status.ON }]} />
        <Text style={styles.badgeText}>{floor.status}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borders.radius.medium,
    padding: spacing.medium,
    marginVertical: spacing.small,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: borders.width.thin,
    borderColor: colors.divider,
    ...shadows.small,
  },
  pressedCard: {
    backgroundColor: colors.surfaceHighlight,
  },
  content: {
    flex: 1,
  },
  floorName: {
    color: colors.textPrimary,
    fontSize: typography.sizes.titleLarge,
    fontWeight: typography.weights.bold,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  metaText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.bodySmall,
  },
  bullet: {
    color: colors.textMuted,
    marginHorizontal: spacing.small,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.xs,
    borderRadius: borders.radius.round,
    borderWidth: borders.width.thin,
    borderColor: colors.divider,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  badgeText: {
    color: colors.textPrimary,
    fontSize: typography.sizes.caption,
    fontWeight: typography.weights.bold,
  },
});
