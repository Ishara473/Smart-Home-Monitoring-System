import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import { colors } from '../../shared/theme/colors';

export default function FloorDetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Floor Details Screen</Text>
      <Text style={styles.subtitle}>Floor ID: {id}</Text>

      <Link href="/devices/dev-iron-1" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>View Device Details (Iron 1)</Text>
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
