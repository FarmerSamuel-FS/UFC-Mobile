// authService.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiBaseUrl = "https://ufc-api-demo-e18d3cbd0a55.herokuapp.com/api/v1"; // Base URL with /api/v1

// Function to handle user signup
export const signup = async (
  email,
  password,
  firstName,
  lastName,
  age,
  country,
) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/auth/signup`, {
      email,
      password,
      firstName,
      lastName,
      age,
      country,
    });
    const token = response.data.token; // Assuming the token is in response.data.token
    await AsyncStorage.setItem("authToken", token);
    return token;
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
};

// Function to handle user login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/auth/signin`, {
      email,
      password,
    });
    const token = response.data.token; // Assuming the token is in response.data.token
    await AsyncStorage.setItem("authToken", token);
    return token;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

// Function to get token from AsyncStorage
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    return token;
  } catch (error) {
    console.error("Failed to get token:", error);
    throw error;
  }
};
