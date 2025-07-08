import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Settings, Search, Plus, Link2 } from 'lucide-react-native';
import COLORS from '../../constants/colors';
import { Dimensions } from 'react-native';
import { StatusBar, View } from 'react-native';

const statusBarHeight = StatusBar.currentHeight;

export default function TabLayout() {
  return (
    <>
    <View style={{ height: statusBarHeight,backgroundColor:
      'black'
     }} />
    <View style={{ flex: 1, backgroundColor: 'black' }}>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.orange,
        tabBarInactiveTintColor: COLORS.light.textSecondary,
        tabBarStyle: {
          borderTopColor: COLORS.light.border,
        },
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: COLORS.light.textPrimary,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{headerShown: false,
          title: 'Boards',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{headerShown: false,
          title: 'Explore',
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{headerShown: false,
          title: 'Create',
          tabBarIcon: ({ color, size }) => <Plus size={size} color={color} />,
        }}
      />
      <Tabs.Screen
      name="join"
      options={{
        headerShown: false,
        title: 'Join',
        tabBarIcon: ({ color, size }) => <Link2 size={size} color={color} />,
      }}
    />
    <Tabs.Screen
      name="settings"
      options={{
        headerShown: false,
        title: 'Settings',
        tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
      }}
    />
    </Tabs>
    
    </View>
    </>
  );
}