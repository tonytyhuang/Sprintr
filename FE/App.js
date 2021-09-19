import { StatusBar } from "expo-status-bar";
import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./screens/Home";
import LobbyPage from "./screens/Lobby";
import SignupPage from "./screens/Signup";
import LoginPage from "./screens/Login";
import GamePage from "./screens/Game";
import GameTestPage from "./screens/GameTest";
import PreRacePage from "./screens/PreRace";
import { OnboardingScreen } from "./screens/Onboarding";
import { SocketContext, SocketProvider } from "./SocketContext";
import firebase from "firebase";
import { firebaseConfig } from "./config";
import { LoadingScreen } from "./screens/Loading";
const Stack = createNativeStackNavigator();

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
  return (
    <SocketProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Sprintr"
            component={OnboardingScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Loading"
            component={LoadingScreen}
          />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginPage}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Signup"
            component={SignupPage}
          />
          <Stack.Screen name="Lobby" component={LobbyPage} />
          <Stack.Screen
            name="PreRace"
            component={PreRacePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Game" component={GameTestPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SocketProvider>
  );
}
