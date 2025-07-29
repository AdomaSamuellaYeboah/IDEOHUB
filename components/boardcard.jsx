import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Grid, List, Clock, Heart, MoreVertical } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import COLORS from '../constants/colors';
import { useUserStore } from '../store/userstore';
import { useColorScheme } from 'react-native';

const getLayoutIcon = (layout) => {
  switch (layout) {
    case 'grid':
      return <Grid size={16} color={COLORS.lightBlue} />;
    case 'stream':
      return <List size={16} color={COLORS.lightBlue} />;
    case 'timeline':
      return <Clock size={16} color={COLORS.lightBlue} />;
    default:
      return <Grid size={16} color={COLORS.lightBlue} />;
  }
};

export default function BoardCard({ board, onEdit }) {
  const router = useRouter();
  const { getThemeColors, likeBoard, unlikeBoard, isBoardLiked } = useUserStore();
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);

  const handlePress = () => {
    router.push(`/boards/${board.id}`);
  };

  const liked = isBoardLiked?.(board.id);
  const handleLike = (e) => {
    e.stopPropagation && e.stopPropagation();
    liked ? unlikeBoard(board.id) : likeBoard(board.id);
  };

  const handleEdit = (e) => {
    e.stopPropagation && e.stopPropagation();
    if (onEdit) {
      onEdit(board);
    }
  };

  return (
    <Pressable style={[styles.container, { backgroundColor: colors.cardBackground }]} onPress={handlePress}>
      <View style={styles.imageContainer}>
        {board.coverImage ? (
          <Image source={{ uri: board.coverImage }} style={styles.coverImage} />
        ) : (
          <LinearGradient
            colors={['#3E9CFF', '#A152DB']}
            style={styles.gradientCover}
          />
        )}
        <View style={styles.overlay} />
        <Text style={styles.title}>{board.title}</Text>
        {board.description && (
          <Text style={styles.description} numberOfLines={2}>
            {board.description}
          </Text>
        )}
        
        {/* Edit button overlay */}
        <Pressable style={styles.editButton} onPress={handleEdit}>
          <MoreVertical size={20} color="#FFFFFF" />
        </Pressable>
      </View>
      <View style={styles.footer}>
        <View style={[styles.layoutBadge, { backgroundColor: colors.border }]}>
          {getLayoutIcon(board.layout)}
          <Text style={[styles.layoutText, { color: colors.textSecondary }]}>
            {board.layout.charAt(0).toUpperCase() + board.layout.slice(1)}
          </Text>
        </View>
        <View style={styles.privacyBadge}>
          <Text style={styles.privacyText}>
            {board.isPublic ? 'Public' : 'Private'}
          </Text>
        </View>
        <Pressable onPress={handleLike} style={{ marginLeft: 8, padding: 4 }}>
          <Heart size={20} color={liked ? COLORS.red : colors.textSecondary} fill={liked ? COLORS.red : 'transparent'} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    height: 160,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  gradientCover: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  title: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    position: 'absolute',
    bottom: 40, // Adjust position to be above the title
    left: 12,
    right: 12,
    color: '#FFFFFF',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  layoutBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  layoutText: {
    fontSize: 12,
    marginLeft: 4,
  },
  privacyBadge: {
    backgroundColor: COLORS.orange,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  privacyText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  editButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});