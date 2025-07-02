import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Pressable, 
  Modal, 
  ScrollView,
  Switch
} from 'react-native';
import { X, Grid, ListFilter, Clock, MapPin, Layout } from 'lucide-react-native';
import COLORS from '../constants/colors';

// PropTypes will be used for prop validation instead of TypeScript interfaces
import PropTypes from 'prop-types';

const layoutOptions = [
  {
    value: 'grid',
    label: 'Grid View',
    icon: <Grid size={24} color={COLORS.lightBlue} />,
    description: 'Pinterest-like layout'
  },
  {
    value: 'stream',
    label: 'Stream View',
    icon: <ListFilter size={24} color={COLORS.lightBlue} />,
    description: 'Vertical feed'
  },
  {
    value: 'timeline',
    label: 'Timeline View',
    icon: <Clock size={24} color={COLORS.lightBlue} />,
    description: 'Horizontal chronological layout'
  },
  {
    value: 'freeform',
    label: 'Freeform',
    icon: <Layout size={24} color={COLORS.lightBlue} />,
    description: 'Drag-anywhere layout'
  },
  {
    value: 'map',
    label: 'Map',
    icon: <MapPin size={24} color={COLORS.lightBlue} />,
    description: 'Geolocation-based post tagging'
  }
];

export default function CreateBoardModal({ 
  visible, 
  onClose, 
  onCreateBoard 
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [layout, setLayout] = useState<BoardLayout>('grid');
  const [isPublic, setIsPublic] = useState(true);

  const handleCreate = () => {
    if (!title.trim()) {
      // Show error
      return;
    }

      isPublic
    
    // Reset form
    setTitle('');
    setDescription('');
    setLayout('grid');
    setIsPublic(true);
    
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onClose
      onCreateBoard
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Create New Board</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <X size={24} color={COLORS.light.textSecondary} />
            </Pressable>
          </View>
          
          <ScrollView style={styles.form}>
            <Text style={styles.label}>Board Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter board title"
              placeholderTextColor={COLORS.light.textSecondary}
            />
            
            <Text style={styles.label}>Description (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter board description"
              placeholderTextColor={COLORS.light.textSecondary}
              multiline
              numberOfLines={3}
            />
            
            <Text style={styles.label}>Layout</Text>
            <View style={styles.layoutOptions}>
              {layoutOptions.map((option) => (
                <Pressable
                  key={option.value}
                  style={[
                    styles.layoutOption,
                    layout === option.value && styles.layoutOptionSelected
                  ]}
                  onPress={() => setLayout(option.value)}
                >
                  <View style={styles.layoutIconContainer}>
                    {option.icon}
                  </View>
                  <Text style={styles.layoutLabel}>{option.label}</Text>
                  <Text style={styles.layoutDescription}>{option.description}</Text>
                </Pressable>
              ))}
            </View>
            
            <View style={styles.switchContainer}>
              <Text style={styles.label}>Public Board</Text>
              <Switch
                value={isPublic}
                onValueChange={setIsPublic}
                trackColor={{ false: COLORS.light.border, true: COLORS.orange }}
                thumbColor="#FFFFFF"
              />
            </View>
            <Text style={styles.helperText}>
              {isPublic 
                ? "Anyone with the link can view this board" 
                : "Only you and collaborators can access this board"}
            </Text>
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
                !title.trim() && styles.createButtonDisabled
              ]} 
              onPress={handleCreate}
              disabled={!title.trim()}
            >
              <Text style={styles.createButtonText}>Create Board</Text>
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
    minHeight: 80,
    textAlignVertical: 'top',
  },
  layoutOptions: {
    marginBottom: 16,
  },
  layoutOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.light.border,
    borderRadius: 8,
    marginBottom: 8,
  },
  layoutOptionSelected: {
    borderColor: COLORS.lightBlue,
    backgroundColor: 'rgba(62, 156, 255, 0.1)',
  },
  layoutIconContainer: {
    marginRight: 12,
  },
  layoutLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.light.textPrimary,
    flex: 1,
  },
  layoutDescription: {
    fontSize: 14,
    color: COLORS.light.textSecondary,
    flex: 1,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  helperText: {
    fontSize: 14,
    color: COLORS.light.textSecondary,
    marginBottom: 16,
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
})