import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  Dimensions,
  Image,
  Share,
  ActivityIndicator
} from 'react-native';
import { Search, Grid, List, Share2 } from 'lucide-react-native';
import { useUserStore } from '../../store/userstore';
import { useColorScheme } from 'react-native';
import { useBoardStore } from '../../store/boardstore';
import EmptyState from '../../components/emptystate';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - (CARD_MARGIN * 3)) / 2;

const categories = ['All', 'General', 'Education', 'Business', 'Art', 'Design', 'Technology'];

// Gallery Item Component
const GalleryItem = ({ item, colors, viewMode = 'grid', onShare }) => {
  const isList = viewMode === 'list';
  
  return (
    <TouchableOpacity 
      style={[
        styles.galleryItem, 
        isList ? styles.listItem : styles.gridItem,
        { backgroundColor: colors.cardBackground }
      ]}
      activeOpacity={0.8}
      onPress={() => console.log('Open gallery item:', item.id)}
    >
      <View style={[
        styles.imageContainer, 
        isList && styles.listImageContainer
      ]}>
        {item.image ? (
          <Image 
            source={{ uri: item.image }} 
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.imagePlaceholder, { backgroundColor: colors.background }]}>
            <Text style={{ color: colors.textSecondary, fontSize: 12 }}>No Image</Text>
          </View>
        )}
      </View>
      
      <View style={[
        styles.itemInfo, 
        isList && styles.listItemInfo
      ]}>
        <View>
          <Text 
            style={[
              styles.itemTitle, 
              { color: colors.textPrimary }
            ]}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text 
            style={[
              styles.itemCategory, 
              { 
                color: colors.orange,
                backgroundColor: `${colors.orange}15`,
                alignSelf: 'flex-start',
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 4,
                marginTop: 4,
                overflow: 'hidden'
              }
            ]}
          >
            {item.category}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={(e) => {
            e.stopPropagation();
            onShare?.(item);
          }}
        >
          <Share2 size={16} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isLoading, setIsLoading] = useState(true);
  
  const { getThemeColors } = useUserStore();
  const { boards, fetchBoards } = useBoardStore();
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);

  // Fetch boards on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchBoards();
      } catch (error) {
        console.error('Error fetching boards:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Filter public boards
  const publicBoards = boards?.filter(board => board.isPublic) || [];

  // Filter by search query and category
  const filteredBoards = publicBoards.filter(board => {
    const matchesSearch = searchQuery === '' || 
      board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (board.description && board.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || 
      board.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Format board items for the gallery
  const galleryItems = filteredBoards.map(board => ({
    id: board.id,
    title: board.title,
    category: board.category || 'General',
    description: board.description,
    image: board.coverImage || `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 1000)}`,
    createdAt: board.createdAt,
    likes: board.likes || 0,
    isPublic: board.isPublic
  }));

  // Handle sharing a board
  const handleShareBoard = async (board) => {
    try {
      await Share.share({
        message: `Check out "${board.title}" on IdeoHub: ${board.description || 'An amazing collection of ideas and inspiration'}`,
        title: board.title
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share board');
    }
  };

  // Handle sharing all boards
  const handleShareAllBoards = async () => {
    try {
      const boardTitles = publicBoards.map(board => board.title).join(', ');
      await Share.share({
        message: `Check out these amazing public boards on IdeoHub: ${boardTitles}`,
        title: 'IdeoHub Public Boards',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share boards');
    }
  };

  const handleAddMember = () => {
    Alert.alert(
      'Invite Friends',
      'Share IdeoHub with your friends and collaborate together!',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Share App', onPress: async () => {
          try {
            await Share.share({
              message: 'Join me on IdeoHub - a collaborative platform for sharing ideas and creating amazing boards together!',
              title: 'Join IdeoHub',
            });
          } catch (error) {
            Alert.alert('Error', 'Failed to share app');
          }
        }},
        { text: 'Invite to Board', onPress: () => {
          Alert.alert('Coming Soon', 'Direct board invitation feature will be available soon!');
        }}
      ]
    );
  };



  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with title and view toggle */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          Explore
        </Text>
        <View style={styles.viewToggle}>
          <TouchableOpacity 
            onPress={() => setViewMode('grid')}
            style={[
              styles.toggleButton, 
              viewMode === 'grid' && { backgroundColor: colors.orange }
            ]}
          >
            <Grid size={20} color={viewMode === 'grid' ? '#fff' : colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setViewMode('list')}
            style={[
              styles.toggleButton,
              viewMode === 'list' && { backgroundColor: colors.orange }
            ]}
          >
            <List size={20} color={viewMode === 'list' ? '#fff' : colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search bar */}
      <View style={[styles.searchContainer, { 
        backgroundColor: colors.cardBackground,
        borderColor: colors.border 
      }]}>
        <Search size={18} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.textPrimary }]}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search galleries..."
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === item && { 
                  backgroundColor: colors.orange,
                  borderColor: colors.orange 
                }
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text style={[
                styles.categoryText,
                { 
                  color: selectedCategory === item ? '#fff' : colors.textPrimary,
                  opacity: selectedCategory === item ? 1 : 0.7
                }
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Gallery Grid/List */}
      {galleryItems.length === 0 ? (
        <EmptyState 
          title="No galleries found"
          message={
            searchQuery 
              ? "Try a different search term or category" 
              : "There are no public galleries available yet"
          }
        />
      ) : (
        <FlatList
          data={galleryItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GalleryItem 
              item={item} 
              colors={colors} 
              viewMode={viewMode}
              onShare={handleShareBoard}
            />
          )}
          numColumns={viewMode === 'grid' ? 2 : 1}
          contentContainerStyle={styles.galleryContainer}
          key={viewMode}
          showsVerticalScrollIndicator={false}
        />
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
    padding: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    padding: 8,
    borderRadius: 6,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 4,
  },
  categoriesContainer: {
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  categoriesList: {
    paddingHorizontal: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
    borderColor: '#e0e0e0',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  galleryContainer: {
    padding: 8,
  },
});