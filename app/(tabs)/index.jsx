import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Plus, Bell } from "lucide-react-native";
import { useBoardStore } from "../../store/boardstore";
import { useUserStore } from "../../store/userstore";
import BoardCard from "../../components/boardcard";
import EmptyState from "../../components/emptystate";
import CreateBoardModal from "../../components/createboardmodal";
import COLORS from "../../constants/colors";
import { useColorScheme } from "react-native";

export default function BoardsScreen() {
  const { boards, fetchBoards } = useBoardStore();
  const [handleOpen, setHandleOpen] = useState(false);
  const { isAuthenticated, getThemeColors } = useUserStore();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBoards();
    } else {
      router.replace("/login");
    }
  }, [isAuthenticated]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>My Boards</Text>
                  <View style={styles.headerActions}>
            <Pressable 
              style={styles.notificationButton}
              onPress={() => {}}
            >
              <Bell size={20} color={colors.textPrimary} />
            </Pressable>
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
    paddingVertical: 12,
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
  notificationButton: {
    position: "relative",
    padding: 8,
  },
  notificationBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: COLORS.red,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
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
