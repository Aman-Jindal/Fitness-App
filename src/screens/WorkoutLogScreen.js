import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const WorkoutLogScreen = () => {
    const [workout, setWorkout] = useState('');
    const [workouts, setWorkouts] = useState([]);

    const addWorkout = () => {
        if (workout.trim() !== '') {
            setWorkouts([...workouts, { id: Date.now().toString(), name: workout }]);
            setWorkout('');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Workout Log</Text>
            <TextInput
                style={styles.input}
                placeholder='Enter workout type'
                value={workout}
                onChangeText={setWorkout}
            />
            <Button title="Add Workout" onPress={addWorkout} />
            <FlatList
                data={workouts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.name}</Text>
                    </View>
                )}
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
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 4,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
});

export default WorkoutLogScreen;