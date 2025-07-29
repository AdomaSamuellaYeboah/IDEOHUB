import About from '../components/about';
import { Stack } from 'expo-router';

export default function AboutScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <About />
    </>
  );
}
