import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import SocketLink from "SocketLink";
import HomePage from './screens/Home'
import LobbyPage from './screens/Lobby';
import SignupPage from './screens/Signup';
import LoginPage from './screens/Login';
import GamePage from './screens/Game';

const Stack = createNativeStackNavigator();
const client = new W3CWebSocket(SocketLink);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Signup" component={SignupPage} />
        <Stack.Screen name="Lobby" component={LobbyPage} />
        <Stack.Screen name="Game" component={GamePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

