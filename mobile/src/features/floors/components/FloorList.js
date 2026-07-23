import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FloorCard from './FloorCard';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

export default function FloorList({ floors, onFloorPress }) {
  const renderEmptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons name="layers-off" size={48} color={colors.textSecondary} />
        <Text style={styles.emptyTitle}>No floors available</Text>
        <Text style={styles.emptySubtitle}>Start by configuring floor plan levels in the dashboard.</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={floors}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <FloorCard floor={item} onPress={() => onFloorPress(item.id)} />
      )}
      ListEmptyComponent={renderEmptyState}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: spacing.medium,
    paddingBottom: spacing.xxl,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: typography.sizes.titleLarge,
    fontWeight: typography.weights.bold,
    marginTop: spacing.medium,
  },
  emptySubtitle: {
    color: colors.textSecondary,
    fontSize: typography.sizes.body,
    textAlign: 'center',
    marginTop: spacing.xs,
    paddingHorizontal: spacing.large,
  },
});
