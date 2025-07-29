import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import COLORS from '../constants/colors';
import { useUserStore } from '../store/userstore';
import { useBoardStore } from '../store/boardstore';
import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';

export default function TemplateDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { name, description, type, layout, color } = params;
  const { isAuthenticated, getThemeColors } = useUserStore();
  const { createBoard } = useBoardStore();
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const [isCreating, setIsCreating] = useState(false);

  const handleUseTemplate = async () => {
    if (!isAuthenticated) {
      Alert.alert(
        'Authentication Required',
        'Please log in to use templates and create boards.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Login', onPress: () => router.push('/(auth)/login') }
        ]
      );
      return;
    }

    setIsCreating(true);
    try {
      // Create a new board based on the template
      const newBoard = {
        title: `${name} Board`,
        description: description || `A ${type.toLowerCase()} board created from the ${name} template.`,
        layout: layout || 'grid',
        isPublic: false, // Default to private for user-created boards
        backgroundColor: color,
        category: type,
        coverImage: null, // User can add their own cover image later
        templateName: name, // Pass template name for sample posts
      };

      await createBoard(newBoard);
      
      Alert.alert(
        'Board Created!',
        `Your ${name} board has been created successfully with sample content to get you started.`,
        [
          { 
            text: 'View Board', 
            onPress: () => {
              // Navigate to the boards screen to see the new board
              router.push('/(tabs)');
            }
          },
          { text: 'Create Another', onPress: () => {} }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create board from template. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack.Screen name="template-details" options={{ headerShown: false }} />
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Colored Header */}
      <View style={[styles.header, { backgroundColor: color + '1A' }]}>
        <View style={[styles.iconCircle, { backgroundColor: color + '33' }]}>
          <Text style={[styles.iconText, { color }]}>{name.charAt(0)}</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{name}</Text>
        <Text style={[styles.type, { color }]}>{type}</Text>
        <View style={styles.divider} />
        <Text style={[styles.description, { color: colors.textSecondary }]}>{description}</Text>
        
        {/* Template Details */}
        <View style={[styles.detailsContainer, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.detailsTitle, { color: colors.textPrimary }]}>What you'll get:</Text>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Layout:</Text>
            <Text style={[styles.detailValue, { color: colors.textPrimary }]}>{layout}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Type:</Text>
            <Text style={[styles.detailValue, { color: colors.textPrimary }]}>{type}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Privacy:</Text>
            <Text style={[styles.detailValue, { color: colors.textPrimary }]}>Private (you can change this later)</Text>
          </View>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button, 
              { backgroundColor: color },
              isCreating && styles.buttonDisabled
            ]}
            onPress={handleUseTemplate}
            disabled={isCreating}
          >
            {isCreating ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color="#fff" size="small" />
                <Text style={styles.buttonText}>Creating...</Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>Use this template</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.back()}
          >
            <Text style={[styles.secondaryButtonText, { color: colors.textSecondary }]}>
              Back to Explore
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    width: '100%',
    padding: 24,
    paddingTop: 60,
    paddingBottom: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  type: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    width: '40%',
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: COLORS.textSecondary,
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 60, 
    paddingBottom: 24,
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    padding: 12,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '500',
  },
  detailsContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 32,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});
