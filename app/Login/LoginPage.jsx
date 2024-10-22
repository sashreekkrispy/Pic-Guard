import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from '@firebase/auth';
import { useRouter } from 'expo-router';  // Import router for navigation

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBp6C2_Q_Nu6SoyVZPdhT72n4VvxD_orr8",
  authDomain: "pic-guard-cf82a.firebaseapp.com",
  projectId: "pic-guard-cf82a",
  storageBucket: "pic-guard-cf82a.appspot.com",
  messagingSenderId: "850325606705",
  appId: "1:850325606705:web:7e358444874d724a112010"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);  // Toggle between SignIn and SignUp
  const [errorMessage, setErrorMessage] = useState('');  // State for error messages

  const auth = getAuth(app);
  const router = useRouter();  // Use router for navigation

  useEffect(() => {
    // Redirect to home if user is authenticated
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/(tabs)/home');  // Redirect to home screen
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    try {
      if (isLogin) {
        // Sign in with existing credentials
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Create a new account
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      // Display an error message if authentication fails
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.authContainer}>
        <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />

        {/* Display error message if authentication fails */}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <View style={styles.buttonContainer}>
          <Button
            title={isLogin ? 'Sign In' : 'Sign Up'}
            onPress={handleAuthentication}
            color="#3498db"
          />
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
});
