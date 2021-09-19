import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { windowHeight, windowWidth } from "../utility/dimension";

const LoginButton = ({ buttonTitle, ...rest }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default LoginButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: "100%",
    height: windowHeight / 8,
    backgroundColor: "#257291",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
