import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";

export default function AddFighterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [wins, setWins] = useState("");
  const [losses, setLosses] = useState("");
  const [region, setRegion] = useState("");
  const [league, setLeague] = useState("");

  const addFighter = () => {
    if (!name || !age || !wins || !losses || !region || !league) {
      Alert.alert("All fields are required");
      return;
    }

    const newFighter = {
      name,
      age: parseInt(age),
      record: { wins: parseInt(wins), losses: parseInt(losses) },
      region,
      league,
    };
    console.log("Adding new fighter with data:", newFighter);

    axios
      .post(
        "https://ufc-api-demo-e18d3cbd0a55.herokuapp.com/api/v1/fighters",
        newFighter,
      )
      .then((response) => {
        console.log("Fighter added successfully:", response.data);
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.error("API request failed:", error);
        Alert.alert("Failed to add fighter");
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#E0E0E0"
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        keyboardType="numeric"
        onChangeText={(text) => setAge(text.replace(/[^0-9]/g, ""))}
        placeholderTextColor="#E0E0E0"
      />
      <TextInput
        style={styles.input}
        placeholder="Wins"
        value={wins}
        keyboardType="numeric"
        onChangeText={(text) => setWins(text.replace(/[^0-9]/g, ""))}
        placeholderTextColor="#E0E0E0"
      />
      <TextInput
        style={styles.input}
        placeholder="Losses"
        value={losses}
        keyboardType="numeric"
        onChangeText={(text) => setLosses(text.replace(/[^0-9]/g, ""))}
        placeholderTextColor="#E0E0E0"
      />
      <TextInput
        style={styles.input}
        placeholder="Region"
        value={region}
        onChangeText={setRegion}
        placeholderTextColor="#E0E0E0"
      />
      <TextInput
        style={styles.input}
        placeholder="League"
        value={league}
        onChangeText={setLeague}
        placeholderTextColor="#E0E0E0"
      />
      <Button title="Add Fighter" onPress={addFighter} color="#1E88E5" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: "#E0E0E0",
    borderColor: "#E0E0E0",
  },
});
