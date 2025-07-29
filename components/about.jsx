import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useUserStore } from '../store/userstore';
import { useColorScheme } from 'react-native';
import { ArrowUpRight, Users, Code, Shield, Star, FileText, Globe } from 'lucide-react-native';

const APP_VERSION = '1.0.0';

export default function About() {
  const router = useRouter();
  const { theme } = useUserStore();
  const colorScheme = useColorScheme();
  // Memoize the colors to prevent unnecessary re-renders
  const colors = useMemo(() => useUserStore.getState().getThemeColors(colorScheme), [colorScheme]);

  const teamMembers = [
    { name: 'Adoma Samuella Yeboah', role: 'Founder & CEO' },
    { name: 'Nuhu Haruna', role: 'Lead Developer' },
    { name: 'Dinko Ntewini Michael', role: 'UI/UX Designer' },
    { name: 'Leonard Odum Baidoo', role: 'Community Manager' },
  ];

  const openExternalLink = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View style={[styles.logoContainer, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.logoText, { color: colors.orange }]}>ID</Text>
          </View>
          <Text style={[styles.appName, { color: colors.textPrimary }]}>IdeoHub</Text>
          <Text style={[styles.version, { color: colors.textSecondary }]}>Version {APP_VERSION}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            About IdeoHub
          </Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            IdeoHub is a platform designed to bring creative minds together to share, collaborate, and bring ideas to life. 
          </Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            Our mission is to empower innovators and creators by providing the tools and community they need to succeed.
          </Text>
          <Pressable 
            onPress={() => openExternalLink('https://www.ideohub.com')}
            style={({ pressed }) => [
              styles.websiteLink,
              { 
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
                opacity: pressed ? 0.8 : 1
              }
            ]}
          >
            <Globe size={20} color={colors.orange} style={{ marginRight: 10}} />
            <View style={styles.websiteLinkContainer}>
              <Text style={[styles.websiteLinkText, { color: colors.textPrimary }]}>Visit Our Website</Text>
              <Text style={[styles.websiteLinkText, { color: colors.textSecondary }]}>www.ideohub.com</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.section}>
          <View style={[styles.infoCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <View style={styles.infoItem}>
              <Users size={20} color={colors.orange} />
              <Text style={[styles.infoText, { color: colors.textPrimary }]}>
                <Text style={{ fontWeight: '600' }}>10,000+</Text> Active Users
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.infoItem}>
              <Code size={20} color={colors.orange} />
              <Text style={[styles.infoText, { color: colors.textPrimary }]}>
                <Text style={{ fontWeight: '600' }}>1,500+</Text> Projects Created
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.infoItem}>
              <Star size={20} color={colors.orange} />
              <Text style={[styles.infoText, { color: colors.textPrimary }]}>
                <Text style={{ fontWeight: '600' }}>4.9</Text> Average Rating
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Legal
          </Text>
         
          <Pressable 
            style={({ pressed }) => [
              styles.linkItem, 
              { 
                backgroundColor: colors.cardBackground,
                opacity: pressed ? 0.8 : 1,
                borderColor: colors.border
              }
            ]}
            onPress={() => router.push('helpscreen/privacy-policy')}
          >
            <Shield size={20} color={colors.orange} />
            <View>
            <Text style={[styles.linkText, { color: colors.textPrimary }]}>Privacy Policy</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Here's how we protect your data</Text>
            </View>
            <ArrowUpRight size={18} color={colors.textSecondary} />
          </Pressable>
          <Pressable 
            style={({ pressed }) => [
              styles.linkItem, 
              { 
                backgroundColor: colors.cardBackground,
                opacity: pressed ? 0.8 : 1,
                borderColor: colors.border
              }
            ]}
            onPress={() => router.push('helpscreen/terms')}
          >
            <FileText size={20} color={colors.orange} />
            <View>
            <Text style={[styles.linkText, { color: colors.textPrimary }]}>Terms of Service</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Important Info About Using Our Services</Text>
            </View>
            <ArrowUpRight size={18} color={colors.textSecondary} />
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Our Team
          </Text>
          <View style={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <View 
                key={index} 
                style={[styles.teamMember, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
              >
                <View style={[styles.avatar, { backgroundColor: 'rgba(244, 163, 0, 0.1)' }]}>
                  <Text style={[styles.avatarText, { color: colors.orange }]}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                <Text style={[styles.memberName, { color: colors.textPrimary }]}>{member.name}</Text>
                <Text style={[styles.memberRole, { color: colors.textSecondary }]}>{member.role}</Text>
              </View>
            ))}
          </View>
        </View>

        

        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          <Text style={[styles.copyright, { color: colors.textSecondary }]}>
            © {new Date().getFullYear()} IdeoHub. All rights reserved.
          </Text>
          <View style={styles.socialLinks}>
            <Pressable 
              style={({ pressed }) => [
                styles.socialIcon,
                { opacity: pressed ? 0.8 : 1 }
              ]}
              onPress={() => openExternalLink('https://twitter.com/ideohub')}
            >
              <Text style={{ color: colors.orange }}>𝕏</Text>
            </Pressable>
            <Pressable 
              style={({ pressed }) => [
                styles.socialIcon,
                { opacity: pressed ? 0.8 : 1 }
              ]}
              onPress={() => openExternalLink('https://instagram.com/ideohub')}
            >
              <Text style={{ color: colors.orange }}>📸</Text>
            </Pressable>
            <Pressable 
              style={({ pressed }) => [
                styles.socialIcon,
                { opacity: pressed ? 0.8 : 1 }
              ]}
              onPress={() => openExternalLink('https://github.com/ideohub')}
            >
              <Text style={{ color: colors.orange }}>🐙</Text>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  version: {
    fontSize: 14,
    opacity: 0.8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  infoCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 15,
  },
  divider: {
    height: 1,
    width: '100%',
    opacity: 0.5,
  },
  teamGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  teamMember: {
    width: '47%',
    borderRadius: 12,
    padding: 16,
    margin: 6,
    alignItems: 'center',
    borderWidth: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  memberName: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 4,
    textAlign: 'center',
  },
  memberRole: {
    fontSize: 13,
    opacity: 0.8,
    textAlign: 'center',
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  linkText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
  },
  footer: {
    paddingTop: 24,
    marginTop: 8,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  copyright: {
    fontSize: 13,
    marginBottom: 16,
    textAlign: 'center',
  },
  socialLinks: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },
  websiteLink: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 12,
    justifyContent: '',
  },
  websiteLinkText: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
});
