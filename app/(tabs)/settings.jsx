import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Switch, ScrollView, Platform, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LogOut, Moon, Sun, Bell, User, Shield, HelpCircle, Info, ChevronRight } from 'lucide-react-native';
import { useUserStore } from '../../store/userstore';
import COLORS from '../../constants/colors';
import { useColorScheme } from 'react-native';
import EditProfileModal from '../../components/editprofilemodal';
import NotificationsModal from '../../components/notificationsmodal';

export default function SettingsScreen() {
  const router = useRouter();
  const { user, theme, setTheme, logout, getThemeColors } = useUserStore();
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  
  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  
  // Determine if dark mode is currently active
  const isDarkModeActive = theme === 'dark' || (theme === 'system' && colorScheme === 'dark');
  
  const toggleTheme = () => {
    if (isDarkModeActive) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
              <View style={[styles.profileSection, { borderBottomColor: colors.border }]}>
        <Pressable onPress={() => setShowEditProfile(true)}>
          {user?.profileImage ? (
            <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileInitial}>
                {user?.firstName?.charAt(0) || user?.name?.charAt(0) || 'U'}
              </Text>
            </View>
          )}
        </Pressable>
        <Text style={[styles.profileName, { color: colors.textPrimary }]}>
          {user?.firstName && user?.lastName 
            ? `${user.firstName} ${user.lastName}`.trim()
            : user?.name || 'User'
          }
        </Text>
        <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>{user?.email || 'user@example.com'}</Text>
        {/* Following/Followers counts */}
        <View style={{ flexDirection: 'row', marginTop: 16 }}>
          <Text style={[styles.followCount, { color: colors.textPrimary }]}>{useUserStore.getState().followingCount()} Following {useUserStore.getState().followersCount()} Followers</Text>
        </View>
      </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Preferences</Text>
          
          <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
            <View style={styles.settingIconContainer}>
              {isDarkModeActive ? (
                <Moon size={20} color={colors.textPrimary} />
              ) : (
                <Sun size={20} color={colors.textPrimary} />
              )}
            </View>
            <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>
              Dark Mode
            </Text>
            <Switch
              value={isDarkModeActive}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: COLORS.orange }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <Pressable 
            style={[styles.settingItem, { borderBottomColor: colors.border }]}
            onPress={() => setShowNotificationsModal(true)}
          >
            <View style={styles.settingIconContainer}>
              <Bell size={20} color={colors.textPrimary} />
            </View>
            <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>Notifications</Text>
            
          </Pressable>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Account</Text>
          
          <Pressable 
            style={[styles.settingItem, { borderBottomColor: colors.border }]}
            onPress={() => setShowEditProfile(true)}
          >
            <View style={styles.settingIconContainer}>
              <User size={20} color={colors.textPrimary} />
            </View>
            <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>Edit Profile</Text>
          </Pressable>
          
          <Pressable style={[styles.settingItem, { borderBottomColor: colors.border }]}
            onPress={() => router.push('/security')}>
            <View style={styles.settingIconContainer}>
              <Shield size={20} color={colors.textPrimary} />
            </View>
            <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>Security</Text>
          </Pressable>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>About</Text>
          
          <Pressable 
            style={[styles.settingItem, { borderBottomColor: colors.border }]}
            onPress={() => router.push('/helpscreen')}
          >
            <View style={styles.settingIconContainer}>
              <HelpCircle size={20} color={colors.textPrimary} />
            </View>
            <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>Help & Support</Text>
            <ChevronRight size={20} color={colors.textSecondary} />
          </Pressable>
          
          <Pressable 
            style={[styles.settingItem, { borderBottomColor: colors.border }]}
            onPress={() => router.push('/about')}
          >
            <View style={styles.settingIconContainer}>
              <Info size={20} color={colors.textPrimary} />
            </View>
            <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>About IdeoHub</Text>
            <ChevronRight size={20} color={colors.textSecondary} />
          </Pressable>
        </View>
        
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#FFFFFF" />
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </Pressable>
        
        <Text style={[styles.versionText, { color: colors.textSecondary }]}>Version 1.0.0</Text>
      </ScrollView>
      
      <EditProfileModal 
        visible={showEditProfile}
        onClose={() => setShowEditProfile(false)}
      />
      <NotificationsModal
        visible={showNotificationsModal}
        onClose={() => setShowNotificationsModal(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.orange,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileInitial: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  settingLabel: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.red,
    marginHorizontal: 16,
    marginTop: 32,
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  versionText: {
    textAlign: 'center',
    marginBottom: 24,
  },
});