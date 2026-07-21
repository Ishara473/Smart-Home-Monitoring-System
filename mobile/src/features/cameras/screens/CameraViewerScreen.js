import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ScreenContainer from '../../../shared/components/ScreenContainer';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';
import { borders } from '../../../shared/theme/borders';
import { getCameraById } from '../data/cameraMockData';
import { CameraPreview, CameraStatusBadge } from '../components';

export default function CameraViewerScreen() {
  const { id } = useLocalSearchParams();
  const camera = getCameraById(id);

  return (
    <ScreenContainer useSafeArea={true} padding={false}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{camera.name}</Text>
        <Text style={styles.subtitle}>surveillance channel stream</Text>

        {/* Large Visual Live Player Preview */}
        <CameraPreview camera={camera} />

        {/* Camera Info Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Channel Metadata</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Physical Location</Text>
            <Text style={styles.value}>{camera.location}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Stream Status</Text>
            <CameraStatusBadge status={camera.status} />
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Last Frame Received</Text>
            <Text style={styles.value}>{camera.lastUpdated}</Text>
          </View>
        </View>

        {/* Feed info notice */}
        <View style={styles.noticeBox}>
          <Text style={styles.noticeText}>
            Surveillance logs are encrypted. In mock mode, snapshot frames are loaded statically using safe CDN mock URIs.
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: spacing.medium,
    paddingBottom: spacing.xxl,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.sizes.headingLarge,
    fontWeight: typography.weights.bold,
    marginTop: spacing.small,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.sizes.body,
    marginBottom: spacing.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: borders.radius.medium,
    padding: spacing.medium,
    marginVertical: spacing.large,
    borderWidth: borders.width.thin,
    borderColor: colors.divider,
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: typography.sizes.caption,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.medium,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  label: {
    color: colors.textSecondary,
    fontSize: typography.sizes.body,
  },
  value: {
    color: colors.textPrimary,
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.bold,
  },
  divider: {
    height: borders.width.thin,
    backgroundColor: colors.divider,
    marginVertical: spacing.small,
  },
  noticeBox: {
    backgroundColor: colors.surfaceHighlight,
    borderRadius: borders.radius.medium,
    padding: spacing.medium,
  },
  noticeText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.bodySmall,
    lineHeight: 18,
    textAlign: 'center',
  },
});
