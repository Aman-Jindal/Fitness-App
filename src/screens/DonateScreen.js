// src/screens/DonateScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import theme from '../constants/theme';

const DonateScreen = () => {
  const handleDonate = async () => {
    const url = 'https://www.yourdonationpage.com'; // Replace with your donation URL
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Unable to open donation link.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Support My App</Text>
      <Text style={styles.text}>Your support helps improve the app for everyone!</Text>
      <TouchableOpacity style={styles.donateButton} onPress={handleDonate}>
        <Text style={styles.donateButtonText}>Donate Now</Text>
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
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: theme.spacing.large,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: theme.spacing.large,
  },
  donateButton: {
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    marginTop: 10,
  },
  donateButtonText: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DonateScreen;
