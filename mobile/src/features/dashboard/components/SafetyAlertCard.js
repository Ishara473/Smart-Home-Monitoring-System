import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';
import { borders } from '../../../shared/theme/borders';

export default function SafetyAlertCard({ alert }) {
  if (!alert) return null;

  const isHighSeverity = alert.severity === 'HIGH';
  const accentColor = isHighSeverity ? colors.status.ERROR : colors.status.DISCONNECTED;

  return (
    <View style={[styles.card, { borderColor: accentColor }]}>
      <View style={styles.topRow}>
        <Text style={[styles.severityTag, { backgroundColor: accentColor }]}>
          {alert.severity} PRIORITY
        </Text>
        <Text style={styles.timestamp}>{alert.timestamp}</Text>
      </View>

      <Text style={styles.alertTitle}>{alert.title}</Text>
      <Text style={styles.alertMessage}>{alert.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderRadius: borders.radius.medium,
    padding: spacing.medium,
    marginVertical: spacing.xs,
    borderLeftWidth: 4,
    borderWidth: borders.width.thin,
    borderColor: colors.divider,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  severityTag: {
    color: colors.textPrimary,
    fontSize: 10,
    fontWeight: typography.weights.bold,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borders.radius.small,
    overflow: 'hidden',
  },
  timestamp: {
    color: colors.textMuted,
    fontSize: typography.sizes.captionSmall,
  },
  alertTitle: {
    color: colors.textPrimary,
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.bold,
    marginBottom: 2,
  },
  alertMessage: {
    color: colors.textSecondary,
    fontSize: typography.sizes.bodySmall,
    lineHeight: 18,
  },
});
