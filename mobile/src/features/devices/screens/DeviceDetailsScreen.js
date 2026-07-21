import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ScreenContainer from '../../../shared/components/ScreenContainer';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';
import { borders } from '../../../shared/theme/borders';
import { getDeviceById } from '../data/deviceMockData';
import { DeviceTypeIcon, DeviceStatusBadge } from '../components';

export default function DeviceDetailsScreen() {
  const { id } = useLocalSearchParams();
  const device = getDeviceById(id);

  return (
    <ScreenContainer useSafeArea={true} padding={false}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <DeviceTypeIcon type={device.type} status={device.status} size={32} />
          <View style={styles.titleGroup}>
            <Text style={styles.name}>{device.name}</Text>
            <Text style={styles.typeLabel}>{device.type}</Text>
          </View>
        </View>

        {/* 1. Status Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Operational State</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Current Status</Text>
            <DeviceStatusBadge status={device.status} />
          </View>
        </View>

        {/* 2. Metadata Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Device Properties</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Location / Room</Text>
            <Text style={styles.value}>{device.room}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Floor Location</Text>
            <Text style={styles.value}>{device.floor === 'ground-floor' ? 'Ground Floor' : 'First Floor'}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Current Power Load</Text>
            <Text style={[styles.value, styles.powerText]}>{device.powerUsage}</Text>
          </View>
        </View>

        {/* 3. Controls Placeholder Area */}
        <View style={styles.controlsSection}>
          <Text style={styles.sectionTitle}>Device Control Interface</Text>
          <View style={styles.placeholderBox}>
            <Text style={styles.placeholderTitle}>Device Controls Placeholder</Text>
            <Text style={styles.placeholderSubtitle}>
              Interactive switches, active sliders, and camera video stream frames will appear here when connected to the simulator.
            </Text>
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.large,
    marginTop: spacing.small,
  },
  titleGroup: {
    marginLeft: spacing.medium,
    flex: 1,
  },
  name: {
    color: colors.textPrimary,
    fontSize: typography.sizes.headingMedium,
    fontWeight: typography.weights.bold,
  },
  typeLabel: {
    color: colors.textSecondary,
    fontSize: typography.sizes.caption,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: borders.radius.medium,
    padding: spacing.medium,
    marginVertical: spacing.small,
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
  powerText: {
    color: colors.primary,
  },
  divider: {
    height: borders.width.thin,
    backgroundColor: colors.divider,
    marginVertical: spacing.small,
  },
  controlsSection: {
    marginVertical: spacing.small,
  },
  placeholderBox: {
    borderWidth: borders.width.thin,
    borderColor: colors.divider,
    borderStyle: 'dashed',
    borderRadius: borders.radius.medium,
    padding: spacing.large,
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
  },
  placeholderTitle: {
    color: colors.textPrimary,
    fontSize: typography.sizes.titleLarge,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.small,
    textAlign: 'center',
  },
  placeholderSubtitle: {
    color: colors.textSecondary,
    fontSize: typography.sizes.bodySmall,
    lineHeight: 18,
    textAlign: 'center',
  },
});
