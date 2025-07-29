import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useUserStore } from '../../store/userstore';
import { useColorScheme } from 'react-native';
import { 
  HelpCircle, 
  MessageSquare, 
  Shield, 
  FileText, 
  ChevronRight,
  Mail,
  Phone,
  Globe,
  MessageCircle
} from 'lucide-react-native';

export default function HelpSupportScreen() {
  const router = useRouter();
  const { theme } = useUserStore();
  const colorScheme = useColorScheme();
  const colors = useUserStore.getState().getThemeColors(colorScheme);

  const supportOptions = [
    {
      id: 'faqs',
      title: 'FAQs',
      description: 'Find answers to common questions',
      icon: HelpCircle,
      onPress: () => router.push('/helpscreen/faqs'),
    },
    {
      id: 'contact',
      title: 'Contact Us',
      description: 'Get in touch with our support team',
      icon: MessageSquare,
      onPress: () => router.push('/helpscreen/contact'),
    },
    {
      id: 'security',
      title: 'Security Guide',
      description: 'Tips to keep your account secure',
      icon: Shield,
      onPress: () => router.push('/helpscreen/security-guide')
    },
    
  ];

  const contactMethods = [
    {
      id: 'email',
      title: 'Email Support',
      value: 'support@ideohub.com',
      icon: Mail,
      onPress: () => Linking.openURL('mailto:support@ideohub.com'),
    },
    {
      id: 'phone',
      title: 'Call Us',
      value: '+233207220443',
      icon: Phone,
      onPress: () => Linking.openURL('tel:+233207220443'),
    },
    {
      id: 'website',
      title: 'Visit Our Website',
      value: 'www.ideohub.com',
      icon: Globe,
      onPress: () => Linking.openURL('https://www.ideohub.com'),
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>How can we help?</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Find answers or get in touch with our support team
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Support Options</Text>
          <View style={styles.optionsContainer}>
            {supportOptions.map((option) => (
              <Pressable
                key={option.id}
                style={({ pressed }) => [
                  styles.optionCard,
                  { 
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                    opacity: pressed ? 0.8 : 1,
                  }
                ]}
                onPress={option.onPress}
              >
                <View style={[styles.optionIconContainer, { backgroundColor: colors.primary + '15' }]}>
                  <option.icon size={20} color={colors.orange} />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={[styles.optionTitle, { color: colors.textPrimary }]}>
                    {option.title}
                  </Text>
                  <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>
                    {option.description}
                  </Text>
                </View>
                <ChevronRight size={20} color={colors.textSecondary} />
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Contact Us Directly
          </Text>
          <View style={styles.contactContainer}>
            {contactMethods.map((method) => (
              <Pressable
                key={method.id}
                style={({ pressed }) => [
                  styles.contactCard,
                  { 
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                    opacity: pressed ? 0.8 : 1,
                  }
                ]}
                onPress={method.onPress}
              >
                <View style={[styles.contactIconContainer, { backgroundColor: colors.primary + '15' }]}>
                  <method.icon size={18} color={colors.orange} />
                </View>
                <View style={styles.contactTextContainer}>
                  <Text style={[styles.contactTitle, { color: colors.textPrimary }]}>
                    {method.title}
                  </Text>
                  <Text style={[styles.contactValue, { color: colors.textSecondary }]}>
                    {method.value}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={[styles.chatSection, { backgroundColor: colors.primary + '10' }]}>
          <View style={styles.chatContent}>
            <View style={[styles.chatIcon, { backgroundColor: colors.primary + '20' }]}>
              <MessageCircle size={24} color={colors.orange} />
            </View>
            <View style={styles.chatTextContainer}>
              <Text style={[styles.chatTitle, { color: colors.textPrimary }]}>
                Chat with us
              </Text>
              <Text style={[styles.chatDescription, { color: colors.textSecondary }]}>
                Our team is here to help in real-time
              </Text>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.chatButton,
                { 
                  backgroundColor: colors.primary,
                  opacity: pressed ? 0.9 : 1,
                }
              ]}
              onPress={() => {
                // In a real app, this would open a chat interface
                Alert.alert('Chat', 'Chat feature will be available soon!');
              }}
            >
              <Text style={styles.chatButtonText}>Chat Now</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 12,
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
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 13,
    opacity: 0.8,
  },
  contactContainer: {
    gap: 12,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactTextContainer: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 14,
    opacity: 0.8,
  },
  chatSection: {
    margin: 20,
    borderRadius: 16,
    padding: 20,
    marginTop: 0,
  },
  chatContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom:60,
  },
  chatIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  chatTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  chatDescription: {
    fontSize: 13,
    opacity: 0.8,
  },
  chatButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  chatButtonText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 14,
  },
});
