import React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Grid, ListFilter, Clock, MapPin, Layout } from 'lucide-react-native';
import COLORS from '../constants/colors';



const getLayoutIcon = (layout) => {
  switch (layout) {
    case 'grid':
      return <Grid size={16} color={COLORS.light.textSecondary} />;
    case 'stream':
      return <ListFilter size={16} color={COLORS.light.textSecondary} />;
    case 'timeline':
      return <Clock size={16} color={COLORS.light.textSecondary} />;
    case 'map':
      return <MapPin size={16} color={COLORS.light.textSecondary} />;
    case 'freeform':
      return <Layout size={16} color={COLORS.light.textSecondary} />;
    default:
      return <Grid size={16} color={COLORS.light.textSecondary} />;
  }
};

export default function BoardCard({ board }) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/boards/${board.id}`);
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
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
      </View>
      <View style={styles.footer}>
        <View style={styles.layoutBadge}>
          {getLayoutIcon(board.layout)}
          <Text style={styles.layoutText}>
            {board.layout.charAt(0).toUpperCase() + board.layout.slice(1)}
          </Text>
        </View>
        <View style={styles.privacyBadge}>
          <Text style={styles.privacyText}>
            {board.isPublic ? 'Public' : 'Private'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.light.cardBackground,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  layoutBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.light.border,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  layoutText: {
    fontSize: 12,
    color: COLORS.light.textSecondary,
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
});