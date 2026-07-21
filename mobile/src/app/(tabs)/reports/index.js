import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../shared/theme/colors';

export default function ReportsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reports Screen</Text>
      <Text style={styles.subtitle}>Device Usage Analytics & History</Text>
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
  },
});
