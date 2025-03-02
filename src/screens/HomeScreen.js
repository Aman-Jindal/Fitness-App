// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Your Own Workouts</Text>
            <Button
                title="Go to Workout Log"
                onPress={() => navigation.navigate('WorkoutLog')}    
            />
            <View style={styles.separator} />
            <Button title="View Profile" onPress={() => navigation.navigate('Profile')} />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontsize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    separator: {
        height: 20,
    },
});

export default HomeScreen;