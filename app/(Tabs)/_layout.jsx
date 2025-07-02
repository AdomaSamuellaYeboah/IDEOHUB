import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Settings, Search } from 'lucide-react-native';
import COLORS from '../../constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.orange,
        tabBarInactiveTintColor: COLORS.light.textSecondary,
        tabBarStyle: {
          borderTopColor: COLORS.light.border,
        },
        headerStyle: {
          backgroundColor: COLORS.light.background,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: COLORS.light.textPrimary,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Boards',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}