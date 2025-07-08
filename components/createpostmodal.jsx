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
      mediaTypes: ImagePicker.MediaType.Images,
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
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Create New Post</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <X size={24} color={COLORS.light.textSecondary} />
            </Pressable>
          </View>
          
          <View style={styles.tabs}>
            <Pressable 
              style={[styles.tab, activeTab === 'text' && styles.activeTab]} 
              onPress={() => setActiveTab('text')}
            >
              <Text style={[styles.tabText, activeTab === 'text' && styles.activeTabText]}>
                Text
              </Text>
            </Pressable>
            <Pressable 
              style={[styles.tab, activeTab === 'image' && styles.activeTab]} 
              onPress={() => setActiveTab('image')}
            >
              <Text style={[styles.tabText, activeTab === 'image' && styles.activeTabText]}>
                Image
              </Text>
            </Pressable>
            <Pressable 
              style={[styles.tab, activeTab === 'link' && styles.activeTab]} 
              onPress={() => setActiveTab('link')}
            >
              <Text style={[styles.tabText, activeTab === 'link' && styles.activeTabText]}>
                Link
              </Text>
            </Pressable>
          </View>
          
          <ScrollView style={styles.form}>
            {activeTab === 'text' && (
              <View>
                <Text style={styles.label}>Text Content</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={text}
                  onChangeText={setText}
                  placeholder="What's on your mind?"
                  placeholderTextColor={COLORS.light.textSecondary}
                  multiline
                  numberOfLines={5}
                />
              </View>
            )}
            
            {activeTab === 'image' && (
              <View>
                <Text style={styles.label}>Image</Text>
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
                  <Pressable style={styles.imagePicker} onPress={pickImage}>
                    <ImageIcon size={32} color={COLORS.light.textSecondary} />
                    <Text style={styles.imagePickerText}>Tap to select an image</Text>
                  </Pressable>
                )}
                
                <Text style={styles.label}>Caption (Optional)</Text>
                <TextInput
                  style={styles.input}
                  value={text}
                  onChangeText={setText}
                  placeholder="Add a caption to your image"
                  placeholderTextColor={COLORS.light.textSecondary}
                />
              </View>
            )}
            
            {activeTab === 'link' && (
              <View>
                <Text style={styles.label}>Link URL</Text>
                <TextInput
                  style={styles.input}
                  value={linkUrl}
                  onChangeText={setLinkUrl}
                  placeholder="https://example.com"
                  placeholderTextColor={COLORS.light.textSecondary}
                  autoCapitalize="none"
                  keyboardType="url"
                />
                
                <Text style={styles.label}>Description (Optional)</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={text}
                  onChangeText={setText}
                  placeholder="Describe this link"
                  placeholderTextColor={COLORS.light.textSecondary}
                  multiline
                  numberOfLines={3}
                />
              </View>
            )}
          </ScrollView>
          
          <View style={styles.footer}>
            <Pressable 
              style={[styles.button, styles.cancelButton]} 
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
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
    backgroundColor: COLORS.light.background,
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.light.textPrimary,
  },
  closeButton: {
    padding: 4,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light.border,
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
    color: COLORS.light.textSecondary,
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
    color: COLORS.light.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.light.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.light.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.light.textPrimary,
    marginBottom: 16,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  imagePicker: {
    height: 160,
    backgroundColor: COLORS.light.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.light.border,
    borderRadius: 8,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePickerText: {
    marginTop: 8,
    fontSize: 16,
    color: COLORS.light.textSecondary,
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
    borderTopColor: COLORS.light.border,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: COLORS.light.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.light.border,
  },
  cancelButtonText: {
    color: COLORS.light.textPrimary,
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