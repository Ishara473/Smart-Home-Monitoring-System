import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';
import { borders } from '../../../shared/theme/borders';
import { shadows } from '../../../shared/theme/shadows';
import CameraStatusBadge from './CameraStatusBadge';

export default function CameraCard({ camera, onPress }) {
  if (!camera) return null;

  const isOnline = camera.status === 'ONLINE';

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressedCard,
      ]}
      onPress={onPress}
    >
      <View style={styles.thumbnailContainer}>
        {isOnline && camera.snapshotUri ? (
          <Image source={{ uri: camera.snapshotUri }} style={styles.thumbnail} />
        ) : (
          <View style={styles.fallbackThumbnail}>
            <MaterialCommunityIcons
              name={isOnline ? 'video' : 'video-off'}
              size={20}
              color={isOnline ? colors.primary : colors.status.DISCONNECTED}
            />
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{camera.name}</Text>
        <Text style={styles.location}>{camera.location}</Text>
      </View>

      <CameraStatusBadge status={camera.status} />
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
    borderWidth: borders.width.thin,
    borderColor: colors.divider,
    ...shadows.small,
  },
  pressedCard: {
    backgroundColor: colors.surfaceHighlight,
  },
  thumbnailContainer: {
    width: 48,
    height: 48,
    borderRadius: borders.radius.small,
    backgroundColor: '#000000',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  fallbackThumbnail: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    marginLeft: spacing.medium,
    marginRight: spacing.small,
  },
  name: {
    color: colors.textPrimary,
    fontSize: typography.sizes.bodyLarge,
    fontWeight: typography.weights.bold,
  },
  location: {
    color: colors.textSecondary,
    fontSize: typography.sizes.caption,
    marginTop: 2,
  },
});
