import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';
import { borders } from '../../../shared/theme/borders';
import { shadows } from '../../../shared/theme/shadows';
import DeviceTypeIcon from './DeviceTypeIcon';
import DeviceStatusBadge from './DeviceStatusBadge';

export default function DeviceCard({ device, onPress }) {
  if (!device) return null;

  const isAlarming = device.status === 'ERROR';

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        isAlarming && styles.errorBorder,
        pressed && styles.pressedCard,
      ]}
      onPress={onPress}
    >
      <View style={styles.leftSection}>
        <DeviceTypeIcon type={device.type} status={device.status} />
        
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {device.name}
          </Text>
          <Text style={styles.room}>
            {device.room}
          </Text>
        </View>
      </View>
      
      <DeviceStatusBadge status={device.status} />
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
  errorBorder: {
    borderColor: colors.status.ERROR,
  },
  pressedCard: {
    backgroundColor: colors.surfaceHighlight,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: spacing.small,
  },
  info: {
    marginLeft: spacing.small,
    flex: 1,
  },
  name: {
    color: colors.textPrimary,
    fontSize: typography.sizes.bodyLarge,
    fontWeight: typography.weights.bold,
  },
  room: {
    color: colors.textSecondary,
    fontSize: typography.sizes.caption,
    marginTop: 2,
  },
});
