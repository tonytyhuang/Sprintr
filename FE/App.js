import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./screens/Home";
import LobbyPage from "./screens/Lobby";
import SignupPage from "./screens/Signup";
import LoginPage from "./screens/Login";
import GamePage from "./screens/Game";
import GameTestPage from './screens/GameTest';
import { OnboardingScreen } from "./screens/Onboarding";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sprintr" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Signup" component={SignupPage} />
        <Stack.Screen name="Lobby" component={LobbyPage} />
        <Stack.Screen name="Game" component={GameTestPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
