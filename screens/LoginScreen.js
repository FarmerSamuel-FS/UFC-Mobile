// LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { login } from "../AuthServices";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigation.navigate("Home"); // Navigate to your main application screen
    } catch (error) {
      setError(
        `Login failed: ${error.response?.data?.message || "Please try again."}`,
      );
      console.error("Login failed:", error.response?.data);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to UFC Fighters Management</Text>
      <Text style={styles.description}>
        Manage and monitor UFC fighters with ease. Please log in to continue.
      </Text>
      <Text style={styles.instruction}>
        Enter your credentials below to access the Fighters Dashboard.
      </Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.signupButtonText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 24,
    color: "#1E88E5",
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#E0E0E0",
    marginBottom: 20,
    textAlign: "center",
  },
  instruction: {
    fontSize: 14,
    color: "#E0E0E0",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#1E88E5",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    color: "#fff", // Text color
  },
  button: {
    backgroundColor: "#1E88E5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupButton: {
    marginTop: 10,
    alignItems: "center",
  },
  signupButtonText: {
    color: "#1E88E5",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
});
