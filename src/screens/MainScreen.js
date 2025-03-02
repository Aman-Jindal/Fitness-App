// src/screens/MainScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Your Fitness Dashboard</Text>
      {/* Add buttons or icons to access the features, e.g., Workout Log, Profile */}
      <Button title="Go to Workout Log" onPress={() => navigation.navigate('WorkoutLog')} />
      <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} style={styles.buttonSpacing} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonSpacing: {
    marginTop: 10,
  },
});

export default MainScreen;
