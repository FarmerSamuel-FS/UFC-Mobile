import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

export default function UpdateFighterScreen({ route, navigation }) {
  const { fighter } = route.params;
  const [name, setName] = useState(fighter.name);
  const [age, setAge] = useState(fighter.age.toString());
  const [wins, setWins] = useState(fighter.record.wins.toString());
  const [losses, setLosses] = useState(fighter.record.losses.toString());
  const [region, setRegion] = useState(fighter.region);
  const [league, setLeague] = useState(fighter.league);

  const updateFighter = () => {
    const updatedFighter = {
      name,
      age: parseInt(age) || 0,
      record: { wins: parseInt(wins) || 0, losses: parseInt(losses) || 0 },
      region,
      league,
    };
    console.log("Updating fighter with data:", updatedFighter);
    axios
      .patch(
        `https://ufc-api-demo-e18d3cbd0a55.herokuapp.com/api/v1/fighters/${fighter._id}`,
        updatedFighter,
      )
      .then((response) => {
        console.log("Fighter updated successfully:", response.data);
        navigation.navigate("FighterDetail", { fighter: response.data });
      })
      .catch((error) => {
        console.error("API request failed:", error);
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
      <Button title="Update Fighter" onPress={updateFighter} color="#1E88E5" />
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
