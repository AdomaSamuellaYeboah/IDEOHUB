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

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();
  const { setUser } = useUserStore();
  
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
      //show that the content is a json file
      const headers = {
        'Content-Type': 'application/json',
      };

      const data = mockUser;

      //makes a post request to the api
      const response = await axios.post(`${api}register`, data, {
        headers
      });

      //logs the response data
      console.log(response.data);

      if(response.data.status === 'success'){
        Alert.alert('Success', 'User registered successfully');
        
        //redirects to the home screen
        router.replace('/');
        
        //sets the user data
        setUser(mockUser);
      }
      
     
      
    } catch (error) {
      if (error.response) {
       if(error.response.status === 400){
         Alert.alert('Error', error.response.data.message || 'Something went wrong');
       }else if(error.response.status === 401){
         Alert.alert('Error', error.response.data.message || 'Something went wrong');
       }else if(error.response.status === 404){
         Alert.alert('Error', error.response.data.message || 'Something went wrong');
       }else if(error.response.status === 500){
         Alert.alert('Error', error.response.data.message || 'Something went wrong');
       }
      }else{
        Alert.alert('Error', 'Something went wrong');
      }

    }
    
      
      setUser(mockUser);
      router.replace('/');
      setIsLoading(false);
    
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
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
            <Text style={styles.logoText}>IH</Text>
          </LinearGradient>
          <Text style={styles.appName}>IdeaHub</Text>
          <Text style={styles.tagline}>Join the collaborative platform</Text>
        </View>
        
        <View style={styles.formContainer}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor={COLORS.light.textSecondary}
          />
          
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
            placeholder="Create a password"
            placeholderTextColor={COLORS.light.textSecondary}
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
            <Text style={styles.footerText}>Already have an account? </Text>
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
    backgroundColor: COLORS.light.background,
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
    color: COLORS.light.textPrimary,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: COLORS.light.textSecondary,
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
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
    color: COLORS.light.textSecondary,
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