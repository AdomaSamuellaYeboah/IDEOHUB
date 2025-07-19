import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { Search } from 'lucide-react-native';
import BoardCard from '../../components/boardcard';
import EmptyState from '../../components/emptystate';
import COLORS from '../../constants/colors';
import { useBoardStore } from '../../store/boardstore';
import { useUserStore } from '../../store/userstore';
import { useColorScheme } from 'react-native';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { boards } = useBoardStore();
  const { getThemeColors } = useUserStore();
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  
  // Filter public boards
  const publicBoards = boards.filter(board => board.isPublic);
  
  // Filter by search query
  const filteredBoards = searchQuery
    ? publicBoards.filter(board => 
        board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (board.description && board.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : publicBoards;

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

  const handleShareBoard = async (board) => {
    try {
      await Share.share({
        message: `Check out this amazing board on IdeoHub: "${board.title}"${board.description ? ` - ${board.description}` : ''}`,
        title: board.title,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share board');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.searchContainer, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
        <Search size={20} color={colors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: colors.textPrimary }]}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search public boards..."
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      {filteredBoards.length === 0 ? (
        <EmptyState 
          title="No boards found"
          message={searchQuery 
            ? "Try a different search term" 
            : "There are no public boards available yet"}
        />
      ) : (
        <FlatList
          data={filteredBoards}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BoardCard board={item} />}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  listContent: {
    padding: 16,
  },
});