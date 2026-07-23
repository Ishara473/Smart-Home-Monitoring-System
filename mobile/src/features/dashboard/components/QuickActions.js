import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';
import { borders } from '../../../shared/theme/borders';

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      id: 'floors',
      label: 'Floors',
      icon: 'layers-outline',
      route: '/floors',
      color: colors.primary,
    },
    {
      id: 'devices',
      label: 'Devices',
      icon: 'devices',
      route: '/devices',
      color: '#10b981',
    },
    {
      id: 'cameras',
      label: 'Cameras',
      icon: 'video-outline',
      route: '/cameras',
      color: '#f59e0b',
    },
    {
      id: 'schedules',
      label: 'Schedules',
      icon: 'clock-outline',
      route: '/schedules',
      color: '#8b5cf6',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      
      <View style={styles.grid}>
        {actions.map((act) => (
          <Pressable
            key={act.id}
            style={({ pressed }) => [
              styles.card,
              pressed && styles.pressedCard,
            ]}
            onPress={() => router.push(act.route)}
          >
            <View style={[styles.iconBox, { backgroundColor: `${act.color}15` }]}>
              <MaterialCommunityIcons name={act.icon} size={24} color={act.color} />
            </View>
            <Text style={styles.label}>{act.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.small,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.sizes.titleLarge,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.small,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.small,
  },
  card: {
    flex: 1,
    aspectRatio: 1, // Ensures perfect square shapes
    backgroundColor: colors.surface,
    borderRadius: borders.radius.medium,
    borderWidth: borders.width.thin,
    borderColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.small,
  },
  pressedCard: {
    backgroundColor: colors.surfaceHighlight,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: borders.radius.small,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.small,
  },
  label: {
    color: colors.textPrimary,
    fontSize: typography.sizes.bodySmall,
    fontWeight: typography.weights.bold,
    textAlign: 'center',
  },
});
