import React, { useState } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  Switch, 
  ScrollView 
} from 'react-native';
import { X, Bell } from 'lucide-react-native';
import { useUserStore } from '../store/userstore';
import COLORS from '../constants/colors';
import { useColorScheme } from 'react-native';

export default function NotificationsModal({ visible, onClose }) {
  const [pushNotifications, setPushNotifications] = useState(false);
  const [boardsNotifications, setBoardsNotifications] = useState(false);
  const [commentsNotifications, setCommentsNotifications] = useState(false);
  const [reactionsNotifications, setReactionsNotifications] = useState(false);
  const [mentionsNotifications, setMentionsNotifications] = useState(false);
  
  const { getThemeColors } = useUserStore();
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);

  const handlePushNotificationsToggle = (value) => {
    setPushNotifications(value);
    if (!value) {
      // If push notifications are disabled, disable all other notifications
      setBoardsNotifications(false);
      setCommentsNotifications(false);
      setReactionsNotifications(false);
      setMentionsNotifications(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
            Notification Settings
          </Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <X size={24} color={colors.textPrimary} />
          </Pressable>
        </View>

        <ScrollView style={styles.content}>
          

          {/* Push Notifications Toggle */}
          <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
            <View style={styles.settingContent}>
              <View style={styles.settingIconContainer}>
                <Bell size={20} color={colors.textPrimary} />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>
                  Allow Push Notifications
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Enable to receive notifications on your device
                </Text>
              </View>
            </View>
            <Switch
              value={pushNotifications}
              onValueChange={handlePushNotificationsToggle}
              trackColor={{ false: colors.border, true: COLORS.orange }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Boards Notifications */}
          <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
            <View style={styles.settingContent}>
              <View style={styles.settingIconContainer}>
                <Bell size={20} color={pushNotifications ? colors.textPrimary : colors.textSecondary} />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={[
                  styles.settingLabel, 
                  { color: pushNotifications ? colors.textPrimary : colors.textSecondary }
                ]}>
                  Boards
                </Text>
                <Text style={[
                  styles.settingDescription, 
                  { color: pushNotifications ? colors.textSecondary : colors.textSecondary }
                ]}>
                  Notifications about board updates and invites
                </Text>
              </View>
            </View>
            <Switch
              value={boardsNotifications}
              onValueChange={setBoardsNotifications}
              trackColor={{ false: colors.border, true: COLORS.orange }}
              thumbColor="#FFFFFF"
              disabled={!pushNotifications}
            />
          </View>

          {/* Comments Notifications */}
          <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
            <View style={styles.settingContent}>
              <View style={styles.settingIconContainer}>
                <Bell size={20} color={pushNotifications ? colors.textPrimary : colors.textSecondary} />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={[
                  styles.settingLabel, 
                  { color: pushNotifications ? colors.textPrimary : colors.textSecondary }
                ]}>
                  Comments
                </Text>
                <Text style={[
                  styles.settingDescription, 
                  { color: pushNotifications ? colors.textSecondary : colors.textSecondary }
                ]}>
                  Notifications when someone comments on your posts
                </Text>
              </View>
            </View>
            <Switch
              value={commentsNotifications}
              onValueChange={setCommentsNotifications}
              trackColor={{ false: colors.border, true: COLORS.orange }}
              thumbColor="#FFFFFF"
              disabled={!pushNotifications}
            />
          </View>

          {/* Reactions Notifications */}
          <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
            <View style={styles.settingContent}>
              <View style={styles.settingIconContainer}>
                <Bell size={20} color={pushNotifications ? colors.textPrimary : colors.textSecondary} />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={[
                  styles.settingLabel, 
                  { color: pushNotifications ? colors.textPrimary : colors.textSecondary }
                ]}>
                  Reactions
                </Text>
                <Text style={[
                  styles.settingDescription, 
                  { color: pushNotifications ? colors.textSecondary : colors.textSecondary }
                ]}>
                  Notifications when someone reacts to your posts
                </Text>
              </View>
            </View>
            <Switch
              value={reactionsNotifications}
              onValueChange={setReactionsNotifications}
              trackColor={{ false: colors.border, true: COLORS.orange }}
              thumbColor="#FFFFFF"
              disabled={!pushNotifications}
            />
          </View>

          {/* Mentions Notifications */}
          <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
            <View style={styles.settingContent}>
              <View style={styles.settingIconContainer}>
                <Bell size={20} color={pushNotifications ? colors.textPrimary : colors.textSecondary} />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={[
                  styles.settingLabel, 
                  { color: pushNotifications ? colors.textPrimary : colors.textSecondary }
                ]}>
                  Mentions
                </Text>
                <Text style={[
                  styles.settingDescription, 
                  { color: pushNotifications ? colors.textSecondary : colors.textSecondary }
                ]}>
                  Notifications when someone mentions you
                </Text>
              </View>
            </View>
            <Switch
              value={mentionsNotifications}
              onValueChange={setMentionsNotifications}
              trackColor={{ false: colors.border, true: COLORS.orange }}
              thumbColor="#FFFFFF"
              disabled={!pushNotifications}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 24,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  settingTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
  },
}); 