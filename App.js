import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import FightersListScreen from "./screens/FightersListScreen";
import AddFighterScreen from "./screens/AddFighterScreen";
import UpdateFighterScreen from "./screens/UpdateFighterScreen";
import FighterDetailScreen from "./screens/FighterDetailScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FightersList" component={FightersListScreen} />
        <Stack.Screen name="AddFighter" component={AddFighterScreen} />
        <Stack.Screen name="UpdateFighter" component={UpdateFighterScreen} />
        <Stack.Screen name="FighterDetail" component={FighterDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
