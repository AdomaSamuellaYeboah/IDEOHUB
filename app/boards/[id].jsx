import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Pressable, 
  FlatList,
  useWindowDimensions
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
import { useBoardStore } from '../../store/boardStore';
import PostCard from '../../components/PostCard';
import CreatePostFAB from '../../components/CreatePostFAB';
import CreatePostModal from '../../components/CreatePostModal';
import EmptyState from '../../components/EmptyState';
import COLORS from '../../constants/colors';

export default function BoardScreen() {
  const { id } = useLocalSearchParams();
  const { 
    currentBoard, 
    posts, 
    fetchBoardById, 
    fetchPosts, 
    changeLayout, 
    createPost 
  } = useBoardStore();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [layoutMenuVisible, setLayoutMenuVisible] = useState(false);
  const router = useRouter();
  const { width } = useWindowDimensions();
  
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
        return <Grid size={20} color={COLORS.light.textPrimary} />;
      case 'stream':
        return <ListFilter size={20} color={COLORS.light.textPrimary} />;
      case 'timeline':
        return <Clock size={20} color={COLORS.light.textPrimary} />;
      case 'freeform':
        return <Layout size={20} color={COLORS.light.textPrimary} />;
      case 'map':
        return <MapPin size={20} color={COLORS.light.textPrimary} />;
      default:
        return <Grid size={20} color={COLORS.light.textPrimary} />;
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
            <Text style={styles.mapPlaceholder}>
              Map view is not available in this demo
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: currentBoard.title,
          headerRight: () => (
            <View style={styles.headerButtons}>
              <Pressable style={styles.headerButton}>
                <Share2 size={20} color={COLORS.light.textPrimary} />
              </Pressable>
              <Pressable style={styles.headerButton}>
                <Users size={20} color={COLORS.light.textPrimary} />
              </Pressable>
              <Pressable style={styles.headerButton}>
                <MoreVertical size={20} color={COLORS.light.textPrimary} />
              </Pressable>
            </View>
          ),
        }}
      />
      
      <View style={styles.toolbar}>
        <Pressable 
          style={styles.layoutButton}
          onPress={() => setLayoutMenuVisible(!layoutMenuVisible)}
        >
          {renderLayoutIcon()}
          <Text style={styles.layoutButtonText}>
            {currentBoard.layout.charAt(0).toUpperCase() + currentBoard.layout.slice(1)}
          </Text>
        </Pressable>
        
        {layoutMenuVisible && (
          <View style={styles.layoutMenu}>
            <Pressable 
              style={styles.layoutMenuItem}
              onPress={() => handleChangeLayout('grid')}
            >
              <Grid size={20} color={COLORS.light.textPrimary} />
              <Text style={styles.layoutMenuItemText}>Grid</Text>
            </Pressable>
            <Pressable 
              style={styles.layoutMenuItem}
              onPress={() => handleChangeLayout('stream')}
            >
              <ListFilter size={20} color={COLORS.light.textPrimary} />
              <Text style={styles.layoutMenuItemText}>Stream</Text>
            </Pressable>
            <Pressable 
              style={styles.layoutMenuItem}
              onPress={() => handleChangeLayout('timeline')}
            >
              <Clock size={20} color={COLORS.light.textPrimary} />
              <Text style={styles.layoutMenuItemText}>Timeline</Text>
            </Pressable>
            <Pressable 
              style={styles.layoutMenuItem}
              onPress={() => handleChangeLayout('freeform')}
            >
              <Layout size={20} color={COLORS.light.textPrimary} />
              <Text style={styles.layoutMenuItemText}>Freeform</Text>
            </Pressable>
            <Pressable 
              style={styles.layoutMenuItem}
              onPress={() => handleChangeLayout('map')}
            >
              <MapPin size={20} color={COLORS.light.textPrimary} />
              <Text style={styles.layoutMenuItemText}>Map</Text>
            </Pressable>
          </View>
        )}
      </View>
      
      {renderContent()}
      
      <CreatePostFAB onPress={() => setCreateModalVisible(true)} />
      
      <CreatePostModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onCreatePost={handleCreatePost}
        boardId={id || ''}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.background,
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
    borderBottomColor: COLORS.light.border,
    position: 'relative',
  },
  layoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.light.cardBackground,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.light.border,
  },
  layoutButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.light.textPrimary,
  },
  layoutMenu: {
    position: 'absolute',
    top: 56,
    left: 12,
    backgroundColor: COLORS.light.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.light.border,
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
    borderBottomColor: COLORS.light.border,
  },
  layoutMenuItemText: {
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.light.textPrimary,
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
    color: COLORS.light.textSecondary,
  },
});