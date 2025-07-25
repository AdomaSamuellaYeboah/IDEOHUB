import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { useUserStore } from '../../store/userstore';
import { useColorScheme } from 'react-native';
import { 
  ChevronLeft,
  Shield,
  Lock,
  Key,
  AlertTriangle,
  Smartphone,
  Mail,
  CheckCircle2
} from 'lucide-react-native';

export default function SecurityGuide() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = useUserStore.getState().getThemeColors(colorScheme);

  const securityTips = [
    {
      id: 'strong-password',
      icon: <Lock size={20} color={colors.orange} />,
      title: 'Use Strong Passwords',
      description: 'Create complex passwords with a mix of letters, numbers, and special characters. Avoid using easily guessable information like birthdays or common words.'
    },
    {
      id: '2fa',
      icon: <CheckCircle2 size={20} color={colors.orange} />,
      title: 'Enable Two-Factor Authentication',
      description: 'Add an extra layer of security to your account by enabling 2FA. This requires a second form of verification beyond just your password.'
    },
    {
      id: 'device-security',
      icon: <Smartphone size={20} color={colors.orange} />,
      title: 'Secure Your Devices',
      description: 'Keep your devices locked with a passcode or biometric authentication. Install security updates and use reputable antivirus software.'
    },
    {
      id: 'phishing',
      icon: <AlertTriangle size={20} color={colors.orange} />,
      title: 'Beware of Phishing',
      description: 'Be cautious of suspicious emails or messages asking for personal information. Never share your login credentials with anyone.'
    },
    {
      id: 'session',
      icon: <Key size={20} color={colors.orange} />,
      title: 'Manage Active Sessions',
      description: 'Regularly review and sign out of unused devices. Change your password immediately if you notice any suspicious activity.'
    }
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.cardBackground }]}>
        <Pressable 
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={10}
        >
          <ChevronLeft size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          Security Guide
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.hero, { backgroundColor: colors.cardBackground }]}>
          <View style={[styles.iconContainer, { backgroundColor: `${colors.orange}15` }]}>
            <Shield size={32} color={colors.orange} />
          </View>
          <Text style={[styles.heroTitle, { color: colors.textPrimary }]}>
            Your Security Matters
          </Text>
          <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
            Follow these essential security practices to keep your account and data safe.
          </Text>
        </View>

        <View style={styles.tipsContainer}>
          {securityTips.map((tip) => (
            <View 
              key={tip.id} 
              style={[styles.tipCard, { backgroundColor: colors.cardBackground }]}
            >
              <View style={styles.tipIconContainer}>
                {tip.icon}
              </View>
              <View style={styles.tipTextContainer}>
                <Text style={[styles.tipTitle, { color: colors.textPrimary }]}>
                  {tip.title}
                </Text>
                <Text style={[styles.tipDescription, { color: colors.textSecondary }]}>
                  {tip.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={[styles.contactCard, { backgroundColor: colors.cardBackground }]}>
          <Mail size={24} color={colors.orange} />
          <View style={styles.contactTextContainer}>
            <Text style={[styles.contactTitle, { color: colors.textPrimary }]}>
              Need Help?
            </Text>
            <Text style={[styles.contactDescription, { color: colors.textSecondary }]}>
              Contact our security team for any concerns or questions about your account security.
            </Text>
          </View>
          <Pressable 
            onPress={() => Linking.openURL('mailto:security@ideohub.com')}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text style={[styles.contactButton, { color: colors.orange }]}>
              Contact Us
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  hero: {
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  tipsContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  tipCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  tipIconContainer: {
    marginRight: 16,
    justifyContent: 'center',
  },
  tipTextContainer: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  contactCard: {
    marginHorizontal: 16,
    marginBottom: 32,
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  contactTextContainer: {
    flex: 1,
    marginLeft: 16,
    marginRight: 12,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: '#666',
  },
  contactButton: {
    fontSize: 14,
    fontWeight: '600',
  },
});
