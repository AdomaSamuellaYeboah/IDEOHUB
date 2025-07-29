import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Pressable, 
  FlatList,
  useWindowDimensions,
  Alert
} from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { 
  Grid, 
  ListFilter, 
  Clock, 
  MapPin, 
  Layout, 
  Share2, 
  Users, 
  MoreVertical 
} from 'lucide-react-native';
import { useBoardStore } from '../../store/boardstore';
import PostCard from '../../components/postcard';
import CreatePostFAB from '../../components/createpostFAB';
import CreatePostModal from '../../components/createpostmodal';
import EditBoardModal from '../../components/editboardmodal';
import EmptyState from '../../components/emptystate';
import UserProfile from '../../components/userprofile';
import SocialActions from '../../components/socialactions';
import CommentModal from '../../components/commentmodal';
import COLORS from '../../constants/colors';
import { useUserStore } from '../../store/userstore';
import { useColorScheme } from 'react-native';

export default function BoardScreen() {
  const { id } = useLocalSearchParams();
  const { 
    currentBoard, 
    posts, 
    fetchBoardById, 
    fetchPosts, 
    changeLayout, 
    createPost,
    updateBoard,
    deleteBoard
  } = useBoardStore();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [layoutMenuVisible, setLayoutMenuVisible] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const router = useRouter();
  const { width } = useWindowDimensions();
  
  const { getThemeColors } = useUserStore();
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  
  useEffect(() => {
    if (id) {
      fetchBoardById(id);
      fetchPosts(id);
    }
  }, [id]);
  
  const handleCreatePost = (data) => {
    createPost({
      boardId: id,
      content: {
        text: data.text,
        imageUrl: data.imageUrl,
        linkUrl: data.linkUrl,
      },
      // For freeform layout, we'd calculate a position
      position: { 
        x: Math.random() * 300, 
        y: Math.random() * 300 
      },
    });
  };
  
  const handleChangeLayout = (layout) => {
    if (id && currentBoard) {
      changeLayout(id, layout);
      setLayoutMenuVisible(false);
    }
  };

  const handleEditBoard = () => {
    setEditModalVisible(true);
  };

  const handleUpdateBoard = async (updatedData) => {
    if (id) {
      await updateBoard(id, updatedData);
      setEditModalVisible(false);
      // Show success message
      Alert.alert('Success', 'Board updated successfully!');
    }
  };

  const handleDeleteBoard = async () => {
    if (id) {
      await deleteBoard(id);
      setEditModalVisible(false);
      router.back();
    }
  };
  
  if (!currentBoard) {
    return (
      <View style={styles.container}>
        <EmptyState 
          title="Board not found"
          message="The board you're looking for doesn't exist or has been deleted."
        />
      </View>
    );
  }
  
  const renderLayoutIcon = () => {
    switch (currentBoard.layout) {
      case 'grid':
        return <Grid size={20} color={colors.textPrimary} />;
      case 'stream':
        return <ListFilter size={20} color={colors.textPrimary} />;
      case 'timeline':
        return <Clock size={20} color={colors.textPrimary} />;
      case 'freeform':
        return <Layout size={20} color={colors.textPrimary} />;
      case 'map':
        return <MapPin size={20} color={colors.textPrimary} />;
      default:
        return <Grid size={20} color={colors.textPrimary} />;
    }
  };
  
  const renderContent = () => {
    if (posts.length === 0) {
      return (
        <EmptyState 
          title="No posts yet"
          message="Create your first post to start collaborating."
        />
      );
    }
    
    switch (currentBoard.layout) {
      case 'grid':
        return (
          <FlatList
            key={`grid-${width > 500 ? 'wide' : 'narrow'}`}
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PostCard post={item} />}
            numColumns={width > 500 ? 3 : 2}
            contentContainerStyle={styles.gridContent}
          />
        );
      case 'stream':
        return (
          <FlatList
            key={`stream-${width > 500 ? 'wide' : 'narrow'}`}
              data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.streamItem}>
                <PostCard post={item} />
              </View>
            )}
            contentContainerStyle={styles.streamContent}
          />
        );
      case 'timeline':
        return (
          <ScrollView horizontal contentContainerStyle={styles.timelineContent}>
            {posts.map((post) => (
              <View key={post.id} style={styles.timelineItem}>
                <PostCard post={post} />
              </View>
            ))}
          </ScrollView>
        );
      case 'freeform':
        return (
          <View style={styles.freeformContent}>
            {posts.map((post) => (
              <View 
                key={post.id} 
                style={[
                  styles.freeformItem,
                  { 
                    left: post.position?.x || 0, 
                    top: post.position?.y || 0 
                  }
                ]}
              >
                <PostCard post={post} />
              </View>
            ))}
          </View>
        );
      case 'map':
        return (
          <View style={styles.mapContent}>
            <Text style={[styles.mapPlaceholder, { color: colors.textSecondary }]}>
              Map view is not available in this demo
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen 
        options={{
          title: currentBoard.title,
          headerRight: () => (
            <View style={styles.headerButtons}>
              <Pressable style={styles.headerButton}>
                <Share2 size={20} color={colors.textPrimary} />
              </Pressable>
              <Pressable style={styles.headerButton}>
                <Users size={20} color={colors.textPrimary} />
              </Pressable>
              <Pressable style={styles.headerButton} onPress={handleEditBoard}>
                <MoreVertical size={20} color={colors.textPrimary} />
              </Pressable>
            </View>
          ),
        }}
      />
      
      <View style={[styles.toolbar, { borderBottomColor: colors.border }]}>
        <Pressable 
          style={[styles.layoutButton, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
          onPress={() => setLayoutMenuVisible(!layoutMenuVisible)}
        >
          {renderLayoutIcon()}
          <Text style={[styles.layoutButtonText, { color: colors.textPrimary }]}>
            {currentBoard.layout.charAt(0).toUpperCase() + currentBoard.layout.slice(1)}
          </Text>
        </Pressable>
        
        {layoutMenuVisible && (
          <View style={[styles.layoutMenu, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <Pressable 
              style={[styles.layoutMenuItem, { borderBottomColor: colors.border }]}
              onPress={() => handleChangeLayout('grid')}
            >
              <Grid size={20} color={colors.textPrimary} />
              <Text style={[styles.layoutMenuItemText, { color: colors.textPrimary }]}>Grid</Text>
            </Pressable>
            <Pressable 
              style={[styles.layoutMenuItem, { borderBottomColor: colors.border }]}
              onPress={() => handleChangeLayout('stream')}
            >
              <ListFilter size={20} color={colors.textPrimary} />
              <Text style={[styles.layoutMenuItemText, { color: colors.textPrimary }]}>Stream</Text>
            </Pressable>
            <Pressable 
              style={[styles.layoutMenuItem, { borderBottomColor: colors.border }]}
              onPress={() => handleChangeLayout('timeline')}
            >
              <Clock size={20} color={colors.textPrimary} />
              <Text style={[styles.layoutMenuItemText, { color: colors.textPrimary }]}>Timeline</Text>
            </Pressable>
            <Pressable 
              style={[styles.layoutMenuItem, { borderBottomColor: colors.border }]}
              onPress={() => handleChangeLayout('freeform')}
            >
              <Layout size={20} color={colors.textPrimary} />
              <Text style={[styles.layoutMenuItemText, { color: colors.textPrimary }]}>Freeform</Text>
            </Pressable>
            <Pressable 
              style={[styles.layoutMenuItem, { borderBottomColor: colors.border }]}
              onPress={() => handleChangeLayout('map')}
            >
              <MapPin size={20} color={colors.textPrimary} />
              <Text style={[styles.layoutMenuItemText, { color: colors.textPrimary }]}>Map</Text>
            </Pressable>
          </View>
        )}
      </View>
      
      {/* User Profile */}
      <UserProfile userId={currentBoard.ownerId} boardId={id} />
      
      {/* Social Actions for Public Boards */}
      {currentBoard.isPublic && (
        <SocialActions 
          boardId={id} 
          onCommentPress={() => setCommentModalVisible(true)}
        />
      )}
      
      {/* Board Description */}
      {currentBoard.description && (
        <View style={[styles.descriptionContainer, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <Text style={[styles.descriptionText, { color: colors.textSecondary }]}>
            {currentBoard.description}
          </Text>
        </View>
      )}
      
      {renderContent()}
      
      <CreatePostFAB onPress={() => setCreateModalVisible(true)} />
      
      <CreatePostModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onCreatePost={handleCreatePost}
        boardId={id || ''}
      />

      <EditBoardModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onUpdate={handleUpdateBoard}
        onDelete={handleDeleteBoard}
        board={currentBoard}
      />

      <CommentModal
        visible={commentModalVisible}
        onClose={() => setCommentModalVisible(false)}
        boardId={id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 4,
  },
  toolbar: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    position: 'relative',
  },
  layoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  layoutButtonText: {
    marginLeft: 8,
    fontSize: 14,
  },
  layoutMenu: {
    position: 'absolute',
    top: 56,
    left: 12,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  layoutMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
  },
  layoutMenuItemText: {
    marginLeft: 8,
    fontSize: 14,
  },
  gridContent: {
    padding: 8,
  },
  streamContent: {
    padding: 16,
  },
  streamItem: {
    marginBottom: 16,
    width: '100%',
  },
  timelineContent: {
    padding: 16,
    flexDirection: 'row',
  },
  timelineItem: {
    marginRight: 16,
    width: 280,
  },
  freeformContent: {
    flex: 1,
    padding: 16,
    position: 'relative',
    height: 1000, // Arbitrary height for the canvas
  },
  freeformItem: {
    position: 'absolute',
    width: 280,
  },
  mapContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholder: {
    fontSize: 16,
  },
  descriptionContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#eee', // Default border color
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
  },
});