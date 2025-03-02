// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainScreen from '../screens/MainScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import LogWorkoutScreen from '../screens/LogWorkoutScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import DonateScreen from '../screens/DonateScreen';
import theme from '../constants/theme';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="Main" component={MainScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Workout" component={WorkoutScreen} options={{ title: 'Workout' }} />
        <Stack.Screen name="LogWorkout" component={LogWorkoutScreen} options={{ title: 'Log Workout' }} />
        <Stack.Screen name="Profile" component={UserProfileScreen} options={{ title: 'My Profile' }} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ title: 'Feedback' }} />
        <Stack.Screen name="Donate" component={DonateScreen} options={{ title: 'Donate' }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
