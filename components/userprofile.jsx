import React, { useMemo, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { User, Plus, Check, X, Calendar, MapPin, Link } from 'lucide-react-native';
import { useUserStore } from '../store/userstore';
import COLORS from '../constants/colors';
import { useColorScheme } from 'react-native';

export default function UserProfile({ userId, boardId }) {
  const { user, getUserProfile, isFollowing, followUser, unfollowUser, getThemeColors } = useUserStore();
  const colorScheme = useColorScheme();
  const [showFullProfile, setShowFullProfile] = useState(false);
  
  // Memoize colors to prevent infinite re-renders
  const colors = useMemo(() => getThemeColors(colorScheme), [getThemeColors, colorScheme]);
  
  const profileUser = getUserProfile(userId);
  const isCurrentUser = userId === user?.id;
  const isFollowingUser = isFollowing(userId);

  const handleFollowToggle = () => {
    if (isFollowingUser) {
      unfollowUser(userId);
    } else {
      followUser(userId);
    }
  };

  const handleViewFullProfile = () => {
    setShowFullProfile(true);
  };

  if (!profileUser) {
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <>
      <View style={[styles.container, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.avatarContainer} onPress={handleViewFullProfile}>
            {profileUser.avatar ? (
              <Image source={{ uri: profileUser.avatar }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatarPlaceholder, { backgroundColor: colors.border }]}>
                <User size={24} color={colors.textSecondary} />
              </View>
            )}
          </TouchableOpacity>
          
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: colors.textPrimary }]}>
              {profileUser.name}
            </Text>
            <Text style={[styles.username, { color: colors.textSecondary }]}>
              {profileUser.username}
            </Text>
            {profileUser.bio && (
              <Text style={[styles.bio, { color: colors.textSecondary }]} numberOfLines={2}>
                {profileUser.bio}
              </Text>
            )}
            <TouchableOpacity onPress={handleViewFullProfile}>
              <Text style={[styles.viewProfileText, { color: COLORS.orange }]}>
                View full profile
              </Text>
            </TouchableOpacity>
          </View>
          
          {!isCurrentUser && (
            <TouchableOpacity
              style={[
                styles.followButton,
                {
                  backgroundColor: isFollowingUser ? colors.border : COLORS.orange,
                  borderColor: isFollowingUser ? colors.border : COLORS.orange,
                }
              ]}
              onPress={handleFollowToggle}
            >
              {isFollowingUser ? (
                <Check size={16} color={colors.textPrimary} />
              ) : (
                <Plus size={16} color="#FFFFFF" />
              )}
              <Text
                style={[
                  styles.followButtonText,
                  { color: isFollowingUser ? colors.textPrimary : '#FFFFFF' }
                ]}
              >
                {isFollowingUser ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        
        <View style={[styles.statsContainer, { borderTopColor: colors.border }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.textPrimary }]}>
              {profileUser.boards?.length || 0}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Boards
            </Text>
          </View>
          
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.textPrimary }]}>
              {profileUser.followers?.length || 0}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Followers
            </Text>
          </View>
          
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.textPrimary }]}>
              {profileUser.following?.length || 0}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Following
            </Text>
          </View>
        </View>
      </View>

      {/* Full Profile Modal */}
      <Modal
        visible={showFullProfile}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowFullProfile(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          {/* Header */}
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
              Profile
            </Text>
            <TouchableOpacity onPress={() => setShowFullProfile(false)} style={styles.closeButton}>
              <X size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Large Profile Picture */}
            <View style={styles.fullProfileImageContainer}>
              {profileUser.avatar ? (
                <Image source={{ uri: profileUser.avatar }} style={styles.fullProfileImage} />
              ) : (
                <View style={[styles.fullProfileImagePlaceholder, { backgroundColor: colors.cardBackground }]}>
                  <User size={48} color={colors.textSecondary} />
                </View>
              )}
            </View>

            {/* Profile Info */}
            <View style={styles.fullProfileInfo}>
              <Text style={[styles.fullProfileName, { color: colors.textPrimary }]}>
                {profileUser.name}
              </Text>
              <Text style={[styles.fullProfileUsername, { color: colors.textSecondary }]}>
                {profileUser.username}
              </Text>
              
              {profileUser.bio && (
                <View style={styles.bioSection}>
                  <Text style={[styles.bioTitle, { color: colors.textPrimary }]}>
                    About
                  </Text>
                  <Text style={[styles.fullBioText, { color: colors.textSecondary }]}>
                    {profileUser.bio}
                  </Text>
                </View>
              )}

              {/* Profile Details */}
              <View style={styles.profileDetails}>
                <View style={styles.detailItem}>
                  <Calendar size={16} color={colors.textSecondary} />
                  <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                    Joined {formatDate(profileUser.createdAt)}
                  </Text>
                </View>
                
                {profileUser.location && (
                  <View style={styles.detailItem}>
                    <MapPin size={16} color={colors.textSecondary} />
                    <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                      {profileUser.location}
                    </Text>
                  </View>
                )}
                
                {profileUser.website && (
                  <View style={styles.detailItem}>
                    <Link size={16} color={colors.textSecondary} />
                    <Text style={[styles.detailText, { color: COLORS.orange }]}>
                      {profileUser.website}
                    </Text>
                  </View>
                )}
              </View>

              {/* Follow Button in Modal */}
              {!isCurrentUser && (
                <TouchableOpacity
                  style={[
                    styles.modalFollowButton,
                    {
                      backgroundColor: isFollowingUser ? colors.border : COLORS.orange,
                      borderColor: isFollowingUser ? colors.border : COLORS.orange,
                    }
                  ]}
                  onPress={handleFollowToggle}
                >
                  {isFollowingUser ? (
                    <Check size={20} color={colors.textPrimary} />
                  ) : (
                    <Plus size={20} color="#FFFFFF" />
                  )}
                  <Text
                    style={[
                      styles.modalFollowButtonText,
                      { color: isFollowingUser ? colors.textPrimary : '#FFFFFF' }
                    ]}
                  >
                    {isFollowingUser ? 'Following' : 'Follow'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  username: {
    fontSize: 14,
    marginBottom: 4,
  },
  bio: {
    fontSize: 12,
    lineHeight: 16,
  },
  viewProfileText: {
    fontSize: 14,
    marginTop: 4,
  },
  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 4,
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    height: '60%',
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  fullProfileImageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  fullProfileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  fullProfileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullProfileInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  fullProfileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  fullProfileUsername: {
    fontSize: 18,
    marginBottom: 8,
  },
  bioSection: {
    marginBottom: 16,
  },
  bioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  fullBioText: {
    fontSize: 14,
    lineHeight: 20,
  },
  profileDetails: {
    width: '100%',
    marginBottom: 16,
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    marginTop: 4,
  },
  modalFollowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    gap: 8,
  },
  modalFollowButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 