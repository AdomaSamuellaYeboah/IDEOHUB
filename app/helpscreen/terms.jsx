import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useUserStore } from '../../store/userstore';
import { useColorScheme } from 'react-native';
import { ArrowUpRight, FileText, Mail } from 'lucide-react-native';

export default function TermsOfServiceScreen() {
  const router = useRouter();
  const { theme } = useUserStore();
  const colorScheme = useColorScheme();
  const colors = useUserStore.getState().getThemeColors(colorScheme);
  
  const handleContactPress = () => {
    router.push('/helpscreen/contact');
  };

  const handleEmailPress = async () => {
    await Linking.openURL('mailto:legal@ideohub.com');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
            <FileText size={24} color={colors.primary} />
          </View>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Terms of Service</Text>
          <Text style={[styles.lastUpdated, { color: colors.textSecondary }]}>
            Last updated: July 21, 2025
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            Welcome to IdeoHub! These Terms of Service ("Terms") govern your access to and use of the IdeoHub mobile application and related services (collectively, the "Service").
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            1. Acceptance of Terms
          </Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            2. User Accounts
          </Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            You must be at least 13 years old to use the Service. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            3. User Content
          </Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            You retain ownership of any content you post to the Service. By posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such content in connection with the Service.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            4. Prohibited Conduct
          </Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            You agree not to use the Service to: post harmful or illegal content; harass or bully others; violate intellectual property rights; distribute spam; or interfere with the Service's operation.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            5. Termination
          </Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            We may terminate or suspend your account and access to the Service at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            6. Disclaimers
          </Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            The Service is provided "as is" without warranties of any kind. We do not guarantee that the Service will be uninterrupted, secure, or error-free.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            7. Limitation of Liability
          </Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            8. Changes to Terms
          </Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            We may modify these Terms at any time. We will provide notice of significant changes through the Service or by other means. Your continued use of the Service constitutes acceptance of the modified Terms.
          </Text>

          <View style={[styles.contactCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <FileText size={24} color={colors.primary} style={styles.contactIcon} />
            <Text style={[styles.contactTitle, { color: colors.textPrimary }]}>Need Help?</Text>
            <Text style={[styles.contactText, { color: colors.textSecondary }]}>
              If you have any questions about these Terms, please contact us.
            </Text>
            <Pressable 
              style={[styles.contactButton, { borderColor: colors.border }]}
              onPress={handleEmailPress}
            >
              <Mail size={16} color={colors.primary} style={styles.buttonIcon} />
              <Text style={[styles.contactButtonText, { color: colors.primary }]}>legal@ideohub.com</Text>
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
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  lastUpdated: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 5,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  contactCard: {
    marginTop: 30,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  contactIcon: {
    marginBottom: 10,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 15,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'flex-start',
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
