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