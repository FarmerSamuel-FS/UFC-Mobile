// SignupScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { signup } from "../AuthServices";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    try {
      await signup(email, password, firstName, lastName, age, country);
      navigation.navigate("Home"); // Navigate to your main application screen
    } catch (error) {
      setError(
        `Signup failed: ${error.response?.data?.message || "Please try again."}`,
      );
      console.error("Signup failed:", error.response?.data);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
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
      <TextInput
        placeholder="First Name"
        placeholderTextColor="#888"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        placeholderTextColor="#888"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        placeholder="Age"
        placeholderTextColor="#888"
        value={age}
        onChangeText={setAge}
        style={styles.input}
      />
      <TextInput
        placeholder="Country"
        placeholderTextColor="#888"
        value={country}
        onChangeText={setCountry}
        style={styles.input}
      />
      <Button title="Signup" onPress={handleSignup} color="#1E88E5" />
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
  error: {
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
});
