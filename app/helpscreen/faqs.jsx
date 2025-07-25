import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useUserStore } from '../../store/userstore';
import { useColorScheme } from 'react-native';
import { ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react-native';

export default function FAQScreen() {
  const router = useRouter();
  const { theme } = useUserStore();
  const colorScheme = useColorScheme();
  const colors = useUserStore.getState().getThemeColors(colorScheme);
  
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqs = [
    {
      id: '1',
      question: 'How do I create an account?',
      answer: 'You can create an account by clicking on the "Sign Up" button on the login screen and following the registration process.'
    },
    {
      id: '2',
      question: 'How do I reset my password?',
      answer: 'On the login screen, click on "Forgot Password" and follow the instructions sent to your email.'
    },
    {
      id: '3',
      question: 'How do I update my profile information?',
      answer: 'Go to Settings > Edit Profile to update your personal information.'
    },
    {
      id: '4',
      question: 'How do I contact support?',
      answer: 'You can reach our support team through the Contact Us page or email us at support@ideohub.com.'
    },
    {
      id: '5',
      question: 'Is my data secure?',
      answer: 'Yes, we take your privacy and security seriously. Please review our Privacy Policy for more details.'
    }
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Frequently Asked Questions</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Find answers to common questions about using IdeoHub
          </Text>
        </View>

        <View style={styles.faqContainer}>
          {faqs.map((faq) => (
            <View 
              key={faq.id} 
              style={[styles.faqItem, { 
                backgroundColor: colors.cardBackground,
                borderColor: colors.border 
              }]}
            >
              <Pressable
                style={styles.faqHeader}
                onPress={() => toggleItem(faq.id)}
              >
                <Text style={[styles.question, { color: colors.textPrimary }]}>
                  {faq.question}
                </Text>
                {expandedItems[faq.id] ? (
                  <ChevronUp size={20} color={colors.textSecondary} />
                ) : (
                  <ChevronDown size={20} color={colors.textSecondary} />
                )}
              </Pressable>
              
              {expandedItems[faq.id] && (
                <View style={styles.answerContainer}>
                  <Text style={[styles.answer, { color: colors.textSecondary }]}>
                    {faq.answer}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={[styles.helpSection, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <Text style={[styles.helpTitle, { color: colors.textPrimary }]}>Still need help?</Text>
          <Text style={[styles.helpText, { color: colors.textSecondary }]}>
            Can't find what you're looking for? Our support team is here to help.
          </Text>
          <Pressable 
            style={[styles.helpButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/helpscreen/contact')}
          >
            <Text style={[styles.helpButtonText, { color: colors.textPrimary }]}>Contact Support</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
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
  faqContainer: {
    marginBottom: 24,
  },
  faqItem: {
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  question: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    marginRight: 12,
  },
  answerContainer: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  answer: {
    fontSize: 15,
    lineHeight: 22,
  },
  helpSection: {
    borderRadius: 12,
    padding: 40,
    marginBottom: 24,
    borderWidth: 1,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 15,
    marginBottom: 16,
    lineHeight: 22,
  },
  helpButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  helpButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
