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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { setUser } = useUserStore();

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
        router.replace("/");
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
      style={styles.container}
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
            <Text style={styles.logoText}>IH</Text>
          </LinearGradient>
          <Text style={styles.appName}>IdeaHub</Text>
          <Text style={styles.tagline}>Collaborate, Create, Connect</Text>
        </View>
        <View style={styles.formContainer}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={COLORS.light.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor={COLORS.light.textSecondary}
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
            <Text style={styles.footerText}>Don't have an account? </Text>
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
    backgroundColor: COLORS.light.background,
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
    color: COLORS.light.textPrimary,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: COLORS.light.textSecondary,
  },
  formContainer: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.light.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.light.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.light.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.light.textPrimary,
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
    color: COLORS.light.textSecondary,
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
