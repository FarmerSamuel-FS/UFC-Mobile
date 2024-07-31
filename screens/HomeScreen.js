// HomeScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        // You can add more logic here to fetch user details if needed
        setUser(token); // Set user to token or actual user details if available
      }
    };

    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.title}>Welcome to UFC Fighters Management</Text>
          <Text style={styles.instruction}>
            (Click Fighters Dashboard below to continue)
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("FightersList")}
          >
            <Text style={styles.buttonText}>Fighters Dashboard</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.title}>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: "#1E88E5",
    fontWeight: "bold",
    textAlign: "center",
  },
  instruction: {
    fontSize: 14,
    marginBottom: 20,
    color: "#E0E0E0",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1E88E5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
