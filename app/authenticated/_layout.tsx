
import { Stack } from 'expo-router';

export default function AuthenticatedStack() {
  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_right'
      }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="resetPassword"
        options={{
          headerShown: true,
          title: "Reset Password",
          headerTitleStyle: { fontFamily: "GroteskBold" }
        }}
      />
    </Stack>
  );
}
