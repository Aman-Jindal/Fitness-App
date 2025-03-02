// src/screens/UserProfileScreen.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import theme from '../constants/theme';

const UserProfileScreen = () => {
  // Dummy flag simulating that the user is registered.
  const isRegistered = false; // In production, this comes from your auth state.

  // Example user data; replace with real data from your backend or state management.
  const [userData, setUserData] = useState({
    name: 'John Doe',
    age: '30',
    height: '180 cm',
    weight: '75 kg',
    fitnessGoals: 'Build muscle and increase endurance',
    bio: 'Passionate about fitness and a healthy lifestyle.',
    profileImage: 'https://via.placeholder.com/150',
  });

  // If user is not registered, display a prompt to register
  if (!isRegistered) {
    return (
      <View style={styles.unregisteredContainer}>
        <Text style={styles.unregisteredText}>
          Please register to view your profile.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: userData.profileImage }} style={styles.avatar} />
        <TouchableOpacity
          style={styles.changePhotoButton}
          onPress={() => Alert.alert('Coming Soon', 'Change photo functionality coming soon.')}
        >
          <Text style={styles.changePhotoButtonText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{userData.name}</Text>

        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{userData.age}</Text>

        <Text style={styles.label}>Height:</Text>
        <Text style={styles.value}>{userData.height}</Text>

        <Text style={styles.label}>Weight:</Text>
        <Text style={styles.value}>{userData.weight}</Text>

        <Text style={styles.label}>Fitness Goals:</Text>
        <Text style={styles.value}>{userData.fitnessGoals}</Text>

        <Text style={styles.label}>Bio:</Text>
        <Text style={styles.value}>{userData.bio}</Text>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => Alert.alert('Edit Profile', 'Edit functionality coming soon.')}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background,
    flexGrow: 1,
  },
  unregisteredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  unregisteredText: {
    fontSize: 18,
    color: theme.colors.text,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.large,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  changePhotoButton: {
    marginTop: theme.spacing.small,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
  changePhotoButtonText: {
    color: theme.colors.buttonSolidText,
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: theme.spacing.medium,
    borderRadius: 10,
    marginBottom: theme.spacing.large,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginTop: theme.spacing.small,
  },
  value: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: theme.spacing.small,
  },
  editButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: theme.colors.buttonSolidText,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserProfileScreen;
