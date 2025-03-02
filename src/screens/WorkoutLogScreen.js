import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';

const WorkoutLogScreen = () => {
    const [workoutType, setWorkoutType] = useState('');
    const [duration, setDuration] = useState('');
    const [calories, setCalories] = useState('');
    const [workouts, setWorkouts] = useState([]);
    const [errors, setErrors] = useState({});

    // Form validation function
    const validateForm = () => {
        const newErrors = {};

        // Validate Workout Type (required)
        if (!workoutType.trim()) {
            newErrors.workoutType = 'Workout type is required.';
        }

        // Validate Duration (required, numeric, > 0)
        if (!duration.trim()) {
            newErrors.duration = 'Duration is required.';
        } else if (isNaN(duration) || Number(duration) <= 0) {
            newErrors.duration = 'Duration must be a positive number.';
        }

        // Validate Calories (optional, numeric, >= 0)
        if (calories.trim()) {
            if (isNaN(calories) || Number(calories) < 0) {
                newErrors.calories = 'Calories must be a non-negative number.';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    // Function to add a workout log entry
    const addWorkout = () => {
        if (validateForm()) {
            const newWorkout = {
                id: Date.now().toString(),
                workoutType,
                duration: Number(duration),
                calories: calories.trim() ? Number(calories) : null,
            };

            setWorkouts([...workouts, newWorkout]);
            // Clear form fields after successful submission
            setWorkoutType('');
            setDuration('');
            setCalories('');
            setErrors({});
        } else {
            // Optionally, show an alert if form validation fails
            Alert.alert('Invalid Input', 'Please check your input fields for errors.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Workout Log</Text>

            <TextInput
                style={[styles.input, errors.workoutType && styles.errorInput]}
                placeholder="Workout Type (e.g., Running, Push-ups)"
                value={workoutType}
                onChangeText={setWorkoutType}
            />
            {errors.workoutType && <Text style={styles.errorText}>{errors.workoutType}</Text>}

            <TextInput
                style={[styles.input, errors.duration && styles.errorInput]}
                placeholder="Duration (minutes)"
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric"
            />
            {errors.duration && <Text style={styles.errorText}>{errors.duration}</Text>}

            <TextInput
                style={[styles.input, errors.calories && styles.errorInput]}
                placeholder="Calories Burned (optional)"
                value={calories}
                onChangeText={setCalories}
                keyboardType="numeric"
            />
            {errors.calories && <Text style={styles.errorText}>{errors.calories}</Text>}

            <Button title="Add Workout" onPress={addWorkout} />

            <FlatList
                data={workouts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.itemText}>
                            {item.workoutType} - {item.duration} minutes
                            {item.calories !== null ? ` - ${item.calories} kcal` : ''}
                        </Text>
                    </View>
                )}
                style={{ marginTop: 20 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        fles: 1,
        padding: 20,
    },
    header: {
        fontsize: 24,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 5,
        borderRadius: 4,
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginBottom: 5,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemText: {
        fontSize: 16,
    },
});

export default WorkoutLogScreen;