import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { useUserStore } from "../store/userstore";



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });
  
  const { theme } = useUserStore();
  const colorScheme = useColorScheme();
  
  // Determine the actual theme to use (user preference or system default)
  const actualTheme = theme === 'system' ? colorScheme || 'light' : theme;

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Stack>
      {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
      <Stack.Screen 
        name="boards/[id]" 
        options={{ 
          headerTitle: "",
          headerBackTitle: "Boards",
        }} 
      />
      {/* <Stack.Screen 
        name="boards/create" 
        options={{ 
          headerTitle: "Create Board",
          presentation: "modal",
        }} 
      /> */}
    </Stack>
  );
}