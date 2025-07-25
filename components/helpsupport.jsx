import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useUserStore } from '../store/userstore';
import { useColorScheme } from 'react-native';
import { ChevronRight, Mail, HelpCircle, FileText, Shield, Lock } from 'lucide-react-native';

export default function HelpSupport() {
  const router = useRouter();
  const { getThemeColors } = useUserStore();
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);

  // Default colors in case colors is undefined
  const safeColors = colors || {
    background: '#fff',
    textPrimary: '#000',
    textSecondary: '#666',
    cardBackground: '#f8f8f8',
    orange: '#FFA500'
  };

  const supportItems = useMemo(() => [
    {
      id: 'faq',
      title: 'FAQs',
      description: 'Find answers to common questions',
      icon: <HelpCircle size={24} color={safeColors.orange} />,
      onPress: () => router.push('/helpsupport/faqs')
    },
    {
      id: 'contact',
      title: 'Contact Us',
      description: 'Reach out to our support team',
      icon: <Mail size={24} color={safeColors.orange} />,
      onPress: () => Linking.openURL('mailto:support@ideohub.com')
    },
    {
      id: 'security',
      title: 'Security Guide',
      description: 'Tips to keep your account secure',
      icon: <Lock size={24} color={safeColors.orange} />,
      onPress: () => router.push('/security-guide')
    },
  ], [router, safeColors.orange]);

  if (!colors) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: safeColors.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: safeColors.textPrimary }]}>
            Help & Support
          </Text>
          <Text style={[styles.subtitle, { color: safeColors.textSecondary }]}>
            We're here to help you with any questions or issues.
          </Text>
        </View>

        <View style={styles.section}>
          {supportItems.map((item) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.card,
                { 
                  backgroundColor: safeColors.cardBackground,
                  opacity: pressed ? 0.8 : 1,
                }
              ]}
              onPress={item.onPress}
            >
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  {item.icon}
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.cardTitle, { color: safeColors.textPrimary }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.cardDescription, { color: safeColors.textSecondary }]}>
                    {item.description}
                  </Text>
                </View>
                <ChevronRight size={20} color={safeColors.textSecondary} />
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  section: {
    marginBottom: 24,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
});
