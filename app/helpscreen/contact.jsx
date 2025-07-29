import React, { useState } from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput, Pressable, Alert, KeyboardAvoidingView, Platform, Linking} from 'react-native';
import { useRouter } from 'expo-router';
import { useUserStore } from '../../store/userstore';
import { useColorScheme } from 'react-native';
import { Mail, MessageSquare, Send, ArrowUpRight, MapPin, Phone, Clock } from 'lucide-react-native';

export default function ContactScreen() {
  const router = useRouter();
  const { theme } = useUserStore();
  const colorScheme = useColorScheme();
  const colors = useUserStore.getState().getThemeColors(colorScheme);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    // In a real app, you would send this data to your backend
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        'Message Sent',
        'Thank you for contacting us! We will get back to you as soon as possible.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setName('');
              setEmail('');
              setSubject('');
              setMessage('');
              router.back();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openMaps = () => {
    const address = 'Computer Science Department, Kwame Nkrumah University of Science and Technology, Kumasi, Ghana';
    const url = Platform.select({
      ios: `maps:0,0?q=${encodeURIComponent(address)}`,
      android: `geo:0,0?q=${encodeURIComponent(address)}`,
    });
    
    Linking.openURL(url).catch(err => 
      Alert.alert('Error', 'Could not open maps')
    );
  };

  const openPhone = () => {
    Linking.openURL('tel:+233207220443').catch(err => 
      Alert.alert('Error', 'Could not open phone app')
    );
  };

  const openEmail = () => {
    Linking.openURL('mailto:support@ideohub.com').catch(err => 
      Alert.alert('Error', 'Could not open email client')
    );
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView 
        style={styles.scrollView}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Contact Us</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Have questions? We're here to help.
          </Text>
        </View>

        <View style={styles.contactInfoContainer}>
          <Pressable 
            style={[styles.contactCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
            onPress={openMaps}
          >
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
              <MapPin size={20} color={colors.orange} />
            </View>
            <View style={styles.contactTextContainer}>
              <Text style={[styles.contactLabel, { color: colors.textSecondary }]}>Visit Us</Text>
              <Text style={[styles.contactValue, { color: colors.textPrimary }]}>
                Computer Science Society, KNUST, Kumasi, Ghana
              </Text>
            </View>
            <ArrowUpRight size={18} color={colors.textSecondary} />
          </Pressable>

          <Pressable 
            style={[styles.contactCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
            onPress={openPhone}
          >
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
              <Phone size={20} color={colors.orange} />
            </View>
            <View style={styles.contactTextContainer}>
              <Text style={[styles.contactLabel, { color: colors.textSecondary }]}>Call Us</Text>
              <Text style={[styles.contactValue, { color: colors.textPrimary }]}>
                +(233)207220443
              </Text>
            </View>
            <ArrowUpRight size={18} color={colors.textSecondary} />
          </Pressable>

          <Pressable 
            style={[styles.contactCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
            onPress={openEmail}
          >
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
              <Mail size={20} color={colors.orange} />
            </View>
            <View style={styles.contactTextContainer}>
              <Text style={[styles.contactLabel, { color: colors.textSecondary }]}>Email Us</Text>
              <Text style={[styles.contactValue, { color: colors.textPrimary }]}>
                support@ideohub.com
              </Text>
            </View>
            <ArrowUpRight size={18} color={colors.textSecondary} />
          </Pressable>

          <View style={[styles.contactCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
              <Clock size={20} color={colors.orange} />
            </View>
            <View style={styles.contactTextContainer}>
              <Text style={[styles.contactLabel, { color: colors.textSecondary }]}>Working Hours</Text>
              <Text style={[styles.contactValue, { color: colors.textPrimary }]}>
                Monday - Friday: 9:00 AM - 6:00 PM
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.formContainer, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <Text style={[styles.formTitle, { color: colors.textPrimary }]}>Send us a message</Text>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Full Name</Text>
            <View style={[styles.inputContainer, { borderColor: colors.border }]}>
              <TextInput
                style={[styles.input, { color: colors.textPrimary }]}
                placeholder="John Doe"
                placeholderTextColor={colors.textSecondary}
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Email</Text>
            <View style={[styles.inputContainer, { borderColor: colors.border }]}>
              <Mail size={18} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.textPrimary }]}
                placeholder="your@email.com"
                placeholderTextColor={colors.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Subject</Text>
            <View style={[styles.inputContainer, { borderColor: colors.border }]}>
              <TextInput
                style={[styles.input, { color: colors.textPrimary }]}
                placeholder="How can we help?"
                placeholderTextColor={colors.textSecondary}
                value={subject}
                onChangeText={setSubject}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Message</Text>
            <View style={[styles.textareaContainer, { borderColor: colors.border }]}>
              <MessageSquare size={18} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.textarea, { color: colors.textPrimary }]}
                placeholder="Type your message here..."
                placeholderTextColor={colors.textSecondary}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={message}
                onChangeText={setMessage}
              />
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.submitButton,
              { 
                backgroundColor: colors.primary,
                opacity: pressed ? 0.9 : 1,
              },
              isSubmitting && styles.submitButtonDisabled
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Text style={styles.submitButtonText}>Sending...</Text>
            ) : (
              <>
                <Text style={styles.submitButtonText}>Send Message</Text>
                <Send size={18} color="white" style={styles.sendIcon} />
              </>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  contactInfoContainer: {
    padding: 16,
    paddingTop: 0,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactTextContainer: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 13,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 15,
    fontWeight: '500',
  },
  formContainer: {
    margin: 16,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    marginBottom: 32,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    paddingHorizontal: 8,
  },
  inputIcon: {
    marginRight: 8,
  },
  textareaContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    minHeight: 120,
  },
  textarea: {
    flex: 1,
    fontSize: 15,
    paddingHorizontal: 8,
    textAlignVertical: 'top',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  sendIcon: {
    marginLeft: 4,
  },
});
