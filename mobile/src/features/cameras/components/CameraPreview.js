import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';
import { borders } from '../../../shared/theme/borders';

export default function CameraPreview({ camera }) {
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (!camera) return null;

  const isUnavailable = camera.status === 'DISCONNECTED' || camera.status === 'OFFLINE' || imageError;

  return (
    <View style={styles.container}>
      {isUnavailable ? (
        <View style={styles.fallbackContainer}>
          <MaterialCommunityIcons name="video-off-outline" size={48} color={colors.status.DISCONNECTED} />
          <Text style={styles.fallbackTitle}>Camera unavailable</Text>
          <Text style={styles.fallbackSubtitle}>
            {imageError ? 'Invalid stream snapshot payload' : 'Appliance is disconnected from cloud server'}
          </Text>
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: camera.snapshotUri }}
            style={styles.image}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onError={() => {
              setImageError(true);
              setLoading(false);
            }}
            resizeMode="cover"
          />
          {loading && (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          )}
          
          {/* Overlay Status info */}
          <View style={styles.liveOverlay}>
            <View style={styles.liveIndicator}>
              <View style={[styles.dot, { backgroundColor: colors.status.ON }]} />
              <Text style={styles.liveText}>LIVE STREAM</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: '#000000',
    borderRadius: borders.radius.medium,
    borderWidth: borders.width.thin,
    borderColor: colors.divider,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.medium,
  },
  fallbackTitle: {
    color: colors.textPrimary,
    fontSize: typography.sizes.titleLarge,
    fontWeight: typography.weights.bold,
    marginTop: spacing.small,
  },
  fallbackSubtitle: {
    color: colors.textSecondary,
    fontSize: typography.sizes.bodySmall,
    marginTop: 2,
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  liveOverlay: {
    position: 'absolute',
    top: spacing.small,
    left: spacing.small,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.xs,
    borderRadius: borders.radius.round,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: spacing.xs,
  },
  liveText: {
    color: colors.textPrimary,
    fontSize: 9,
    fontWeight: typography.weights.bold,
    letterSpacing: 0.5,
  },
});
