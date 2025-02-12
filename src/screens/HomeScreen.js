// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleScheet, StyleSheet } from 'react-native';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to My Personalized Fitness App</Text>
            {/* Future components and functionalities will be added here */}
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
    },
});

export default HomeScreen;