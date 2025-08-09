import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

interface ProfileOption {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

const UserProfilePage = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    location: 'New York, USA',
    joinDate: 'January 2023',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
  });

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Edit profile functionality');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('Logout') },
      ]
    );
  };

  const profileOptions: ProfileOption[] = [
    {
      id: '1',
      title: 'Orders',
      icon: 'bag-outline',
      onPress: () => Alert.alert('Orders', 'View orders'),
    },
    {
      id: '2',
      title: 'Favorites',
      icon: 'heart-outline',
      onPress: () => Alert.alert('Favorites', 'View favorites'),
    },
    {
      id: '3',
      title: 'Payment Methods',
      icon: 'card-outline',
      onPress: () => Alert.alert('Payment', 'Manage payment methods'),
    },
    {
      id: '4',
      title: 'Addresses',
      icon: 'location-outline',
      onPress: () => Alert.alert('Addresses', 'Manage addresses'),
    },
    {
      id: '5',
      title: 'Notifications',
      icon: 'notifications-outline',
      onPress: () => Alert.alert('Notifications', 'Notification settings'),
    },
    {
      id: '6',
      title: 'Privacy & Security',
      icon: 'shield-outline',
      onPress: () => Alert.alert('Privacy', 'Privacy settings'),
    },
    {
      id: '7',
      title: 'Help & Support',
      icon: 'help-circle-outline',
      onPress: () => Alert.alert('Help', 'Contact support'),
    },
    {
      id: '8',
      title: 'About',
      icon: 'information-circle-outline',
      onPress: () => Alert.alert('About', 'App version 1.0.0'),
    },
  ];

  const renderProfileOption = (option: ProfileOption) => (
    <TouchableOpacity
      key={option.id}
      style={styles.optionItem}
      onPress={option.onPress}
    >
      <View style={styles.optionLeft}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={option.icon} size={22} color="#666" />
        </View>
        <Text style={styles.optionTitle}>{option.title}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='auto' />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back-outline" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={handleEditProfile}>
            <Ionicons name="create-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
            <TouchableOpacity style={styles.editImageButton}>
              <Ionicons name="camera-outline" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        {/* User Details */}
        <View style={styles.detailsSection}>
          <View style={styles.detailItem}>
            <Ionicons name="call-outline" size={20} color="#666" />
            <Text style={styles.detailText}>{user.phone}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={20} color="#666" />
            <Text style={styles.detailText}>{user.location}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={20} color="#666" />
            <Text style={styles.detailText}>Member since {user.joinDate}</Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>

        {/* Profile Options */}
        <View style={styles.optionsSection}>
          {profileOptions.map(renderProfileOption)}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  profileSection: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 30,
    marginBottom: 15,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#007AFF',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  detailsSection: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 20,
    marginBottom: 15,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#f0f0f0',
  },
  optionsSection: {
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIconContainer: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  logoutText: {
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '600',
    marginLeft: 10,
  },
  bottomSpacing: {
    height: 30,
  },
});

export default UserProfilePage;
