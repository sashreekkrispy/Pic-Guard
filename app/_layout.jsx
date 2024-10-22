import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-Bold': require('./../assets/fonts/Outfit-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Optional: add a loading indicator
  }

  return (
    <Stack>
      <Stack.Screen name="Login/WelcomeScreen" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="Login/LoginPage" options={{ headerShown: false }} />
      
    </Stack>
  );
}
