import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function JoinScreen() {
  const router = useRouter();

  const joinMethods = [
    {
      icon: 'group-add',
      title: 'Join with Code',
      description: 'Enter a board code to join an existing board',
      onPress: () => router.push('/boards/join-with-code')
    },
    {
      icon: 'link',
      title: 'Join with Link',
      description: 'Enter a shared link to join a board',
      onPress: () => router.push('/boards/join-with-link')
    },
    {
      icon: 'email',
      title: 'Join with Email',
      description: 'Request to join a board via email',
      onPress: () => router.push('/boards/join-with-email')
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Join Board</Text>
        {/*<Text style={styles.subtitle}>Choose how you want to join a board</Text>*/}

        {joinMethods.map((method, index) => (
          <TouchableOpacity
            key={index}
            style={styles.methodCard}
            onPress={method.onPress}
          >
            <View style={styles.methodIcon}>
              <MaterialIcons name={method.icon} size={28} color="#f4a526" />
            </View>
            <View style={styles.methodContent}>
              <Text style={styles.methodTitle}>{method.title}</Text>
              <Text style={styles.methodDescription}>{method.description}</Text>
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
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    color: '#3787f2',
    marginBottom: 24,
  },
  methodCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  methodIcon: {
    backgroundColor: '#f5f5f5',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  methodContent: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  methodDescription: {
    fontSize: 14,
    color: '#f4a526',
  },
});
