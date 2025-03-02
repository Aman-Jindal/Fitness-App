// src/navigation/AppNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen'
import WorkoutLogScreen from '../screens/WorkoutLogScreen';
import UserProfileScreen from '../screens/UserProfileScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Home'
                screenOptions={{
                    headerStyle: { backgroundColor: '#6200EE' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Fitness App' }} />
                <Stack.Screen name="WorkoutLog" component={WorkoutLogScreen} options={{ title: 'Workout Log' }} />
                <Stack.Screen name="Profile" component={UserProfileScreen} options={{ title: 'My Profile' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;