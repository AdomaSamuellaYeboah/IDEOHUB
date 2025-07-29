import React, { useState, useEffect, useMemo } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import { X, Send, Trash2, User } from 'lucide-react-native';
import { useUserStore } from '../store/userstore';
import { useBoardStore } from '../store/boardstore';
import COLORS from '../constants/colors';
import { useColorScheme } from 'react-native';

export default function CommentModal({ visible, onClose, boardId }) {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const { user, getUserProfile, getThemeColors } = useUserStore();
  const { getBoardComments, addComment, deleteComment } = useBoardStore();
  const colorScheme = useColorScheme();
  
  // Memoize colors to prevent infinite re-renders
  const colors = useMemo(() => getThemeColors(colorScheme), [getThemeColors, colorScheme]);

  useEffect(() => {
    if (visible && boardId) {
      const boardComments = getBoardComments(boardId);
      setComments(boardComments);
    }
  }, [visible, boardId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    try {
      await addComment(boardId, user.id, newComment.trim());
      setNewComment('');
      // Refresh comments
      const updatedComments = getBoardComments(boardId);
      setComments(updatedComments);
    } catch (error) {
      Alert.alert('Error', 'Failed to add comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    Alert.alert(
      'Delete Comment',
      'Are you sure you want to delete this comment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteComment(commentId, boardId);
              // Refresh comments
              const updatedComments = getBoardComments(boardId);
              setComments(updatedComments);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete comment');
            }
          },
        },
      ]
    );
  };

  const renderComment = ({ item }) => {
    const commentUser = getUserProfile(item.userId);
    const isOwnComment = item.userId === user?.id;

    return (
      <View style={[styles.commentItem, { borderBottomColor: colors.border }]}>
        <View style={styles.commentHeader}>
          <View style={styles.userInfo}>
            <View style={[styles.avatar, { backgroundColor: colors.cardBackground }]}>
              <User size={16} color={colors.textSecondary} />
            </View>
            <View style={styles.userDetails}>
              <Text style={[styles.userName, { color: colors.textPrimary }]}>
                {commentUser?.name || 'Unknown User'}
              </Text>
              <Text style={[styles.commentTime, { color: colors.textSecondary }]}>
                {new Date(item.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
          {isOwnComment && (
            <TouchableOpacity
              onPress={() => handleDeleteComment(item.id)}
              style={styles.deleteButton}
            >
              <Trash2 size={16} color={colors.error} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={[styles.commentText, { color: colors.textPrimary }]}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
            Comments ({comments.length})
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Comments List */}
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={renderComment}
          style={styles.commentsList}
          contentContainerStyle={styles.commentsContent}
          showsVerticalScrollIndicator={false}
        />

        {/* Add Comment Input */}
        <View style={[styles.inputContainer, { borderTopColor: colors.border }]}>
          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.cardBackground,
              color: colors.textPrimary,
              borderColor: colors.border
            }]}
            placeholder="Add a comment..."
            placeholderTextColor={colors.textSecondary}
            value={newComment}
            onChangeText={setNewComment}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              { 
                backgroundColor: newComment.trim() ? COLORS.orange : colors.border,
                opacity: newComment.trim() ? 1 : 0.5
              }
            ]}
            onPress={handleAddComment}
            disabled={!newComment.trim()}
          >
            <Send size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  commentsList: {
    flex: 1,
  },
  commentsContent: {
    padding: 16,
  },
  commentItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  commentTime: {
    fontSize: 12,
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 44,
  },
  deleteButton: {
    padding: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    gap: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 