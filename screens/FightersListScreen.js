import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

export default function FightersListScreen({ navigation }) {
  const [fighters, setFighters] = useState([]);

  const fetchFighters = useCallback(() => {
    axios
      .get("https://ufc-api-demo-e18d3cbd0a55.herokuapp.com/api/v1/fighters")
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setFighters(response.data);
        } else {
          console.error("Unexpected API response format:", response.data);
        }
      })
      .catch((error) => {
        console.error("API request failed:", error);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchFighters();
    }, [fetchFighters]),
  );

  return (
    <View style={styles.container}>
      <Button
        title="Add Fighter"
        onPress={() => navigation.navigate("AddFighter")}
        color="#1E88E5"
      />
      {fighters.length > 0 ? (
        <FlatList
          data={fighters}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("FighterDetail", { fighter: item })
              }
            >
              <View style={styles.fighterContainer}>
                <Text style={styles.fighterName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noFightersText}>No fighters available.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  fighterContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#1e1e1e",
    borderColor: "#1E88E5",
    borderWidth: 1,
    borderRadius: 5,
  },
  fighterName: {
    fontSize: 18,
    color: "#1E88E5",
  },
  noFightersText: {
    color: "#E0E0E0",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});
