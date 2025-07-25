import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Pressable, BackHandler, ToastAndroid } from "react-native";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import { useBoardStore } from "../../store/boardstore";
import { useUserStore } from "../../store/userstore";
import BoardCard from "../../components/boardcard";
import EmptyState from "../../components/emptystate";
import CreateBoardModal from "../../components/createboardmodal";
import COLORS from "../../constants/colors";
import { useColorScheme } from "react-native";

export default function BoardsScreen() {
  const { boards, fetchBoards, createBoard } = useBoardStore();
  const [handleOpen, setHandleOpen] = useState(false);
  const { isAuthenticated, getThemeColors } = useUserStore();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const [backPressCount, setBackPressCount] = useState(0);

  useEffect(() => {
    // Only fetch boards if authenticated
    if (isAuthenticated) {
      fetchBoards();
    }
    // Removed the else block to prevent automatic redirection
    // This allows the login flow to work smoothly
  }, [isAuthenticated]);

  // Handle back button press only on boards tab
  useEffect(() => {
    const backAction = () => {
      // Only handle back press when user is on the boards tab (index)
      if (router.canGoBack()) {
        // If user can go back (not on the main tab), let default behavior happen
        return false;
      }
      
      // User is on the main boards tab - implement double tap to exit
      if (backPressCount === 0) {
        setBackPressCount(1);
        ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
        
        // Reset back press count after 2 seconds
        setTimeout(() => {
          setBackPressCount(0);
        }, 2000);
        
        return true; // Prevent default back action
      } else {
        // Second back press - exit app
        BackHandler.exitApp();
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [backPressCount, router]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>My Boards</Text>
                  <View style={styles.headerActions}>
          <Pressable
            style={styles.createButton}
            onPress={() => {
              setHandleOpen(true);
            }}
          >
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.createButtonText}>New Board</Text>
          </Pressable>
        </View>
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
        visible={handleOpen}
        onClose={() => setHandleOpen(false)}
        onCreate={async (newBoard) => {
          await createBoard(newBoard);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  createButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.orange,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    marginLeft: 4,
  },
  listContent: {
    padding: 16,
  },
});
