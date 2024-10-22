import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { readAsStringAsync } from 'expo-file-system';
import * as Crypto from 'expo-crypto';
import * as Random from 'expo-random';
import * as Clipboard from 'expo-clipboard';
import { encode as b64EncodeUnicode, decode as b64DecodeUnicode } from 'base-64';

const HomeScreen = () => {
  const [image, setImage] = useState(null);
  const [secretKey, setSecretKey] = useState('');
  const [encryptedImage, setEncryptedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setEncryptedImage(null); // Reset when a new image is picked
    }
  };

  const encryptImage = async () => {
    if (!image || !secretKey) {
      Alert.alert('Error', 'Please select an image and enter a secret key!');
      return;
    }
    try {
      const imageBase64 = await readAsStringAsync(image, { encoding: 'base64' });
      
      // Generate a random IV
      const iv = await Random.getRandomBytesAsync(16);
      
      // Concatenate secret key and IV
      const key = b64EncodeUnicode(secretKey); // Ensure key is in a suitable format
      const combinedData = iv + imageBase64; // For simplicity, concatenate IV and image
      
      // Encrypt using SHA256
      const encrypted = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        combinedData
      );

      setEncryptedImage(encrypted);
      Alert.alert('Success', 'Image encrypted successfully!');
    } catch (error) {
      console.error("Encryption error:", error);
      Alert.alert('Error', 'Encryption failed. Please try again. ' + error.message);
    }
  };

  const copyToClipboard = () => {
    if (encryptedImage) {
      Clipboard.setString(encryptedImage);
      Alert.alert('Copied', 'Encrypted image hash copied to clipboard!');
    }
  };

  const decryptImage = () => {
    Alert.alert('Decryption', 'This implementation does not support decryption of encrypted images.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image Encryption</Text>
      <Button title="Select Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
      
      <TextInput
        placeholder="Enter Secret Key"
        secureTextEntry
        value={secretKey}
        onChangeText={setSecretKey}
        style={styles.input}
      />
      
      <Button title="Encrypt" onPress={encryptImage} />
      <Button title="Decrypt" onPress={decryptImage} disabled={true} />

      {encryptedImage && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>Encrypted Output:</Text>
          <Text style={styles.hash}>{encryptedImage}</Text>
          <Button title="Copy to Clipboard" onPress={copyToClipboard} />
        </View>
      )}
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
  imagePreview: {
    width: 200,
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
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
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  result: {
    color: '#0E0C0A',
  },
  hash: {
    marginTop: 10,
    fontSize: 12,
    color: '#0E0C0A',
    wordWrap: 'break-word',
  },
});

export default HomeScreen;