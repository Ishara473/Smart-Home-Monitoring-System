import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#1e293b' },
        headerTintColor: '#f8fafc',
        contentStyle: { backgroundColor: '#0f172a' },
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
    </Stack>
  );
}
