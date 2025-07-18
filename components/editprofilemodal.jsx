import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Pressable, 
  Modal, 
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
  Modal as RNModal,
  TouchableWithoutFeedback
} from 'react-native';
import { X, Save, User, Camera, Image as ImageIcon } from 'lucide-react-native';
import { useUserStore } from '../store/userstore';
import COLORS from '../constants/colors';
import { useColorScheme } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfileModal({ visible, onClose }) {
  const { user, updateUser, getThemeColors } = useUserStore();
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    username: '',
    bio: '',
    profileImage: null
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPickerModal, setShowPickerModal] = useState(false);

  // Initialize form data when modal opens
  useEffect(() => {
    if (visible && user) {
      setFormData({
        firstName: user.firstName || '',
        middleName: user.middleName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        bio: user.bio || '',
        profileImage: user.profileImage || null
      });
    }
  }, [visible, user]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      Alert.alert('Error', 'First name and last name are required');
      return;
    }

    if (!formData.username.trim()) {
      Alert.alert('Error', 'Username is required');
      return;
    }

    setIsLoading(true);
    
    try {
      // Create updated user object
      const updatedUser = {
        ...user,
        firstName: formData.firstName.trim(),
        middleName: formData.middleName.trim(),
        lastName: formData.lastName.trim(),
        username: formData.username.trim(),
        bio: formData.bio.trim(),
        profileImage: formData.profileImage,
        // Generate display name from first and last name
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim()
      };

      // Update user in store
      updateUser(updatedUser);
      
     // update the user profile
      
      Alert.alert('Success', 'Profile updated successfully');
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to select photos.');
      return false;
    }
    return true;
  };

  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera permissions to take photos.');
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    setShowPickerModal(false);
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setFormData(prev => ({
        ...prev,
        profileImage: result.assets[0].uri
      }));
    }
  };

  const takePhoto = async () => {
    setShowPickerModal(false);
    const hasPermission = await requestCameraPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setFormData(prev => ({
        ...prev,
        profileImage: result.assets[0].uri
      }));
    }
  };

  const showImagePickerOptions = () => {
    setShowPickerModal(true);
  };

  const handleCancel = () => {
    // Reset form data to original values
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        middleName: user.middleName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        bio: user.bio || '',
        profileImage: user.profileImage || null
      });
    }
    onClose();
  };

  return (
    <>
      <RNModal
        visible={showPickerModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPickerModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowPickerModal(false)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end' }}>
            <TouchableWithoutFeedback>
              <View style={{ backgroundColor: colors.cardBackground, padding: 24, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                <Text style={{ color: colors.textPrimary, fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>PROFILE PICTURE</Text>
                <Pressable style={{ paddingVertical: 12 }} onPress={takePhoto}>
                  <Text style={{ color: COLORS.orange, fontSize: 16, textAlign: 'center' }}>Take Photo</Text>
                </Pressable>
                <Pressable style={{ paddingVertical: 12 }} onPress={pickImage}>
                  <Text style={{ color: COLORS.orange, fontSize: 16, textAlign: 'center' }}>Choose from Gallery</Text>
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </RNModal>
      <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleCancel}
    >
      <KeyboardAvoidingView 
        style={[styles.container, { backgroundColor: colors.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Pressable onPress={handleCancel} style={styles.headerButton}>
            <X size={24} color={colors.textPrimary} />
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Edit Profile</Text>
          <Pressable 
            onPress={handleSave} 
            style={[styles.saveButton, { opacity: isLoading ? 0.6 : 1 }]}
            disabled={isLoading}
          >
            <Save size={20} color={COLORS.orange} />
          </Pressable>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Profile Picture Section */}
          <View style={styles.profileSection}>
            <Pressable onPress={showImagePickerOptions} style={styles.profileImageContainer}>
              {formData.profileImage ? (
                <Image source={{ uri: formData.profileImage }} style={styles.profileImage} />
              ) : (
                <View style={styles.profileImagePlaceholder}>
                  <User size={32} color="#FFFFFF" />
                </View>
              )}
              <View style={styles.cameraIconContainer}>
                <Camera size={16} color="#FFFFFF" />
              </View>
            </Pressable>
            <Text style={[styles.profileLabel, { color: colors.textSecondary }]}>
              
            </Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formSection}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Personal Information</Text>
            
            {/* First Name */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.textPrimary }]}>First Name *</Text>
              <TextInput
                style={[styles.textInput, { 
                  backgroundColor: colors.cardBackground,
                  color: colors.textPrimary,
                  borderColor: colors.border
                }]}
                value={formData.firstName}
                onChangeText={(text) => handleInputChange('firstName', text)}
                placeholder="Enter first name"
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="words"
              />
            </View>

            {/* Middle Name */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.textPrimary }]}>Middle Name</Text>
              <TextInput
                style={[styles.textInput, { 
                  backgroundColor: colors.cardBackground,
                  color: colors.textPrimary,
                  borderColor: colors.border
                }]}
                value={formData.middleName}
                onChangeText={(text) => handleInputChange('middleName', text)}
                placeholder="Enter middle name (optional)"
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="words"
              />
            </View>

            {/* Last Name */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.textPrimary }]}>Last Name *</Text>
              <TextInput
                style={[styles.textInput, { 
                  backgroundColor: colors.cardBackground,
                  color: colors.textPrimary,
                  borderColor: colors.border
                }]}
                value={formData.lastName}
                onChangeText={(text) => handleInputChange('lastName', text)}
                placeholder="Enter last name"
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="words"
              />
            </View>

            {/* Username */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.textPrimary }]}>Username *</Text>
              <TextInput
                style={[styles.textInput, { 
                  backgroundColor: colors.cardBackground,
                  color: colors.textPrimary,
                  borderColor: colors.border
                }]}
                value={formData.username}
                onChangeText={(text) => handleInputChange('username', text)}
                placeholder="Enter username"
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Bio */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.textPrimary }]}>Bio</Text>
              <TextInput
                style={[styles.textArea, { 
                  backgroundColor: colors.cardBackground,
                  color: colors.textPrimary,
                  borderColor: colors.border
                }]}
                value={formData.bio}
                onChangeText={(text) => handleInputChange('bio', text)}
                placeholder="Tell us about yourself..."
                placeholderTextColor={colors.textSecondary}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Read-only fields */}
          <View style={styles.formSection}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Account Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.textPrimary }]}>Email Address</Text>
              <View style={[styles.readOnlyInput, { 
                backgroundColor: colors.cardBackground,
                borderColor: colors.border
              }]}>
                <Text style={[styles.readOnlyText, { color: colors.textSecondary }]}>
                  {user?.email || 'user@example.com'}
                </Text>
              </View>
              <Text style={[styles.helperText, { color: colors.textSecondary }]}>
               
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.textPrimary }]}>User ID</Text>
              <View style={[styles.readOnlyInput, { 
                backgroundColor: colors.cardBackground,
                borderColor: colors.border
              }]}>
                <Text style={[styles.readOnlyText, { color: colors.textSecondary }]}>
                  {user?.uid || 'UID-123456'}
                </Text>
              </View>
              <Text style={[styles.helperText, { color: colors.textSecondary }]}>
               
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
    </>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  saveButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: 24,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.orange,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileLabel: {
    fontSize: 14,
  },
  formSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 100,
  },
  readOnlyInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  readOnlyText: {
    fontSize: 16,
  },
  helperText: {
    fontSize: 12,
    marginTop: 4,
  },
}); 