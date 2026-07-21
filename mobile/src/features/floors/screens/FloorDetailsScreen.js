import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ScreenContainer from '../../../shared/components/ScreenContainer';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';
import { getFloorById } from '../data/floorMockData';
import { FloorPlanView, RoomCard } from '../components';
import { getDevicesByFloor, DeviceCard } from '../../devices';

export default function FloorDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const floor = getFloorById(id);
  const devices = getDevicesByFloor(floor.id);

  return (
    <ScreenContainer useSafeArea={true} padding={false}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{floor.name} Details</Text>
        <Text style={styles.subtitle}>Spatially monitoring {floor.deviceCount} device nodes</Text>

        {/* Floor Plan Visualization Grid */}
        <FloorPlanView floorId={floor.id} />

        {/* Devices Listing Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Devices on this Floor</Text>
          {devices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onPress={() => router.push(`/devices/${device.id}`)}
            />
          ))}
        </View>

        {/* Rooms Listing Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rooms Grid Layout</Text>
          {floor.rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
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
  },
  section: {
    marginTop: spacing.medium,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.sizes.titleLarge,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.small,
  },
});
