import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import { colors } from '../../shared/theme/colors';

export default function DeviceDetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Device Details Screen</Text>
      <Text style={styles.subtitle}>Device ID: {id}</Text>

      <View style={styles.navGroup}>
        <Link href="/schedules/sched-iron-1" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Go to Schedule Details</Text>
          </Pressable>
        </Link>

        <Link href="/cameras/cam-front-door" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Go to Camera Stream</Text>
          </Pressable>
        </Link>
      </View>
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
  navGroup: {
    width: '100%',
    maxWidth: 320,
    gap: 12,
  },
  button: {
    backgroundColor: colors.surface,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.divider,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.primary,
    fontWeight: '600',
  },
});
