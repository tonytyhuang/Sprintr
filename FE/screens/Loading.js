import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import firebase from "firebase";

export const LoadingScreen = ({ navigation }) => {
  const navigateLogin = () => navigation.replace("Login");
  const navigateHome = () => navigation.replace("Home");
  const checkLogIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigateHome();
      } else {
        navigateLogin();
      }
    });
  };

  useEffect(() => {
    checkLogIn();
  }, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#257291" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
