import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { ExternalLink, Image as ImageIcon, MessageSquare, Heart } from 'lucide-react-native';
import COLORS from '../constants/colors';
import { useUserStore } from '../store/userstore';
import { useColorScheme } from 'react-native';

export default function PostCard({ post, onPress, onLongPress }) {
  const [liked, setLiked] = useState(false);
  const { getThemeColors } = useUserStore();
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);

  const handleLike = () => {
    setLiked(!liked);
    // In a real app, you would update the post reactions here
  };

  return (
    <Pressable 
      style={[styles.container, { backgroundColor: colors.cardBackground }]} 
      onPress={onPress}
      onLongPress={onLongPress}
    >
      {post.content.imageUrl && (
        <Image source={{ uri: post.content.imageUrl }} style={styles.image} />
      )}
      
      {post.content.text && (
        <Text style={[styles.text, { color: colors.textPrimary }]}>{post.content.text}</Text>
      )}
      
      {post.content.linkUrl && (
        <View style={styles.linkContainer}>
          <ExternalLink size={16} color={COLORS.lightBlue} />
          <Text style={styles.link} numberOfLines={1}>
            {post.content.linkUrl}
          </Text>
        </View>
      )}
      
      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <Pressable style={styles.iconButton} onPress={handleLike}>
          <Heart 
            size={18} 
            color={liked ? COLORS.red : colors.textSecondary} 
            fill={liked ? COLORS.red : 'transparent'} 
          />
        </Pressable>
        
        <Pressable style={styles.iconButton}>
          <MessageSquare size={18} color={colors.textSecondary} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin: 8,
    maxWidth: 280,
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  text: {
    padding: 12,
    fontSize: 14,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  link: {
    marginLeft: 4,
    fontSize: 14,
    color: COLORS.lightBlue,
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    padding: 8,
  },
  iconButton: {
    padding: 4,
    marginRight: 12,
  },
});