import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useUserStore } from '../store/userStore';

export default function Index() {
  const { isAuthenticated } = useUserStore();
  
  // Redirect to the appropriate screen based on authentication status
  return isAuthenticated ? <Redirect href="/(tabs)" /> : <Redirect href="/login" />;
}