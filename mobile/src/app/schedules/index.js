import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { colors } from '../../shared/theme/colors';

export default function SchedulesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedules Screen</Text>
      <Text style={styles.subtitle}>Appliance Operating Schedules</Text>

      <Link href="/schedules/sched-iron-1" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Open Schedule Details</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  button: {
    backgroundColor: colors.surface,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  buttonText: {
    color: colors.primary,
    fontWeight: '600',
  },
});
