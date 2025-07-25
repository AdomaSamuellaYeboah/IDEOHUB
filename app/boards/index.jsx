import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
  FlatList,
  Dimensions,
  RefreshControl
} from 'react-native';
import { useRouter } from 'expo-router';
import { useUserStore } from '../../store/userstore';
import { useColorScheme } from 'react-native';
import { Search, X, Edit, Trash2, Plus, Lock, Unlock, Grid, List } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

const { width } = Dimensions.get('window');
const STORAGE_KEY = '@ideohub_boards';

const colorOptions = [
  '#4CAF50', '#2196F3', '#FF9800', '#9C27B0', 
  '#F44336', '#607D8B', '#00BCD4', '#8BC34A'
];

const EnhancedBoardsScreen = () => {
  const router = useRouter();
  const colors = useUserStore.getState().getThemeColors(useColorScheme());
  
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [boardData, setBoardData] = useState({
    id: null,
    title: '',
    image: null,
    viewType: 'Grid',
    privacy: 'Private',
    backgroundColor: '#4CAF50',
  });

  // Save boards to AsyncStorage
  const saveBoards = async (updatedBoards) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBoards));
      setBoards(updatedBoards);
      return true;
    } catch (error) {
      console.error('Error saving boards:', error);
      Alert.alert('Error', 'Failed to save boards');
      return false;
    }
  };

  // Load boards from AsyncStorage
  const loadBoards = async () => {
    try {
      const savedBoards = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedBoards) {
        setBoards(JSON.parse(savedBoards));
      }
    } catch (error) {
      console.error('Error loading boards:', error);
      Alert.alert('Error', 'Failed to load boards');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Handle pull-to-refresh
  const handleRefresh = () => {
    setRefreshing(true);
    loadBoards();
  };

  // Select image from device library
  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        Alert.alert('Error', 'Failed to select image');
      } else if (response.assets && response.assets[0]) {
        setBoardData(prev => ({
          ...prev,
          image: response.assets[0].uri,
        }));
      }
    });
  };

  // Reset form to default values
  const resetForm = () => {
    setBoardData({
      id: null,
      title: '',
      image: null,
      viewType: 'Grid',
      privacy: 'Private',
      backgroundColor: '#4CAF50',
    });
  };

  // Open modal for editing existing board
  const openEditModal = (board) => {
    setBoardData({ ...board });
    setModalVisible(true);
  };

  // Open modal for creating new board
  const openCreateModal = () => {
    resetForm();
    setModalVisible(true);
  };

  // Save or update board
  const handleSaveBoard = async () => {
    if (!boardData.title.trim()) {
      Alert.alert('Error', 'Please enter a board title');
      return;
    }

    const updatedBoards = [...boards];
    let success = false;
    
    try {
      if (boardData.id) {
        // Update existing board
        const index = updatedBoards.findIndex(b => b.id === boardData.id);
        if (index !== -1) {
          updatedBoards[index] = { 
            ...boardData,
            updatedAt: new Date().toISOString()
          };
          success = await saveBoards(updatedBoards);
        }
      } else {
        // Add new board
        const newBoard = {
          id: Date.now().toString(),
          ...boardData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        updatedBoards.unshift(newBoard);
        success = await saveBoards(updatedBoards);
      }

      if (success) {
        setModalVisible(false);
        resetForm();
      }
    } catch (error) {
      console.error('Failed to save board', error);
      Alert.alert('Error', 'Failed to save board');
    }
  };

  const deleteBoard = async (id) => {
    try {
      const updatedBoards = boards.filter(board => board.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBoards));
      setBoards(updatedBoards);
    } catch (error) {
      console.error('Failed to delete board', error);
      Alert.alert('Error', 'Failed to delete board');
    }
  };

  const filteredBoards = boards.filter(board => 
    board.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderBoardItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.boardCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => router.push(`/boards/${item.id}`)}
    >
      <View style={[styles.boardImageContainer, { backgroundColor: item.backgroundColor }]}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.boardImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={[styles.placeholderText, { color: 'rgba(255, 255, 255, 0.8)' }]}>
              {item.title.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <View style={styles.boardOverlay}>
          <Text style={styles.boardTitle} numberOfLines={1}>
            {item.title}
          </Text>
        </View>
      </View>
      
      <View style={styles.boardFooter}>
        <View style={styles.boardInfo}>
          <View style={[styles.viewTypeContainer, { backgroundColor: colors.inputBackground }]}>
            {item.viewType === 'Grid' ? (
              <Grid size={16} color={colors.text} style={styles.viewTypeIcon} />
            ) : (
              <List size={16} color={colors.text} style={styles.viewTypeIcon} />
            )}
            <Text style={[styles.viewTypeText, { color: colors.text }]}>
              {item.viewType}
            </Text>
          </View>
          
          <View style={[
            styles.privacyBadge,
            { 
              backgroundColor: item.privacy === 'Public' ? colors.primary : colors.secondary,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 12,
            }
          ]}>
            {item.privacy === 'Public' ? (
              <Unlock size={14} color="#FFFFFF" style={{ marginRight: 4 }} />
            ) : (
              <Lock size={14} color="#FFFFFF" style={{ marginRight: 4 }} />
            )}
            <Text style={styles.privacyText}>{item.privacy}</Text>
          </View>
        </View>
        
        <View style={styles.boardActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={(e) => {
              e.stopPropagation();
              openEditModal(item);
            }}
          >
            <Edit size={18} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={(e) => {
              e.stopPropagation();
              deleteBoard(item.id);
            }}
          >
            <Trash2 size={18} color={colors.danger} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderModalContent = () => (
    <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
      <View style={styles.modalHeader}>
        <Text style={[styles.modalTitle, { color: colors.text }]}>
          {boardData.id ? 'Edit Board' : 'Create New Board'}
        </Text>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => {
            setModalVisible(false);
            resetForm();
          }}
        >
          <X size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.modalScrollView}>
        <TextInput
          style={[styles.titleInput, { 
            backgroundColor: colors.inputBackground,
            color: colors.text,
            borderColor: colors.border
          }]}
          placeholder="Board Title"
          placeholderTextColor={colors.placeholder}
          value={boardData.title}
          onChangeText={(text) => setBoardData({...boardData, title: text})}
        />

        {/* Cover Image Selection */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Cover Image</Text>
        <TouchableOpacity 
          style={[styles.imageSelector, { borderColor: colors.border }]}
          onPress={selectImage}
        >
          {boardData.image ? (
            <Image 
              source={{ uri: boardData.image }} 
              style={styles.selectedImage} 
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.imagePlaceholder, { backgroundColor: colors.inputBackground }]}>
              <Plus size={24} color={colors.text} />
              <Text style={[styles.imagePlaceholderText, { color: colors.text }]}>
                Add Cover Image
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Background Color Selection */}
        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 16 }]}>
          Background Color
        </Text>
        <View style={styles.colorPicker}>
          {colorOptions.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorOption,
                { backgroundColor: color },
                boardData.backgroundColor === color && styles.selectedColor
              ]}
              onPress={() => setBoardData(prev => ({ ...prev, backgroundColor: color }))}
            />
          ))}
        </View>

        {/* View Type Selection */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>View Type</Text>
        <View style={styles.optionRow}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              { backgroundColor: colors.inputBackground },
              boardData.viewType === 'Grid' && [
                styles.selectedOption,
                { backgroundColor: colors.primary }
              ]
            ]}
            onPress={() => setBoardData(prev => ({ ...prev, viewType: 'Grid' }))}
          >
            <Grid size={20} color={boardData.viewType === 'Grid' ? '#FFFFFF' : colors.text} />
            <Text style={[
              styles.optionText,
              { color: boardData.viewType === 'Grid' ? '#FFFFFF' : colors.text }
            ]}>
              Grid
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.optionButton,
              { backgroundColor: colors.inputBackground },
              boardData.viewType === 'List' && [
                styles.selectedOption,
                { backgroundColor: colors.primary }
              ]
            ]}
            onPress={() => setBoardData(prev => ({ ...prev, viewType: 'List' }))}
          >
            <List size={20} color={boardData.viewType === 'List' ? '#FFFFFF' : colors.text} />
            <Text style={[
              styles.optionText,
              { color: boardData.viewType === 'List' ? '#FFFFFF' : colors.text }
            ]}>
              List
            </Text>
          </TouchableOpacity>
        </View>

        {/* Privacy Selection */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Privacy</Text>
        <View style={styles.optionRow}>
          <TouchableOpacity
            style={[
              styles.privacyOption,
              { backgroundColor: colors.inputBackground },
              boardData.privacy === 'Public' && [
                styles.selectedPrivacyOption,
                { backgroundColor: colors.primary }
              ]
            ]}
            onPress={() => setBoardData(prev => ({ ...prev, privacy: 'Public' }))}
          >
            <Unlock 
              size={20} 
              color={boardData.privacy === 'Public' ? '#FFFFFF' : colors.text} 
            />
            <Text style={[
              styles.privacyOptionText,
              { color: boardData.privacy === 'Public' ? '#FFFFFF' : colors.text }
            ]}>
              Public
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.privacyOption,
              { backgroundColor: colors.inputBackground },
              boardData.privacy === 'Private' && [
                styles.selectedPrivacyOption,
                { backgroundColor: colors.primary }
              ]
            ]}
            onPress={() => setBoardData(prev => ({ ...prev, privacy: 'Private' }))}
          >
            <Lock 
              size={20} 
              color={boardData.privacy === 'Private' ? '#FFFFFF' : colors.text} 
            />
            <Text style={[
              styles.privacyOptionText,
              { color: boardData.privacy === 'Private' ? '#FFFFFF' : colors.text }
            ]}>
              Private
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <View style={[styles.modalFooter, { borderTopColor: colors.border }]}>
        <TouchableOpacity 
          style={[styles.button, styles.cancelButton, { borderColor: colors.border }]}
          onPress={() => {
            setModalVisible(false);
            resetForm();
          }}
        >
          <Text style={[styles.buttonText, { color: colors.text }]}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.saveButton, { backgroundColor: colors.primary }]}
          onPress={handleSaveBoard}
        >
          <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>
            {boardData.id ? 'Update' : 'Create'} Board
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.textPrimary }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.cardBackground }]}>
        <View>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>My Boards</Text>
        </View>
        <TouchableOpacity
          style={[styles.newBoardButton, { backgroundColor: colors.primary }]}
          onPress={() => setModalVisible(true)}
        >
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.newBoardButtonText}>New Board</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={[styles.searchContainer, { backgroundColor: colors.cardBackground }]}>
        <View style={[styles.searchInput, { backgroundColor: colors.background }]}>
          <Search size={18} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            placeholder="Search boards..."
            placeholderTextColor={colors.textSecondary}
            style={[styles.searchText, { color: colors.textPrimary }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Boards List */}
      {filteredBoards.length > 0 ? (
        <FlatList
          data={filteredBoards}
          renderItem={renderBoardItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.boardsList}
          numColumns={2}
          columnWrapperStyle={styles.boardsRow}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={loadBoards}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
            {searchQuery ? 'No boards match your search' : 'No boards yet'}
          </Text>
          <TouchableOpacity 
            style={[styles.emptyStateButton, { backgroundColor: colors.primary }]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.emptyStateButtonText}>Create your first board</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Create Board Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0, 0, 0, 0.7)' }]}>
          {renderModalContent()}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  newBoardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 25,
    gap: 8,
  },
  newBoardButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  searchContainer: {
    padding: 16,
    paddingTop: 0,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchText: {
    flex: 1,
    fontSize: 16,
  },
  boardsList: {
    padding: 8,
  },
  boardsRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  boardCard: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  boardHeader: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  boardActions: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boardContent: {
    padding: 16,
  },
  boardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  boardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaText: {
    fontSize: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyStateButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  emptyStateButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  optionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EnhancedBoardsScreen;
