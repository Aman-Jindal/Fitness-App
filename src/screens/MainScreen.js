// src/screens/MainScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../constants/theme';

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('WorkoutLog')}
      >
        <Text style={styles.buttonText}>Workout</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.medium,
  },
  button: {
    width: '80%',
    height: 100,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15, // Rounded corners
    marginVertical: theme.spacing.medium,
    // Optional shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    // Optional elevation for Android
    elevation: 5,
  },
  buttonText: {
    color: theme.colors.buttonSolidText,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default MainScreen;
