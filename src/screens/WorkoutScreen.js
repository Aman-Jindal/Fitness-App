// src/screens/WorkoutLogScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import theme from '../constants/theme';

const WorkoutScreen = ({ navigation }) => {
  // This flag should eventually come from your authentication state
  const isRegistered = false; // Change to true for a registered user

  // Dummy data for routines (for registered users)
  const [routines, setRoutines] = useState([
    { id: '1', name: 'Full Body Blast' },
    { id: '2', name: 'Strength Training' },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quick Start</Text>
      
      {/* Quick Start Section */}
      <TouchableOpacity 
        style={styles.quickStartButton} 
        onPress={() => navigation.navigate('LogWorkout')}
      >
        <Text style={styles.quickStartButtonText}>Start Your Workout</Text>
      </TouchableOpacity>

      {/* Routines Section */}
      <Text style={styles.header}>Routines</Text>
      
      {isRegistered ? (
        <>
          {routines.length > 0 ? (
            <FlatList
              data={routines}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.routineItem} 
                  onPress={() => navigation.navigate('RoutineDetail', { routine: item })}
                >
                  <Text style={styles.routineItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text style={styles.noRoutineText}>No routines available.</Text>
          )}
          <TouchableOpacity 
            style={styles.createRoutineButton} 
            onPress={() => navigation.navigate('CreateRoutine')}
          >
            <Text style={styles.createRoutineButtonText}>Create New Routine</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.registerPrompt}>
          Register to create and manage your workout routines.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.medium,
    textAlign: 'left',
  },
  quickStartButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: theme.spacing.large,
    alignItems: 'center',
  },
  quickStartButtonText: {
    color: theme.colors.buttonSolidText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 22,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.medium,
  },
  routineItem: {
    backgroundColor: '#fff',
    padding: theme.spacing.medium,
    borderRadius: 10,
    marginBottom: theme.spacing.small,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  routineItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  noRoutineText: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.medium,
  },
  createRoutineButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: theme.spacing.large,
  },
  createRoutineButtonText: {
    color: theme.colors.buttonSolidText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerPrompt: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: theme.spacing.medium,
    color: theme.colors.text,
  },
});

export default WorkoutScreen;
