import { Tabs } from 'expo-router';
import { colors } from '../../shared/theme/colors';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: '#1e293b', borderTopColor: '#334155' },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerStyle: { backgroundColor: '#1e293b' },
        headerTintColor: colors.textPrimary,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          headerTitle: 'Dashboard',
        }}
      />
      <Tabs.Screen
        name="reports/index"
        options={{
          title: 'Reports',
          headerTitle: 'Reports',
        }}
      />
      <Tabs.Screen
        name="notifications/index"
        options={{
          title: 'Notifications',
          headerTitle: 'Notifications',
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: 'Settings',
          headerTitle: 'Settings',
        }}
      />
    </Tabs>
  );
}
