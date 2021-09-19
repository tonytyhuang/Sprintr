import React from "react";
import { View, Text } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Dimensions,
  ImageBackground,
} from "react-native";

export default function UserHistory() {
  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/achievement.png")}
    ></ImageBackground>
  );
}
