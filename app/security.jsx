import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Alert, ScrollView, Switch } from 'react-native';
import { ArrowLeft, Shield, Smartphone } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useUserStore } from '../store/userstore';
import COLORS from '../constants/colors';
import { useColorScheme } from 'react-native';

export default function SecurityScreen() {
  const router = useRouter();
  const { getThemeColors } = useUserStore();
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  
  // Change Password State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDeleteText, setConfirmDeleteText] = useState('');
  
  // Two-Factor Authentication State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }
    // Mock password change
    Alert.alert('Success', 'Password changed successfully!');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeleteAccount = () => {
    setIsDeleting(false);
    setConfirmDeleteText('');
    Alert.alert('Account Deleted', 'Your account has been deleted (mock).');
    router.back();
  };

  const handleTwoFactorToggle = (value) => {
    if (value) {
      setShowTwoFactorSetup(true);
    } else {
      Alert.alert(
        'Disable 2FA',
        'Are you sure you want to disable two-factor authentication?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Disable', 
            style: 'destructive',
            onPress: () => {
              setTwoFactorEnabled(false);
              Alert.alert('Success', 'Two-factor authentication has been disabled.');
            }
          }
        ]
      );
    }
  };

  const handleVerifyTwoFactor = () => {
    if (verificationCode.length === 6) {
      setTwoFactorEnabled(true);
      setShowTwoFactorSetup(false);
      setVerificationCode('');
      Alert.alert('Success', 'Two-factor authentication has been enabled!');
    } else {
      Alert.alert('Error', 'Please enter a valid 6-digit verification code.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Security Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* Two-Factor Authentication */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Two-Factor Authentication</Text>
        <View style={[styles.settingItem, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.settingContent}>
            <View style={styles.settingIconContainer}>
              <Smartphone size={20} color={colors.textPrimary} />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>
                Enable Two-Factor Authentication
              </Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                Add an extra layer of security to your account
              </Text>
            </View>
          </View>
          <Switch
            value={twoFactorEnabled}
            onValueChange={handleTwoFactorToggle}
            trackColor={{ false: colors.border, true: COLORS.orange }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Change Password */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Change Password</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.cardBackground, color: colors.textPrimary, borderColor: colors.border }]}
          placeholder="New Password"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={[styles.input, { backgroundColor: colors.cardBackground, color: colors.textPrimary, borderColor: colors.border }]}
          placeholder="Confirm New Password"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Pressable style={[styles.button, { backgroundColor: COLORS.orange }]} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </Pressable>

        {/* Account Deletion */}
        <Text style={[styles.deleteWarning, { color: COLORS.red}]}>
          This will permanently erase all your data. This action cannot be undone.
        </Text>

        <Pressable style={styles.deleteButton} onPress={() => setIsDeleting(true)}>
          <Text style={styles.deleteButtonText}>Delete Account</Text>
        </Pressable>
      </ScrollView>

      {/* Two-Factor Setup Modal */}
      {showTwoFactorSetup && (
        <View style={styles.confirmOverlay}>
          <View style={[styles.confirmBox, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.confirmText, { color: colors.textPrimary }]}>
              Set Up Two-Factor Authentication
            </Text>
            <Text style={[styles.confirmText, { color: colors.textSecondary, marginBottom: 16 }]}>
              Enter the 6-digit verification code sent to your phone
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.textPrimary, borderColor: colors.border, marginBottom: 16 }]}
              placeholder="Enter 6-digit code"
              placeholderTextColor={colors.textSecondary}
              value={verificationCode}
              onChangeText={setVerificationCode}
              keyboardType="numeric"
              maxLength={6}
            />
            <View style={styles.confirmActions}>
              <Pressable 
                style={styles.confirmCancel} 
                onPress={() => { setShowTwoFactorSetup(false); setVerificationCode(''); }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.confirmButton, { backgroundColor: COLORS.orange }]}
                onPress={handleVerifyTwoFactor}
              >
                <Text style={styles.buttonText}>Verify</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleting && (
        <View style={styles.confirmOverlay}>
          <View style={[styles.confirmBox, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.confirmText, { color: colors.textPrimary }]}>
              Are you sure you want to delete your account?
            </Text>
            <Text style={[styles.confirmText, { color: COLORS.red, marginBottom: 8 }]}>
              This action is permanent and cannot be undone. Type 'DELETE' to confirm.
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.textPrimary, borderColor: colors.border, marginBottom: 8 }]}
              placeholder="Type DELETE to confirm"
              placeholderTextColor={colors.textSecondary}
              value={confirmDeleteText}
              onChangeText={setConfirmDeleteText}
              autoCapitalize="characters"
            />
            <View style={styles.confirmActions}>
              <Pressable 
                style={styles.confirmCancel} 
                onPress={() => { setIsDeleting(false); setConfirmDeleteText(''); }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.confirmDelete, { opacity: confirmDeleteText === 'DELETE' ? 1 : 0.5 }]}
                onPress={handleDeleteAccount}
                disabled={confirmDeleteText !== 'DELETE'}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 70,
    paddingHorizontal: 16,
    paddingBottom: 30,
    borderBottomWidth: 2,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 32,
    alignSelf: 'center',
    minWidth: 140,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: COLORS.red,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 24,
    minWidth: 140,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteWarning: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 8,
    lineHeight: 20,
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBox: {
    borderRadius: 12,
    padding: 24,
    width: 300,
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  confirmActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmCancel: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  confirmDelete: {
    flex: 1,
    backgroundColor: COLORS.red,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  statusCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  statusItems: {
    gap: 12,
  },
  statusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 14,
  },
  statusIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  settingTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
  },
  confirmButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
}); 