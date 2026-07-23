import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DeviceReferenceList from './DeviceReferenceList';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';
import { borders } from '../../../shared/theme/borders';
import { shadows } from '../../../shared/theme/shadows';

export default function RoomCard({ room }) {
  if (!room) return null;

  const deviceCount = room.devices?.length || 0;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <Text style={styles.roomName}>{room.name}</Text>
          {room.metadata?.area && (
            <Text style={styles.areaText}>{room.metadata.area}</Text>
          )}
        </View>
        <Text style={styles.countText}>
          {deviceCount} {deviceCount === 1 ? 'device' : 'devices'}
        </Text>
      </View>

      <DeviceReferenceList deviceIds={room.devices} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borders.radius.medium,
    padding: spacing.medium,
    marginVertical: spacing.small,
    borderWidth: borders.width.thin,
    borderColor: colors.divider,
    ...shadows.small,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: borders.width.thin,
    borderBottomColor: colors.divider,
    paddingBottom: spacing.small,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.small,
  },
  roomName: {
    color: colors.textPrimary,
    fontSize: typography.sizes.bodyLarge,
    fontWeight: typography.weights.bold,
  },
  areaText: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: typography.weights.medium,
  },
  countText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.bodySmall,
  },
});
