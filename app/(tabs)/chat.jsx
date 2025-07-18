import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import COLORS from "../../constants/colors";
import { Brain } from "lucide-react-native";
import { useUserStore } from "../../store/userstore";
import { useColorScheme } from "react-native";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [haveChat, setHaveChat] = useState(false);
  const flatListRef = useRef(null);
  
  const { getThemeColors } = useUserStore();
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);

  // Simulate loading messages from an API
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        {
          id: "1",
          text: "Hey there! How are you doing?",
          sender: "other",
          time: "12:30 PM",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
          id: "2",
          text: "I'm good, thanks! How about you?",
          sender: "me",
          time: "12:32 PM",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
          id: "3",
          text: "Doing well! Just working on some React Native projects.",
          sender: "other",
          time: "12:33 PM",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        },
      ]);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    if (inputText.trim() === "") return;

    setIsSending(true);

    // Simulate network delay
    setTimeout(() => {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText,
        sender: "me",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      };

      setMessages((prev) => [...prev, newMessage]);
      setInputText("");
      setIsSending(false);

      // Scroll to bottom after sending
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 500);
  };

  const renderMessage = ({ item }) => {
    const isMe = item.sender === "me";

    return (
      <View
        style={[
          styles.messageContainer,
          isMe ? styles.myMessageContainer : styles.otherMessageContainer,
        ]}
      >
        {!isMe && <Brain style={[styles.headerAvatar, { color: colors.textPrimary }]} />}
        <View
          style={[
            styles.messageBubble,
            isMe ? styles.myMessageBubble : [styles.otherMessageBubble, { backgroundColor: colors.cardBackground }],
          ]}
        >
          {!isMe && <Text style={[styles.senderName, { color: colors.textPrimary }]}>AI</Text>}
          <Text style={isMe ? styles.myMessageText : [styles.otherMessageText, { color: colors.textPrimary }]}>
            {item.text}
          </Text>
          <Text
            style={[
              styles.timeText,
              isMe ? styles.myTimeText : [styles.otherTimeText, { color: colors.textSecondary }],
            ]}
          >
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.cardBackground, borderBottomColor: colors.border }]}>
        <Brain style={[styles.headerAvatar, { color: colors.textPrimary }]} />
        <Text style={[styles.headerName, { color: colors.textPrimary }]}>AI Chat</Text>
        <View style={styles.headerStatus}>
          <View style={styles.statusIndicator} />
          <Text style={[styles.statusText, { color: colors.textSecondary }]}>Online</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={90}
      >
        {isLoading ? (
          <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
            <ActivityIndicator size="large" color={COLORS.orange} />
            <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Loading messages...</Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesList}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            onLayout={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
          />
        )}
      </KeyboardAvoidingView>
      <View style={[styles.inputContainer, { backgroundColor: colors.cardBackground, borderTopColor: colors.border }]}>
        <TextInput
          style={[styles.textInput, { backgroundColor: colors.background, color: colors.textPrimary }]}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor={colors.textSecondary}
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
          disabled={isSending}
        >
          {isSending ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.sendButtonText}>Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  headerStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CAF50",
    marginRight: 5,
  },
  statusText: {
    fontSize: 12,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesList: {
    padding: 15,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "flex-end",
  },
  myMessageContainer: {
    justifyContent: "flex-end",
  },
  otherMessageContainer: {
    justifyContent: "flex-start",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: "70%",
    padding: 12,
    borderRadius: 16,
  },
  myMessageBubble: {
    backgroundColor: COLORS.orange,
    borderBottomRightRadius: 2,
  },
  otherMessageBubble: {
    borderBottomLeftRadius: 2,
  },
  myMessageText: {
    color: "white",
    fontSize: 16,
  },
  otherMessageText: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 11,
    marginTop: 5,
  },
  myTimeText: {
    color: "#ffffffaa",
    textAlign: "right",
  },
  otherTimeText: {
    textAlign: "left",
  },
  senderName: {
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 2,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: COLORS.orange,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ChatScreen;
