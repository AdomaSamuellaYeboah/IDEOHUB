import React from 'react';
import { StyleSheet, Text, View, Pressable, Switch, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  LogOut, 
  Moon, 
  Sun, 
  Bell, 
  User, 
  Shield, 
  HelpCircle, 
  Info 
} from 'lucide-react-native';
import { useUserStore } from '../../store/userStore';
import COLORS from '../../constants/colors';

export default function SettingsScreen() {
  const router = useRouter();
  const { user, theme, setTheme, logout } = useUserStore();
  
  const handleLogout = () => {
    logout();
    router.replace('/login');
  };
  
  const isDarkMode = theme === 'dark';
  
  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.profileImagePlaceholder}>
          <Text style={styles.profileInitial}>
            {user?.name?.charAt(0) || 'U'}
          </Text>
        </View>
        <Text style={styles.profileName}>{user?.name || 'User'}</Text>
        <Text style={styles.profileEmail}>{user?.email || 'user@example.com'}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingIconContainer}>
            {isDarkMode ? (
              <Moon size={20} color={COLORS.light.textPrimary} />
            ) : (
              <Sun size={20} color={COLORS.light.textPrimary} />
            )}
          </View>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: COLORS.light.border, true: COLORS.orange }}
            thumbColor="#FFFFFF"
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingIconContainer}>
            <Bell size={20} color={COLORS.light.textPrimary} />
          </View>
          <Text style={styles.settingLabel}>Notifications</Text>
          <Switch
            value={user?.preferences?.notifications || false}
            onValueChange={() => {}}
            trackColor={{ false: COLORS.light.border, true: COLORS.orange }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <Pressable style={styles.settingItem}>
          <View style={styles.settingIconContainer}>
            <User size={20} color={COLORS.light.textPrimary} />
          </View>
          <Text style={styles.settingLabel}>Edit Profile</Text>
        </Pressable>
        
        <Pressable style={styles.settingItem}>
          <View style={styles.settingIconContainer}>
            <Shield size={20} color={COLORS.light.textPrimary} />
          </View>
          <Text style={styles.settingLabel}>Security</Text>
        </Pressable>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        
        <Pressable style={styles.settingItem}>
          <View style={styles.settingIconContainer}>
            <HelpCircle size={20} color={COLORS.light.textPrimary} />
          </View>
          <Text style={styles.settingLabel}>Help & Support</Text>
        </Pressable>
        
        <Pressable style={styles.settingItem}>
          <View style={styles.settingIconContainer}>
            <Info size={20} color={COLORS.light.textPrimary} />
          </View>
          <Text style={styles.settingLabel}>About IdeaHub</Text>
        </Pressable>
      </View>
      
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={20} color="#FFFFFF" />
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </Pressable>
      
      <Text style={styles.versionText}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.background,
  },
  profileSection: {
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light.border,
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
    color: COLORS.light.textPrimary,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: COLORS.light.textSecondary,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.light.textPrimary,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light.border,
  },
  settingIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  settingLabel: {
    flex: 1,
    fontSize: 16,
    color: COLORS.light.textPrimary,
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
    color: COLORS.light.textSecondary,
    marginBottom: 24,
  },
});