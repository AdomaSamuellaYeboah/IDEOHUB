import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share, Alert } from 'react-native';
import { Heart, MessageCircle, Share2 } from 'lucide-react-native';
import { useUserStore } from '../store/userstore';
import { useBoardStore } from '../store/boardstore';
import COLORS from '../constants/colors';
import { useColorScheme } from 'react-native';

export default function SocialActions({ boardId, onCommentPress }) {
  const { user, isBoardLiked, likeBoard, unlikeBoard, getThemeColors } = useUserStore();
  const { currentBoard, likeBoard: likeBoardAction, shareBoard } = useBoardStore();
  const colorScheme = useColorScheme();
  
  // Memoize colors to prevent infinite re-renders
  const colors = useMemo(() => getThemeColors(colorScheme), [getThemeColors, colorScheme]);

  const isLiked = isBoardLiked(boardId);
  const likesCount = currentBoard?.likes?.length || 0;
  const commentsCount = currentBoard?.comments?.length || 0;
  const sharesCount = currentBoard?.shares || 0;

  const handleLike = async () => {
    try {
      await likeBoardAction(boardId, user.id);
      if (isLiked) {
        unlikeBoard(boardId);
      } else {
        likeBoard(boardId);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to like board');
    }
  };

  const handleShare = async () => {
    try {
      await shareBoard(boardId);
      
      // Use native share dialog
      await Share.share({
        message: `Check out this board: ${currentBoard?.title}`,
        title: currentBoard?.title,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share board');
    }
  };

  const handleComment = () => {
    if (onCommentPress) {
      onCommentPress();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={handleLike}
      >
        <Heart
          size={20}
          color={isLiked ? COLORS.orange : colors.textSecondary}
          fill={isLiked ? COLORS.orange : 'none'}
        />
        <Text style={[styles.actionText, { color: colors.textSecondary }]}>
          {likesCount}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={handleComment}
      >
        <MessageCircle size={20} color={colors.textSecondary} />
        <Text style={[styles.actionText, { color: colors.textSecondary }]}>
          {commentsCount}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={handleShare}
      >
        <Share2 size={20} color={colors.textSecondary} />
        <Text style={[styles.actionText, { color: colors.textSecondary }]}>
          {sharesCount}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
  },
}); 