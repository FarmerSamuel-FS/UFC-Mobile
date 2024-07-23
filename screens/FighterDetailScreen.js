import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

export default function FighterDetailScreen({ route, navigation }) {
  const [fighter, setFighter] = useState(route.params.fighter);

  const fetchFighter = useCallback(() => {
    axios
      .get(
        `https://ufc-api-demo-e18d3cbd0a55.herokuapp.com/api/v1/fighters/${fighter._id}`,
      )
      .then((response) => {
        console.log("Fetched fighter data:", response.data);
        setFighter(response.data);
      })
      .catch((error) => {
        console.error("API request failed:", error);
      });
  }, [fighter._id]);

  useFocusEffect(
    useCallback(() => {
      fetchFighter();
    }, [fetchFighter]),
  );

  const deleteFighter = () => {
    axios
      .delete(
        `https://ufc-api-demo-e18d3cbd0a55.herokuapp.com/api/v1/fighters/${fighter._id}`,
      )
      .then((response) => {
        console.log("Fighter deleted successfully:", response.data);
        navigation.navigate("FightersList");
      })
      .catch((error) => {
        console.error("API request failed:", error);
      });
  };

  if (!fighter) {
    return <Text>Loading...</Text>;
  }

  console.log("Displaying fighter data:", fighter);
  const { wins, losses } = fighter.record || { wins: 0, losses: 0 };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name: {fighter.name}</Text>
      <Text style={styles.label}>Age: {fighter.age}</Text>
      <Text style={styles.label}>
        Record: Wins - {wins}, Losses - {losses}
      </Text>
      <Text style={styles.label}>Region: {fighter.region}</Text>
      <Text style={styles.label}>League: {fighter.league}</Text>
      <Button
        title="Edit Fighter"
        onPress={() => navigation.navigate("UpdateFighter", { fighter })}
        color="#1E88E5"
      />
      <Button title="Delete Fighter" onPress={deleteFighter} color="#1E88E5" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  label: {
    fontSize: 18,
    color: "#E0E0E0",
    marginBottom: 10,
  },
});
