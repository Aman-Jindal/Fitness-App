// src/screens/UserProfileScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Image, ScrollView, Alert } from 'react-native';

const UserProfileScreen = () => {
  // State variables for profile fields
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bio, setBio] = useState('');
  // Placeholder image URL for the profile photo
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');

  const updateProfile = () => {
    // For now, we simply show an alert. Later, you might persist data locally or to a backend.
    Alert.alert('Profile Updated', 'Your profile information has been saved.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>My Profile</Text>
      
      <View style={styles.avatarContainer}>
        <Image source={{ uri: profileImage }} style={styles.avatar} />
        <Button title="Change Photo" onPress={() => Alert.alert('Coming Soon', 'Change photo functionality will be implemented soon.')} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your weight"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Height (cm)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your height"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Tell us about yourself"
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={3}
        />

        <View style={styles.updateButton}>
          <Button title="Update Profile" onPress={updateProfile} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6200EE',
    textAlign: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  form: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    // Adding subtle shadow for an elevated look
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 5,
    borderRadius: 4,
  },
  multiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  updateButton: {
    marginTop: 20,
  },
});

export default UserProfileScreen;
