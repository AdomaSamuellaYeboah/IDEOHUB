import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Pressable, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { useRouter, Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useUserStore } from '../../store/userstore';
import COLORS from '../../constants/colors';
import api from '../../store/api';
import axios from 'axios';
import { useColorScheme } from 'react-native';
import { replace } from 'expo-router/build/global-state/routing';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();
  const { setUser, getThemeColors } = useUserStore();
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  
  const handleSignup = async () => {
    setIsLoading(true);
    setError('');
    
    // Validate inputs
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setIsLoading(false);
      return;
    }

    //validate email with email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      setIsLoading(false);
      return;
    }
    
    //user data to be passed to the api for signup at
    //http://localhost:3000/register
    const mockUser = {
      email: email.trim(),
      password: password.trim()
    };

    try {
      const response = await axios.post(`${api}/register`,mockUser)
      
      if (response.data.status) {
        Alert.alert(response.data.message)
        setIsLoading(false);
        router.replace('/(auth)/login')
      }
        
    } catch (error) {
      setError('Failed to create account. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <LinearGradient
            colors={[COLORS.orange, COLORS.purple]}
            style={styles.logoBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.logoText}></Text>
          </LinearGradient>
          <Text style={[styles.appName, { color: colors.textPrimary }]}>IdeoHub</Text>
          <Text style={[styles.tagline, { color: colors.textSecondary }]}>Join the community</Text>
        </View>
        
        <View style={styles.formContainer}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <Text style={[styles.label, { color: colors.textPrimary }]}>Full Name</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.cardBackground, 
              borderColor: colors.border,
              color: colors.textPrimary 
            }]}
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            placeholderTextColor={colors.textSecondary}
            autoCapitalize="words"
          />
          
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
            placeholder="Create a password (min 8 characters)"
            placeholderTextColor={colors.textSecondary}
            secureTextEntry
          />
          
          <Pressable 
            style={[styles.button, styles.signupButton]} 
            onPress={handleSignup}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </Pressable>
          
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>Already have an account? </Text>
            <Link href="/login" asChild>
              <Pressable>
                <Text style={styles.footerLink}>Log In</Text>
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
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoBackground: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
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
    alignItems: 'center',
    marginBottom: 12,
  },
  signupButton: {
    backgroundColor: COLORS.orange,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 16,
  },
  footerLink: {
    color: COLORS.orange,
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: COLORS.red,
    marginBottom: 16,
    textAlign: 'center',
  },
});