// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import theme from '../constants/theme';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Dummy authentication: in a real app, integrate with your backend or Firebase.
        if (email.trim() === '' || password.trim() === '') {
            Alert.alert('Error', 'Please fill in both fields.');
        } else {
            Alert.alert('Success', 'Loggen in successfully.');
            // For example, navigate to the Profile screen after login:
            navigation.navigate('Profile');
        }
    };

    return (
        <View style={styles.container}>
          <Text style={styles.header}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing.medium,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.primary,
      textAlign: 'center',
      marginBottom: theme.spacing.large,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 12,
      marginBottom: theme.spacing.small,
      borderRadius: 5,
      backgroundColor: '#fff',
    },
    loginButton: {
      padding: 15,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      alignItems: 'center',
      marginTop: 10,
    },
    loginButtonText: {
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
  });

  export default LoginScreen;