import React from 'react';
import { StyleSheet, Text, View, ScrollView, Switch, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ScreenContainer from '../../../shared/components/ScreenContainer';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';
import { borders } from '../../../shared/theme/borders';
import { useDevices } from '../hooks/useDevices';
import { DeviceTypeIcon, DeviceStatusBadge, SwitchControl } from '../components';

export default function DeviceDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { getDevice, toggleDevice, toggleSubSwitch } = useDevices();

  const device = getDevice(id);

  if (!device) {
    return (
      <ScreenContainer useSafeArea={true}>
        <Text style={styles.errorText}>Device not found.</Text>
      </ScreenContainer>
    );
  }

  const isSwitchControlled = 
    device.isControllable && 
    device.type !== 'CAMERA' && 
    device.type !== 'SWITCH_PANEL';

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

        {/* 3. Interactive Controls Section */}
        <View style={styles.controlsSection}>
          <Text style={styles.sectionTitle}>Device Controls</Text>

          {/* Schedule Configuration Link */}
          {(device.type === 'LIGHT' || device.type === 'IRON') && (
            <Pressable
              style={styles.scheduleButton}
              onPress={() => router.push('/schedules')}
            >
              <Text style={styles.scheduleButtonText}>Configure Schedules & Safety Limits</Text>
            </Pressable>
          )}

          {isSwitchControlled && (
            <View style={styles.masterControlBox}>
              <Text style={styles.controlLabel}>Master Power Toggle</Text>
              <Switch
                value={device.status === 'ON'}
                onValueChange={() => toggleDevice(device.id)}
                trackColor={{ false: colors.divider, true: `${colors.primary}50` }}
                thumbColor={device.status === 'ON' ? colors.primary : colors.textSecondary}
              />
            </View>
          )}

          {device.type === 'SWITCH_PANEL' && (
            <View style={styles.multiSwitchContainer}>
              <Text style={styles.subTitle}>Individually Addressable Gang Unit</Text>
              {device.switches.map((sw) => (
                <SwitchControl
                  key={sw.id}
                  name={sw.name}
                  status={sw.status}
                  onToggle={() => toggleSubSwitch(device.id, sw.id)}
                />
              ))}
            </View>
          )}

          {device.type === 'CAMERA' && (
            <View style={styles.cameraBox}>
              <View style={styles.cameraFeedPlaceholder}>
                <Text style={styles.cameraPlaceholderText}>MOCK SURVEILLANCE FEED STREAM</Text>
                <Text style={styles.cameraUriText}>{device.cameraUri}</Text>
              </View>
              
              <Pressable
                style={styles.openCameraButton}
                onPress={() => router.push('/cameras/cam-1')}
              >
                <Text style={styles.openCameraButtonText}>Open Surveillance Channel</Text>
              </Pressable>
            </View>
          )}

          {!device.isControllable && device.type !== 'CAMERA' && (
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>This device cannot be toggled directly from the dashboard.</Text>
            </View>
          )}
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
  errorText: {
    color: colors.status.DISCONNECTED,
    fontSize: typography.sizes.bodyLarge,
    textAlign: 'center',
    marginTop: spacing.large,
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
  subTitle: {
    color: colors.textSecondary,
    fontSize: typography.sizes.bodySmall,
    marginBottom: spacing.small,
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
  masterControlBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    padding: spacing.medium,
    borderRadius: borders.radius.medium,
    borderWidth: borders.width.thin,
    borderColor: colors.divider,
  },
  controlLabel: {
    color: colors.textPrimary,
    fontSize: typography.sizes.bodyLarge,
    fontWeight: typography.weights.bold,
  },
  multiSwitchContainer: {
    backgroundColor: colors.surface,
    padding: spacing.medium,
    borderRadius: borders.radius.medium,
    borderWidth: borders.width.thin,
    borderColor: colors.divider,
  },
  cameraBox: {
    backgroundColor: colors.surface,
    borderRadius: borders.radius.medium,
    borderWidth: borders.width.thin,
    borderColor: colors.divider,
    overflow: 'hidden',
  },
  cameraFeedPlaceholder: {
    height: 180,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.medium,
  },
  cameraPlaceholderText: {
    color: colors.status.ON,
    fontWeight: typography.weights.bold,
    letterSpacing: 1,
    fontSize: typography.sizes.bodySmall,
  },
  cameraUriText: {
    color: colors.textSecondary,
    fontSize: 10,
    marginTop: spacing.xs,
  },
  infoBox: {
    padding: spacing.medium,
    backgroundColor: colors.surfaceHighlight,
    borderRadius: borders.radius.medium,
  },
  infoText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.bodySmall,
    textAlign: 'center',
  },
  scheduleButton: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderWidth: borders.width.thin,
    borderColor: colors.primary,
    padding: spacing.medium,
    borderRadius: borders.radius.medium,
    alignItems: 'center',
    marginBottom: spacing.medium,
  },
  scheduleButtonText: {
    color: colors.primary,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.body,
  },
  openCameraButton: {
    backgroundColor: colors.surfaceHighlight,
    padding: spacing.medium,
    alignItems: 'center',
    borderTopWidth: borders.width.thin,
    borderColor: colors.divider,
  },
  openCameraButtonText: {
    color: colors.primary,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.body,
  },
});
