import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme, View, StyleSheet } from "react-native";
import { useUserStore } from "../store/userstore";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  const { theme } = useUserStore();
  const colorScheme = useColorScheme();

  // Determine the actual theme to use (user preference or system default)
  const actualTheme = theme === "system" ? colorScheme || "dark" : theme;

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
    return <View style={styles.splashContainer} />;
  }

  return (
    <>
      <ExpoStatusBar style={actualTheme === "dark" ? "light" : "dark"} />
      <RootLayoutNav />
      <Toast />
    </>
  );
}

function RootLayoutNav() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
      <Stack.Screen name="security" options={{ headerShown: false }} />
      <Stack.Screen name="template-details" options={{ headerShown: false }} />
      <Stack.Screen
        name="boards/[id]"
        options={{
          headerTitle: "",
          headerBackTitle: "Boards",
          headerStyle: {
            backgroundColor: "black",
          },
        }}
      />
      <Stack.Screen
        name="createboard/[id]"
        options={{
          headerTitle: "",
          headerBackTitle: "Boards",
          headerShown: false,
          headerStyle: {
            backgroundColor: "black",
          },
        }}
      />
      {/* Help & Support Group */}
      <Stack.Screen
        name="helpscreen"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "black",
  },
});
