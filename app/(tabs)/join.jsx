import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useUserStore } from "../../store/userstore";
import { useColorScheme } from "react-native";
import COLORS from "../../constants/colors";

export default function JoinScreen() {
  const router = useRouter();
  const { getThemeColors } = useUserStore();
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);

  const joinMethods = [
    {
      icon: "group-add",
      title: "Join with Code",
      description: "Enter a board code to join an existing board",
      onPress: () => router.push("/createboard/code"), // Assuming this is the correct path for joining with code
    },
    {
      icon: "link",
      title: "Join with Link",
      description: "Enter a shared link to join a board",
      onPress: () => router.push("/createboard/link"), // Assuming this is the correct path for joining with link
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Join Board</Text>
        {/*<Text style={styles.subtitle}>Choose how you want to join a board</Text>*/}

        {joinMethods.map((method, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.methodCard, { backgroundColor: colors.cardBackground }]}
            onPress={method.onPress}
          >
            <View style={[styles.methodIcon, { backgroundColor: colors.background }]}>
              <MaterialIcons name={method.icon} size={28} color={COLORS.orange} />
            </View>
            <View style={styles.methodContent}>
              <Text style={[styles.methodTitle, { color: colors.textPrimary }]}>{method.title}</Text>
              <Text style={[styles.methodDescription, { color: colors.textSecondary }]}>{method.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  methodCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  methodContent: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  methodDescription: {
    fontSize: 14,
  },
});
