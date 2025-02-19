// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to My Personalized Fitness App</Text>
            <Button
                title="Go to Workout Log"
                onPress={() => navigation.navigate('WorkoutLog')}    
            />
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
});

export default HomeScreen;