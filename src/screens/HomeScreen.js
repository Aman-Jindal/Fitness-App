// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import theme from '../constants/theme';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with your logo
          style={styles.logo}
        />
        <Text style={styles.logoText}>My Fitness App</Text>
      </View>

      {/* Authentication Buttons */}
      <View style={styles.authContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Feedback & Donate Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.feedbackButton}
          onPress={() => navigation.navigate('Feedback')}
        >
          <Text style={styles.feedbackButtonText}>Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.donateButton}
          onPress={() => navigation.navigate('Donate')}
        >
          <Text style={styles.donateButtonText}>Donate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
    justifyContent: 'space-between',
  },
  logoContainer: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 40,
    alignItems: 'center',
    borderRadius: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 24,
    color: theme.colors.buttonSolidText,
    fontWeight: 'bold',
  },
  authContainer: {
    alignItems: 'center',
  },
  loginButton: {
    borderWidth: 1,
    borderColor: theme.colors.buttonOutline,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 10,
  },
  loginButtonText: {
    color: theme.colors.buttonOutline,
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: theme.colors.buttonSolid,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 10,
  },
  registerButtonText: {
    color: theme.colors.buttonSolidText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButton: {
    paddingVertical: 10,
  },
  skipButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.large,
  },
  feedbackButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 5,
  },
  feedbackButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
  },
  donateButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
  donateButtonText: {
    color: theme.colors.buttonSolidText,
    fontSize: 16,
  },
});

export default HomeScreen;
