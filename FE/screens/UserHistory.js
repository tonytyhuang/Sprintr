import React from "react";
import { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Dimensions,
  ImageBackground,
} from "react-native";

export default function UserHistory({ navigation }) {
  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/progresschart.png")}
    ></ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
