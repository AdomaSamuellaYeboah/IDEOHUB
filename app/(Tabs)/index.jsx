import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { useBoardStore } from '../../store/boardstore';
import { useUserStore } from '../../store/userstore';
import BoardCard from '../../components/boardcard';
import EmptyState from '../../components/emptystate';
import CreateBoardModal from '../../components/createboardmodal';
import COLORS from '../../constants/colors';

export default function BoardsScreen() {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const { boards, fetchBoards, createBoard, isLoading } = useBoardStore();
  const { isAuthenticated } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      fetchBoards();
    } else {
      router.replace('/login');
    }
  }, [isAuthenticated]);

  const handleCreateBoard = (data) => {
    createBoard(data);
    setCreateModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Boards</Text>
       {/* <Pressable 
          style={styles.createButton} 
          onPress={() => setCreateModalVisible(true)}
        >
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.createButtonText}>New Board</Text>
        </Pressable> */}
      </View>

      {boards.length === 0 ? (
        <EmptyState 
          title="No boards yet"
          message="Create your first board to get started with organizing your ideas."
        />
      ) : (
        <FlatList
          data={boards}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BoardCard board={item} />}
          contentContainerStyle={styles.listContent}
        />
      )}

      <CreateBoardModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onCreateBoard={handleCreateBoard}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light.border,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.light.textPrimary,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.orange,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  listContent: {
    padding: 16,
  },
});