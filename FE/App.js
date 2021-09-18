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
import { OnboardingScreen } from "./screens/Onboarding";
import { SocketContext, SocketProvider } from "./SocketContext";
import firebase from "firebase";
import { firebaseConfig } from "./config";
const Stack = createNativeStackNavigator();

<<<<<<< HEAD
export default function App() {
  // const socket = useContext(SocketContext);
  firebase.initializeApp(firebaseConfig);
  useEffect(() => {
    // socket.onopen = () => {
    //   console.log("connected");
    // }
  }, []);

=======
export default function App() {  
>>>>>>> c6bb44c942d3a8820b82e49facb28a89e53a9a31
  return (
    <SocketProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Sprintr" component={OnboardingScreen} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Signup" component={SignupPage} />
          <Stack.Screen name="Lobby" component={LobbyPage} />
          <Stack.Screen name="Game" component={GameTestPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SocketProvider>
  );
}
