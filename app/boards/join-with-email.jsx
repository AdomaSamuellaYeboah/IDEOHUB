import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function JoinWithEmailScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [boardName, setBoardName] = useState('');
  const [error, setError] = useState('');

  const handleJoin = () => {
    // TODO: Implement email request logic
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (boardName.length < 3) {
      setError('Board name must be at least 3 characters');
      return;
    }
    setError('');
    // Send email request and show success/error message
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Join with Email</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Request to join a board via email
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Your email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Board name"
            value={boardName}
            onChangeText={setBoardName}
            autoCapitalize="words"
          />
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity 
          style={styles.joinButton}
          onPress={handleJoin}
          disabled={email.length === 0 || boardName.length < 3}
        >
          <Text style={styles.joinButtonText}>Request to Join</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.replace('/(screen)/join')}
        >
          <Text style={styles.backButtonText}>Back to Join Options</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
    color: '#333',
  },
  error: {
    color: '#dc3545',
    fontSize: 14,
    marginBottom: 16,
  },
  joinButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4a90e2',
  },
  backButtonText: {
    color: '#4a90e2',
    fontSize: 16,
    fontWeight: '500',
  },
});
