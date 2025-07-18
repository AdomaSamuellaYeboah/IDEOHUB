import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Pressable, 
  Modal,
  Image,
  ScrollView
} from 'react-native';
import { X, Image as ImageIcon, Link, File } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import COLORS from '../constants/colors';
import { useUserStore } from '../store/userstore';
import { useColorScheme } from 'react-native';

export default function CreatePostModal({ 
  visible, 
  onClose, 
  onCreatePost,
  boardId
}) {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [activeTab, setActiveTab] = useState('text');
  
  const { getThemeColors } = useUserStore();
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);

  const handleCreate = () => {
    if (!text && !imageUrl && !linkUrl) {
      // Show error
      return;
    }
    
    onCreatePost({
      text: text.trim() || undefined,
      imageUrl: imageUrl || undefined,
      linkUrl: linkUrl.trim() || undefined,
    });
    
    // Reset form
    setText('');
    setImageUrl('');
    setLinkUrl('');
    setActiveTab('text');
    
    onClose();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Create New Post</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.textSecondary} />
            </Pressable>
          </View>
          
          <View style={[styles.tabs, { borderBottomColor: colors.border }]}>
            <Pressable 
              style={[styles.tab, activeTab === 'text' && styles.activeTab]} 
              onPress={() => setActiveTab('text')}
            >
              <Text style={[styles.tabText, { color: colors.textSecondary }, activeTab === 'text' && styles.activeTabText]}>
                Text
              </Text>
            </Pressable>
            <Pressable 
              style={[styles.tab, activeTab === 'image' && styles.activeTab]} 
              onPress={() => setActiveTab('image')}
            >
              <Text style={[styles.tabText, { color: colors.textSecondary }, activeTab === 'image' && styles.activeTabText]}>
                Image
              </Text>
            </Pressable>
            <Pressable 
              style={[styles.tab, activeTab === 'link' && styles.activeTab]} 
              onPress={() => setActiveTab('link')}
            >
              <Text style={[styles.tabText, { color: colors.textSecondary }, activeTab === 'link' && styles.activeTabText]}>
                Link
              </Text>
            </Pressable>
          </View>
          
          <ScrollView style={styles.form}>
            {activeTab === 'text' && (
              <View>
                <Text style={[styles.label, { color: colors.textPrimary }]}>Text Content</Text>
                <TextInput
                  style={[styles.input, styles.textArea, { backgroundColor: colors.cardBackground, borderColor: colors.border, color: colors.textPrimary }]}
                  value={text}
                  onChangeText={setText}
                  placeholder="What's on your mind?"
                  placeholderTextColor={colors.textSecondary}
                  multiline
                  numberOfLines={5}
                />
              </View>
            )}
            
            {activeTab === 'image' && (
              <View>
                <Text style={[styles.label, { color: colors.textPrimary }]}>Image</Text>
                {imageUrl ? (
                  <View style={styles.imagePreviewContainer}>
                    <Image source={{ uri: imageUrl }} style={styles.imagePreview} />
                    <Pressable 
                      style={styles.removeImageButton} 
                      onPress={() => setImageUrl('')}
                    >
                      <X size={20} color="#FFFFFF" />
                    </Pressable>
                  </View>
                ) : (
                  <Pressable style={[styles.imagePicker, { backgroundColor: colors.cardBackground, borderColor: colors.border }]} onPress={pickImage}>
                    <ImageIcon size={32} color={colors.textSecondary} />
                    <Text style={[styles.imagePickerText, { color: colors.textSecondary }]}>Tap to select an image</Text>
                  </Pressable>
                )}
                
                <Text style={[styles.label, { color: colors.textPrimary }]}>Caption (Optional)</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.cardBackground, borderColor: colors.border, color: colors.textPrimary }]}
                  value={text}
                  onChangeText={setText}
                  placeholder="Add a caption to your image"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
            )}
            
            {activeTab === 'link' && (
              <View>
                <Text style={[styles.label, { color: colors.textPrimary }]}>Link URL</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.cardBackground, borderColor: colors.border, color: colors.textPrimary }]}
                  value={linkUrl}
                  onChangeText={setLinkUrl}
                  placeholder="https://example.com"
                  placeholderTextColor={colors.textSecondary}
                  autoCapitalize="none"
                  keyboardType="url"
                />
                
                <Text style={[styles.label, { color: colors.textPrimary }]}>Description (Optional)</Text>
                <TextInput
                  style={[styles.input, styles.textArea, { backgroundColor: colors.cardBackground, borderColor: colors.border, color: colors.textPrimary }]}
                  value={text}
                  onChangeText={setText}
                  placeholder="Describe this link"
                  placeholderTextColor={colors.textSecondary}
                  multiline
                  numberOfLines={3}
                />
              </View>
            )}
          </ScrollView>
          
          <View style={[styles.footer, { borderTopColor: colors.border }]}>
            <Pressable 
              style={[styles.button, styles.cancelButton, { backgroundColor: colors.cardBackground, borderColor: colors.border }]} 
              onPress={onClose}
            >
              <Text style={[styles.cancelButtonText, { color: colors.textPrimary }]}>Cancel</Text>
            </Pressable>
            <Pressable 
              style={[
                styles.button, 
                styles.createButton,
                (!text && !imageUrl && !linkUrl) && styles.createButtonDisabled
              ]} 
              onPress={handleCreate}
              disabled={!text && !imageUrl && !linkUrl}
            >
              <Text style={styles.createButtonText}>Create Post</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.orange,
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: COLORS.orange,
    fontWeight: '600',
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  imagePicker: {
    height: 160,
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePickerText: {
    marginTop: 8,
    fontSize: 16,
  },
  imagePreviewContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  cancelButton: {
    borderWidth: 1,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  createButton: {
    backgroundColor: COLORS.orange,
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});