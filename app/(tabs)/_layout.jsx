import React from "react";
import { Tabs } from "expo-router";
import {
  Home,
  Settings,
  Search,
  Plus,
  Link2,
  Brain,
} from "lucide-react-native";
import COLORS from "../../constants/colors";
import { Dimensions } from "react-native";
import { StatusBar, View } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { useUserStore } from "../../store/userstore";

const statusBarHeight = StatusBar.currentHeight;

export default function TabLayout() {
  const { getThemeColors } = useUserStore();
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);

  return (
    <>
      <ExpoStatusBar style="auto" translucent={false} hidden={false} />
      <View style={{ height: statusBarHeight, backgroundColor: colors.background }} />
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: COLORS.orange,
            tabBarInactiveTintColor: colors.textSecondary,
            tabBarStyle: {
              borderTopColor: colors.border,
              backgroundColor: colors.background,
            },
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Boards",
              tabBarIcon: ({ color }) => <Home size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: "Explore",
              tabBarIcon: ({ color }) => <Search size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="chat"
            options={{
              title: "Ideo AI",
              tabBarIcon: ({ color }) => <Brain size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="join"
            options={{
              title: "Join",
              tabBarIcon: ({ color }) => <Link2 size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: "Settings",
              tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
            }}
          />
        </Tabs>
      </View>
    </>
  );
}
