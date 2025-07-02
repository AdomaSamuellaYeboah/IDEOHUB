import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { Search } from 'lucide-react-native';
import BoardCard from '../../components/BoardCard';
import EmptyState from '../../components/EmptyState';
import COLORS from '../../constants/colors';
import { useBoardStore } from '../../store/boardStore';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { boards } = useBoardStore();
  
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
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color={COLORS.light.textSecondary} />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search public boards..."
          placeholderTextColor={COLORS.light.textSecondary}
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
    backgroundColor: COLORS.light.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.light.cardBackground,
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.light.border,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
    color: COLORS.light.textPrimary,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
});