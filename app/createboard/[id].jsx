import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useUserStore } from "../../store/userstore";
import { useColorScheme } from "react-native";
import COLORS from "../../constants/colors";

export default function JoinWithCodeScreen() {
  const router = useRouter();
  const [boardCode, setBoardCode] = useState("");
  const [error, setError] = useState("");
  const { id } = useLocalSearchParams();
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [boardName, setBoardName] = useState("");
  
  const { getThemeColors } = useUserStore();
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);

  const handleJoin = () => {
    // TODO: Implement board code validation and joining logic
  };

  return (
    <>
      <StatusBar barStyle={colorScheme === 'dark' ? "light-content" : "dark-content"} />
      <View
        style={{ height: StatusBar.currentHeight, backgroundColor: colors.background }}
      />

      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Join with {id.toLocaleString()}</Text>
        </View>

        <View style={styles.content}>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {id === "code" && " Enter the board code to join an existing board"}
            {id === "link" && " Enter the shared link to join a board"}
            {id === "email" && " Request to join a board via email"}
          </Text>

          {/*join with code  */}
          {id === "code" && (
            <>
              <Text style={[styles.debugText, { color: colors.textSecondary }]}>
                Board ID from params: {id}
              </Text>

              <View style={[styles.inputContainer, { backgroundColor: colors.cardBackground }]}>
                <TextInput
                  style={[styles.input, { color: colors.textPrimary }]}
                  placeholder="Enter board code"
                  placeholderTextColor={colors.textSecondary}
                  value={boardCode}
                  onChangeText={setBoardCode}
                  maxLength={6}
                  keyboardType="default"
                  autoCapitalize="characters"
                />
              </View>
            </>
          )}

          {/* for email   */}
          {id === "email" && (
            <>
              <View style={[styles.inputContainer, { backgroundColor: colors.cardBackground }]}>
                <TextInput
                  style={[styles.input, { color: colors.textPrimary }]}
                  placeholder="Your email address"
                  placeholderTextColor={colors.textSecondary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <View style={[styles.inputContainer, { backgroundColor: colors.cardBackground }]}>
                <TextInput
                  style={[styles.input, { color: colors.textPrimary }]}
                  placeholder="Board name"
                  placeholderTextColor={colors.textSecondary}
                  value={boardName}
                  onChangeText={setBoardName}
                  autoCapitalize="words"
                />
              </View>
            </>
          )}

          {/* for link */}
          {id === "link" && (
            <>
              <View style={[styles.inputContainer, { backgroundColor: colors.cardBackground }]}>
                <TextInput
                  style={[styles.input, { color: colors.textPrimary }]}
                  placeholder="Enter board link"
                  placeholderTextColor={colors.textSecondary}
                  value={link}
                  onChangeText={setLink}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </>
          )}
          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity
            style={styles.joinButton}
            onPress={handleJoin}
            disabled={boardCode.length !== 6}
          >
            <Text style={styles.joinButtonText}>Join Board</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.cardBackground, borderColor: COLORS.orange }]}
            onPress={() => router.replace("/(tabs)/join")}
          >
            <Text style={[styles.backButtonText, { color: COLORS.orange }]}>Back to Join Options</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

JoinWithCodeScreen.options = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 22,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 18,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  description: {
    fontSize: 17,
    marginBottom: 24,
  },
  debugText: {
    marginBottom: 10,
  },
  inputContainer: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  input: {
    fontSize: 18,
    textAlign: "center",
  },
  error: {
    color: "#dc3545",
    fontSize: 14,
    marginBottom: 16,
  },
  joinButton: {
    backgroundColor: COLORS.orange,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  joinButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
