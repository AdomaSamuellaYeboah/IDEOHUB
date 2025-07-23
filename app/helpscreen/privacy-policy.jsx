import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useUserStore } from '../../store/userstore';
import { useColorScheme } from 'react-native';
import { ArrowUpRight, Shield, Mail, Lock } from 'lucide-react-native';

export default function PrivacyPolicyScreen() {
  const router = useRouter();
  const { theme } = useUserStore();
  const colorScheme = useColorScheme();
  const colors = useUserStore.getState().getThemeColors(colorScheme);
  
  const handleContactPress = () => {
    router.push('/helpscreen/contact');
  };

  const handleEmailPress = async () => {
    await Linking.openURL('mailto:privacy@ideohub.com');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
            <Shield size={24} color={colors.primary} />
          </View>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Privacy Policy</Text>
          <Text style={[styles.lastUpdated, { color: colors.textSecondary }]}>
            Last updated: July 21, 2025
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            At IdeoHub, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our app.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            1. Information We Collect
          </Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            We collect information you provide when you create an account, update your profile, or communicate with us. This may include your name, email address, profile picture, and other information you choose to provide.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            2. How We Use Your Information
          </Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            We use your information to provide and improve our services, communicate with you, and ensure the security of your account. We may also use your information to send you updates and promotional materials, but you can opt out at any time.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            3. Information Sharing
          </Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            We do not sell or rent your personal information to third parties. We may share your information with service providers who assist us in operating our services, but only to the extent necessary to provide those services.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            4. Data Security
          </Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            5. Your Rights
          </Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            You have the right to access, correct, or delete your personal information. You can also object to or restrict certain processing of your data. To exercise these rights, please contact us using the information below.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            6. Changes to This Policy
          </Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </Text>

          <View style={[styles.contactCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <Lock size={24} color={colors.primary} style={styles.contactIcon} />
            <Text style={[styles.contactTitle, { color: colors.textPrimary }]}>Questions?</Text>
            <Text style={[styles.contactText, { color: colors.textSecondary }]}>
              If you have any questions about this Privacy Policy, please contact us.
            </Text>
            <Pressable 
              style={[styles.contactButton, { borderColor: colors.border }]}
              onPress={handleEmailPress}
            >
              <Mail size={16} color={colors.primary} style={styles.buttonIcon} />
              <Text style={[styles.contactButtonText, { color: colors.primary }]}>privacy@ideohub.com</Text>
              <ArrowUpRight size={16} color={colors.primary} />
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
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 8,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 14,
    opacity: 0.8,
  },
  content: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  contactCard: {
    marginTop: 32,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    alignItems: 'center',
  },
  contactIcon: {
    marginBottom: 12,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  buttonIcon: {
    marginRight: 8,
  },
  contactButtonText: {
    fontSize: 15,
    fontWeight: '500',
    marginRight: 8,
  },
});
