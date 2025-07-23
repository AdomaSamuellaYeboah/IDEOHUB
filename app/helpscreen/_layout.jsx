import { Stack } from 'expo-router';
import { useUserStore } from '../../store/userstore';
import { useColorScheme } from 'react-native';

export default function HelpSupportLayout() {
  const { theme } = useUserStore();
  const colorScheme = useColorScheme();
  const colors = useUserStore.getState().getThemeColors(colorScheme);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerShadowVisible: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{
          title: 'Help & Support',
        }} 
      />
      <Stack.Screen 
        name="faqs" 
        options={{
          title: 'FAQs',
        }} 
      />
      <Stack.Screen 
        name="privacy-policy" 
        options={{
          title: 'Privacy Policy',
        }} 
      />
      <Stack.Screen 
        name="contact" 
        options={{
          title: 'Contact Us',
        }} 
      />
    </Stack>
  );
}
