// src/screens/FeedbackScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import theme from '../constants/theme';

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState('');

  const submitFeedback = () => {
    if (feedback.trim() === '') {
      Alert.alert('Error', 'Please enter your feedback.');
    } else {
      Alert.alert('Thank You!', 'Your feedback has been submitted.');
      setFeedback('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Feedback</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your suggestions..."
        value={feedback}
        onChangeText={setFeedback}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.submitButton} onPress={submitFeedback}>
        <Text style={styles.submitButtonText}>Submit Feedback</Text>
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: theme.spacing.small,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  submitButton: {
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FeedbackScreen;
