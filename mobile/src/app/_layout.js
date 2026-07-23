import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from '../context/AppProvider';
import { DeviceProvider } from '../features/devices';
import { ScheduleProvider } from '../features/scheduling';
import { colors } from '../shared/theme/colors';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <DeviceProvider>
          <ScheduleProvider>
            <Stack
              screenOptions={{
                headerStyle: { backgroundColor: colors.surface },
                headerTintColor: colors.textPrimary,
                contentStyle: { backgroundColor: colors.background },
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="floors/index" options={{ title: 'Floors List' }} />
              <Stack.Screen name="floors/[id]" options={{ title: 'Floor Details' }} />
              <Stack.Screen name="devices/[id]" options={{ title: 'Device Details' }} />
              <Stack.Screen name="schedules/index" options={{ title: 'Schedules List' }} />
              <Stack.Screen name="schedules/[id]" options={{ title: 'Schedule Details' }} />
              <Stack.Screen name="cameras/index" options={{ title: 'Cameras List' }} />
              <Stack.Screen name="cameras/[id]" options={{ title: 'Camera Stream' }} />
              <Stack.Screen name="notifications/index" options={{ title: 'Notifications' }} />
              <Stack.Screen name="notifications/[id]" options={{ title: 'Notification Details' }} />
            </Stack>
          </ScheduleProvider>
        </DeviceProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}
