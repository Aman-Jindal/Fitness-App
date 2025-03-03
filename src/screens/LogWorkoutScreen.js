// src/screens/LogWorkoutScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Modal,
} from 'react-native';
import theme from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LogWorkoutScreen = ({ navigation }) => {
  // Timer state
  const [elapsedTime, setElapsedTime] = useState(0);

  // Exercises state: array of exercise objects { id, name, sets: [{id, reps, weight}] }
  const [exercises, setExercises] = useState([]);

  // Modal state for adding new exercise
  const [isAddExerciseModalVisible, setIsAddExerciseModalVisible] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState('');

  // Start timer on mount
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Helper to format time as mm:ss (now used as duration)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Function to add a new exercise (triggered by modal)
  const addExercise = () => {
    if (!newExerciseName.trim()) {
      Alert.alert('Error', 'Please enter an exercise name.');
      return;
    }
    const newExercise = {
      id: Date.now().toString(),
      name: newExerciseName.trim(),
      sets: [{ id: Date.now().toString(), reps: '', weight: '' }], // At least one set
    };
    setExercises([...exercises, newExercise]);
    setNewExerciseName('');
    setIsAddExerciseModalVisible(false);
  };

  // Remove an entire exercise
  const removeExercise = (exerciseId) => {
    Alert.alert(
      'Remove Exercise',
      'Are you sure you want to remove this exercise?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          onPress: () =>
            setExercises(exercises.filter((ex) => ex.id !== exerciseId)),
        },
      ]
    );
  };

  // Add a set to a specific exercise
  const addSetToExercise = (exerciseId) => {
    setExercises(
      exercises.map((ex) => {
        if (ex.id === exerciseId) {
          const newSet = { id: Date.now().toString(), reps: '', weight: '' };
          return { ...ex, sets: [...ex.sets, newSet] };
        }
        return ex;
      })
    );
  };

  // Remove a set from an exercise (if more than one exists)
  const removeSetFromExercise = (exerciseId, setId) => {
    setExercises(
      exercises.map((ex) => {
        if (ex.id === exerciseId) {
          if (ex.sets.length === 1) {
            Alert.alert('Error', 'At least one set is required.');
            return ex;
          }
          return { ...ex, sets: ex.sets.filter((s) => s.id !== setId) };
        }
        return ex;
      })
    );
  };

  // Update reps or weight for a set in a given exercise
  const updateSetField = (exerciseId, setId, field, value) => {
    setExercises(
      exercises.map((ex) => {
        if (ex.id === exerciseId) {
          return {
            ...ex,
            sets: ex.sets.map((s) =>
              s.id === setId ? { ...s, [field]: value } : s
            ),
          };
        }
        return ex;
      })
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header: Duration and Finish Button */}
      <View style={styles.headerRow}>
        <Text style={styles.timerText}>Duration: {formatTime(elapsedTime)}</Text>
        <TouchableOpacity
          style={styles.finishButton}
          onPress={() => {
            Alert.alert(
              'Workout Finished',
              `Total Duration: ${formatTime(elapsedTime)}`
            );
            navigation.navigate('Workout'); // Replace with desired navigation target
          }}
        >
          <Text style={styles.finishButtonText}>Finish</Text>
        </TouchableOpacity>
      </View>

      {/* Message when no exercises have been added */}
      {exercises.length === 0 ? (
        <View style={styles.emptyMessageContainer}>
          <Text style={styles.emptyMessageText}>
            Add an exercise to begin.
          </Text>
        </View>
      ) : null}

      {/* Display each exercise */}
      {exercises.map((exercise) => (
        <View key={exercise.id} style={styles.exerciseContainer}>
          <View style={styles.exerciseHeader}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <TouchableOpacity onPress={() => removeExercise(exercise.id)}>
              <Ionicons name="ellipsis-vertical" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
          {/* List sets for the exercise */}
          {exercise.sets.map((set, index) => (
            <View key={set.id} style={styles.setRow}>
              <Text style={styles.setLabel}>Set {index + 1}:</Text>
              {/* Weight comes before Reps */}
              <TextInput
                style={[styles.input, styles.setInput]}
                placeholder="Weight (kg)"
                keyboardType="numeric"
                value={set.weight}
                onChangeText={(value) =>
                  updateSetField(exercise.id, set.id, 'weight', value)
                }
              />
              <TextInput
                style={[styles.input, styles.setInput]}
                placeholder="Reps"
                keyboardType="numeric"
                value={set.reps}
                onChangeText={(value) =>
                  updateSetField(exercise.id, set.id, 'reps', value)
                }
              />
              <TouchableOpacity
                onPress={() => addSetToExercise(exercise.id)}
                style={styles.iconButton}
              >
                <Ionicons name="add-circle-outline" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => removeSetFromExercise(exercise.id, set.id)}
                style={styles.iconButton}
              >
                <Ionicons name="remove-circle-outline" size={24} color="#ff6961" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}

      {/* Action Buttons: Add Exercise above Discard */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={styles.addExerciseButton}
          onPress={() => setIsAddExerciseModalVisible(true)}
        >
          <Text style={styles.addExerciseButtonText}>Add Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.discardButton}
          onPress={() => {
            Alert.alert(
              'Discard Workout',
              'Are you sure you want to discard this workout?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Discard',
                  onPress: () => navigation.navigate('Workout'),
                },
              ]
            );
          }}
        >
          <Text style={styles.discardButtonText}>Discard Workout</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for adding an exercise name */}
      <Modal
        visible={isAddExerciseModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsAddExerciseModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Exercise</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Exercise Name"
              value={newExerciseName}
              onChangeText={setNewExerciseName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsAddExerciseModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={addExercise}>
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  emptyMessageContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.large,
  },
  emptyMessageText: {
    fontSize: 18,
    color: theme.colors.text,
  },
  exerciseContainer: {
    backgroundColor: '#fff',
    padding: theme.spacing.medium,
    borderRadius: 10,
    marginBottom: theme.spacing.medium,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.small,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 5,
    marginRight: theme.spacing.small,
    flex: 1,
  },
  setInput: {
    flex: 1,
  },
  iconButton: {
    marginHorizontal: 4,
  },
  actionButtonsContainer: {
    // Stack buttons vertically
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing.large,
  },
  addExerciseButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginBottom: theme.spacing.medium,
  },
  addExerciseButtonText: {
    color: theme.colors.buttonSolidText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  discardButton: {
    backgroundColor: '#ff6961',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  discardButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: theme.spacing.large,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: theme.spacing.medium,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: theme.spacing.medium,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: theme.colors.buttonSolidText,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LogWorkoutScreen;
