import React from "react";
import { View, Text } from "react-native";
import firebase from "firebase";

export default function LoadingScreen() {
  checkLogIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        () => navigation.replace("Home");
      } else {
        () => navigation.replace("Login");
      }
    });
  };
  return (
    <View>
      <Text></Text>
    </View>
  );
}
