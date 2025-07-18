import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter, Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useUserStore } from "../../store/userstore";
import COLORS from "../../constants/colors";
import { useColorScheme } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { setUser, getThemeColors } = useUserStore();
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);

  const handleLogin = () => {
    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, any email/password combination works
      if (email.trim() && password.trim()) {
        const mockUser = {
          id: "1",
          name: "Demo User",
          email: email.trim(),
          createdAt: new Date().toISOString(),
          preferences: {
            theme: "system",
            notifications: true,
          },
        };

        setUser(mockUser);
        router.replace("/(tabs)/index");
      } else {
        setError("Please enter both email and password");
      }

      setIsLoading(false);
    }, 1000);
  };

  const handleDemoLogin = () => {
    setEmail("demo@example.com");
    setPassword("password");

    // Trigger login after state update
    setTimeout(handleLogin, 100);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <LinearGradient
            colors={[COLORS.orange, COLORS.purple]}
            style={styles.logoBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* logo */}
            <Image
              source={require("../../assets/images/IdeoHublogo.png")}
              style={styles.logo}
            />
            <Text style={styles.logoText}>IH</Text>
          </LinearGradient>
          <Text style={[styles.appName, { color: colors.textPrimary }]}>IdeoHub</Text>
          <Text style={[styles.tagline, { color: colors.textSecondary }]}>Collaborate, Create, Connect</Text>
        </View>
        <View style={styles.formContainer}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Text style={[styles.label, { color: colors.textPrimary }]}>Email</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.cardBackground, 
              borderColor: colors.border,
              color: colors.textPrimary 
            }]}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={[styles.label, { color: colors.textPrimary }]}>Password</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.cardBackground, 
              borderColor: colors.border,
              color: colors.textPrimary 
            }]}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor={colors.textSecondary}
            secureTextEntry
          />

          <Pressable
            style={[styles.button, styles.loginButton]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Logging in..." : "Log In"}
            </Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.demoButton]}
            onPress={handleDemoLogin}
            disabled={isLoading}
          >
            <Text style={styles.demoButtonText}>Try Demo</Text>
          </Pressable>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>Don't have an account? </Text>
            <Link href="/signup" asChild>
              <Pressable>
                <Text style={styles.footerLink}>Sign Up</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoBackground: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
  },
  formContainer: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: COLORS.orange,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  demoButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.orange,
  },
  demoButtonText: {
    color: COLORS.orange,
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    fontSize: 16,
  },
  footerLink: {
    color: COLORS.orange,
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: COLORS.red,
    marginBottom: 16,
    textAlign: "center",
  },
});
