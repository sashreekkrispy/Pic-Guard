import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert, Image } from 'react-native';
import * as Clipboard from 'expo-clipboard';

const DecryptionScreen = () => {
  const [hashInput, setHashInput] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [image, setImage] = useState(null);
  
  // Example stored values (to simulate retrieving the original image)
  const originalHash = 'your_stored_hash_here'; // Replace with the actual hash
  const originalImage = 'your_image_uri_here'; // Replace with the actual image URI

  const decryptImage = () => {
    // Check if input hash matches the original hash
    if (hashInput === originalHash && secretKey) {
      setImage(originalImage);
      Alert.alert('Success', 'Original image retrieved successfully!');
    } else {
      Alert.alert('Error', 'Invalid hash or secret key. Please try again.');
    }
  };

  const clearFields = () => {
    setHashInput('');
    setSecretKey('');
    setImage(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image Decryption</Text>
      
      <TextInput
        placeholder="Enter Encrypted Hash"
        value={hashInput}
        onChangeText={setHashInput}
        style={styles.input}
      />
      
      <TextInput
        placeholder="Enter Secret Key"
        secureTextEntry
        value={secretKey}
        onChangeText={setSecretKey}
        style={styles.input}
      />

      <Button title="Decrypt" onPress={decryptImage} />
      <Button title="Clear" onPress={clearFields} />

      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE5B4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0E0C0A',
  },
  input: {
    width: '100%',
    borderColor: '#0E0C0A',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default DecryptionScreen;
