import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Pressable, TextInput, Alert, ScrollView } from 'react-native';
import { X } from 'lucide-react-native';
import COLORS from '../constants/colors';

export default function SecurityModal({ visible, onClose, colors }) {
  // Change Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDeleteText, setConfirmDeleteText] = useState('');

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
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeleteAccount = () => {
    setIsDeleting(false);
    setConfirmDeleteText('');
    Alert.alert('Account Deleted', 'Your account has been deleted (mock).');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.3)' }] }>
        <View style={[styles.modalContainer, { backgroundColor: colors.cardBackground }] }>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>Security Settings</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.textPrimary} />
            </Pressable>
          </View>
          <ScrollView>

            {/* Change Password */}
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Change Password</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.textPrimary, borderColor: colors.border }]}
              placeholder="Current Password"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.textPrimary, borderColor: colors.border }]}
              placeholder="New Password"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.textPrimary, borderColor: colors.border }]}
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
            <Text style={[styles.deleteWarning, { color: COLORS.red}]}>This will permanently erase all your data. This action cannot be undone.</Text>

            <Pressable style={[styles.deleteButton]} onPress={() => setIsDeleting(true)}>
              <Text style={styles.deleteButtonText}>Delete Account</Text>
            </Pressable>
          </ScrollView>
        </View>
        {/* Delete Confirmation Dialog */}
        {isDeleting && (
          <View style={styles.confirmOverlay}>
            <View style={[styles.confirmBox, { backgroundColor: colors.cardBackground }] }>
              <Text style={[styles.confirmText, { color: colors.textPrimary }]}>Are you sure you want to delete your account?</Text>
              <Text style={[styles.confirmText, { color: COLORS.red, marginBottom: 8 }]}>This action is permanent and cannot be undone. Type &apos;DELETE&apos; to confirm.</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.background, color: colors.textPrimary, borderColor: colors.border, marginBottom: 8 }]}
                placeholder="Type DELETE to confirm"
                placeholderTextColor={colors.textSecondary}
                value={confirmDeleteText}
                onChangeText={setConfirmDeleteText}
                autoCapitalize="characters"
              />
              <View style={styles.confirmActions}>
                <Pressable style={styles.confirmCancel} onPress={() => { setIsDeleting(false); setConfirmDeleteText(''); }}>
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
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    borderRadius: 16,
    padding: 24,
    maxHeight: '85%',
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  helperText: {
    fontSize: 12,
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: COLORS.red,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 4,
    minWidth: 120,
},
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteWarning: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 0,
},
  cancelButton: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
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
    width: 280,
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
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  confirmDelete: {
    flex: 1,
    backgroundColor: COLORS.red,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
}); 