import React, { useState, useContext } from 'react';
import { View, Image, StyleSheet, Text, KeyboardAvoidingView, Platform, TextInput, Pressable, Button } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

const Onboarding = () => {
  const { onboard } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const validateName = (name) => {
    return /^[a-zA-Z]+$/.test(name);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleOnboard = async () => {
    if (validateName(firstName) && validateName(lastName) && validateEmail(email)) {
      onboard({ firstName, lastName, email });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Image
        style={styles.logo}
        source={require('../img/littleLemonLogo.png.jpg')}
      />
      <Text style={styles.title}>Welcome to Flaka Cloud</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Pressable
        style={styles.button}
        onPress={handleOnboard}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    marginVertical: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#E4E4E4',
    borderRadius: 8,
  },
  button: {
    width: '100%',
    padding: 12,
    backgroundColor: '#0B9A6A',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Onboarding;
