// App.js
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./screens/HomeScreen";
import FightersListScreen from "./screens/FightersListScreen";
import AddFighterScreen from "./screens/AddFighterScreen";
import UpdateFighterScreen from "./screens/UpdateFighterScreen";
import FighterDetailScreen from "./screens/FighterDetailScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState("Login");

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        setInitialRoute("Home");
      } else {
        setInitialRoute("Login");
      }
    };

    checkToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FightersList" component={FightersListScreen} />
        <Stack.Screen name="AddFighter" component={AddFighterScreen} />
        <Stack.Screen name="UpdateFighter" component={UpdateFighterScreen} />
        <Stack.Screen name="FighterDetail" component={FighterDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
