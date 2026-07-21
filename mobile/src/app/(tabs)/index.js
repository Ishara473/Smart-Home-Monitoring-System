import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { colors } from '../../shared/theme/colors';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard Screen</Text>
      <Text style={styles.subtitle}>Smart Home Command Center</Text>

      <View style={styles.navGroup}>
        <Link href="/floors" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Go to Floors List</Text>
          </Pressable>
        </Link>

        <Link href="/floors/ground-floor" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Go to Floor Details (Ground Floor)</Text>
          </Pressable>
        </Link>

        <Link href="/devices/dev-outlet-1" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Go to Device Details (Outlet 1)</Text>
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
    fontSize: 14,
  },
});
