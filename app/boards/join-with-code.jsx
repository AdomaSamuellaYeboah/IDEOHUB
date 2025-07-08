import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';

export default function JoinWithCodeScreen() {
  
  const router = useRouter();
  const [boardCode, setBoardCode] = useState('');
  const [error, setError] = useState('');

  const handleJoin = () => {
    // TODO: Implement board code validation and joining logic
    if (boardCode.length !== 6) {
      setError('Board code must be 6 characters long');
      return;
    }
    setError('');
    // Navigate to board or show success/error message
  };

  return (
    
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Join with Code</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.description}>
            Enter the board code to join an existing board
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter board code"
              value={boardCode}
              onChangeText={setBoardCode}
              maxLength={6}
              keyboardType="default"
              autoCapitalize="characters"
            />
          </View>

          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity 
            style={styles.joinButton}
            onPress={handleJoin}
            disabled={boardCode.length !== 6}
          >
            <Text style={styles.joinButtonText}>Join Board</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.replace('/(tabs)/join')}
          >
            <Text style={styles.backButtonText}>Back to Join Options</Text>
          </TouchableOpacity>
        </View>
      </View>
    
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
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 18,
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  description: {
    fontSize: 17,
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
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  error: {
    color: '#dc3545',
    fontSize: 14,
    marginBottom: 16,
  },
  joinButton: {
    backgroundColor: '#f4a526',
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
    borderColor: '#f4a526',
  },
  backButtonText: {
    color: '#f4a526',
    fontSize: 16,
    fontWeight: '500',
  },
});
