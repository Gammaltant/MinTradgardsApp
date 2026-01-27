import { Stack } from "expo-router";

export default function TodoLayout() {
    return (
        <Stack
          screenOptions={{
            headerShown: true,
            headerStyle: { backgroundColor: "#000" },
            headerTintColor: "#fff",
            contentStyle: { backgroundColor: "#1B211A" },
          }}
        >
            <Stack.Screen name="index" options={{ title: "Dagens sysslor" }} />
            <Stack.Screen name="water" options={{ title: "Vattna" }} />
        </Stack>
    );
}