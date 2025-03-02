// src/screens/LogWorkoutScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';
import theme from '../constants/theme';

const LogWorkoutScreen = ({ navigation }) => {
  // Timer state
  const [elapsedTime, setElapsedTime] = useState(0);

  // States for current exercise
  const [currentExerciseName, setCurrentExerciseName] = useState('');
  const [currentSets, setCurrentSets] = useState([]);

  // List of completed exercises
  const [completedExercises, setCompletedExercises] = useState([]);

  // Start workout timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Helper to format elapsed time (mm:ss)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Add a new set for the current exercise
  const addSet = () => {
    setCurrentSets([...currentSets, { id: Date.now().toString(), reps: '', weight: '' }]);
  };

  // Update a specific set field
  const updateSetField = (id, field, value) => {
    setCurrentSets(
      currentSets.map(set => set.id === id ? { ...set, [field]: value } : set)
    );
  };

  // When an exercise is complete, add it to the completed exercises list
  const completeCurrentExercise = () => {
    if (!currentExerciseName.trim()) {
      Alert.alert('Error', 'Please enter an exercise name.');
      return;
    }
    if (currentSets.length === 0) {
      Alert.alert('Error', 'Please add at least one set for the exercise.');
      return;
    }
    const newExercise = {
      id: Date.now().toString(),
      name: currentExerciseName,
      sets: currentSets,
    };
    setCompletedExercises([...completedExercises, newExercise]);
    // Clear the current exercise inputs for a new entry
    setCurrentExerciseName('');
    setCurrentSets([]);
  };

  // Finish workout: Show summary and navigate back (or save data)
  const finishWorkout = () => {
    Alert.alert(
      'Workout Complete',
      `Total Workout Time: ${formatTime(elapsedTime)}\nExercises Completed: ${completedExercises.length}`
    );
    navigation.navigate('Workout'); // Replace with desired navigation target
  };

  // Discard workout: Confirm and navigate back
  const discardWorkout = () => {
    Alert.alert(
      'Discard Workout',
      'Are you sure you want to discard this workout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Discard', onPress: () => navigation.navigate('Workout') },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header: Timer and Finish Button */}
      <View style={styles.headerRow}>
        <Text style={styles.timerText}>Duration: {formatTime(elapsedTime)}</Text>
        <TouchableOpacity style={styles.finishButton} onPress={finishWorkout}>
          <Text style={styles.finishButtonText}>Finish</Text>
        </TouchableOpacity>
      </View>

      {/* Current Exercise Entry */}
      <View style={styles.currentExerciseSection}>
        <Text style={styles.sectionTitle}>Current Exercise</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Exercise Name"
          value={currentExerciseName}
          onChangeText={setCurrentExerciseName}
        />

        {currentSets.map((set, index) => (
          <View key={set.id} style={styles.setRow}>
            <Text style={styles.setLabel}>Set {index + 1}:</Text>
            <TextInput
              style={[styles.input, styles.setInput]}
              placeholder="Weight (kg)"
              keyboardType="numeric"
              value={set.weight}
              onChangeText={(value) => updateSetField(set.id, 'weight', value)}
            />
            <TextInput
              style={[styles.input, styles.setInput]}
              placeholder="Reps"
              keyboardType="numeric"
              value={set.reps}
              onChangeText={(value) => updateSetField(set.id, 'reps', value)}
            />
          </View>
        ))}
        <TouchableOpacity style={styles.addSetButton} onPress={addSet}>
          <Text style={styles.addSetButtonText}>Add Set</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.completeExerciseButton} onPress={completeCurrentExercise}>
          <Text style={styles.completeExerciseButtonText}>Complete Exercise</Text>
        </TouchableOpacity>
      </View>

      {/* List of Completed Exercises */}
      <View style={styles.completedExercisesSection}>
        <Text style={styles.sectionTitle}>Completed Exercises</Text>
        {completedExercises.length === 0 ? (
          <Text style={styles.noExerciseText}>No exercises logged yet.</Text>
        ) : (
          completedExercises.map((exercise) => (
            <View key={exercise.id} style={styles.exerciseItem}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              {exercise.sets.map((set, index) => (
                <View key={set.id} style={styles.completedSetRow}>
                  <Text style={styles.completedSetText}>
                    Set {index + 1}: {set.reps} reps, {set.weight} kg
                  </Text>
                </View>
              ))}
            </View>
          ))
        )}
      </View>

      {/* Discard Workout Button */}
      <TouchableOpacity style={styles.discardButton} onPress={discardWorkout}>
        <Text style={styles.discardButtonText}>Discard Workout</Text>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.large,
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  finishButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  finishButtonText: {
    color: theme.colors.buttonSolidText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  currentExerciseSection: {
    backgroundColor: '#fff',
    padding: theme.spacing.medium,
    borderRadius: 10,
    marginBottom: theme.spacing.large,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.medium,
    textAlign: 'center',
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: theme.spacing.small,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: theme.spacing.small,
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.small,
  },
  setLabel: {
    fontSize: 16,
    width: 60,
    color: theme.colors.text,
  },
  setInput: {
    flex: 1,
    marginHorizontal: theme.spacing.small,
  },
  addSetButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: theme.spacing.medium,
  },
  addSetButtonText: {
    color: theme.colors.buttonSolidText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  completeExerciseButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  completeExerciseButtonText: {
    color: theme.colors.buttonSolidText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  completedExercisesSection: {
    marginBottom: theme.spacing.large,
  },
  noExerciseText: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
  },
  exerciseItem: {
    backgroundColor: '#fff',
    padding: theme.spacing.medium,
    borderRadius: 10,
    marginBottom: theme.spacing.medium,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.small,
  },
  completedSetRow: {
    marginBottom: theme.spacing.small,
  },
  completedSetText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  discardButton: {
    backgroundColor: '#ff6961',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  discardButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LogWorkoutScreen;
