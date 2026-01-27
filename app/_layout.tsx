import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#fff",
        contentStyle: { backgroundColor: "#1B211A"},
      }}
      >
        {/* Tabs-delen; ingen header */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Vanliga sidor: header på */}
        <Stack.Screen name="menu" options={{ title: "Meny" }} />
        <Stack.Screen name="plants" options={{ title: "Mina växter" }} />
        <Stack.Screen name="todo" options={{ headerShown: false}} />

        {/* Modal */}
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
