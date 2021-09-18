import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import Onboarding from "react-native-onboarding-swiper";

export const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      onDone={() => navigation.replace("Loading")}
      onSkip={() => navigation.replace("Loading")}
      pages={[
        {
          backgroundColor: "#a6e4d0",
          image: <Image source={require("../assets/run.png")} />,
          title: "Run with Friends",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: "#e9bcbe",
          image: <Image source={require("../assets/favicon.png")} />,
          title: "Race together",
          subtitle: "Done with React Native Onboarding Swiper",
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
