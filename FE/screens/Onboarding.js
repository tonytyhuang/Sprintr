import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import Onboarding from "react-native-onboarding-swiper";

export const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      styles={styles.container}
      onDone={() => navigation.replace("Loading")}
      onSkip={() => navigation.replace("Loading")}
      pages={[
        {
          backgroundColor: "#257291",
          image: (
            <Image style={styles.image} source={require("../assets/man.png")} />
          ),
          title: "Race Your Friends",
          subtitle: "Virtually Compete to Win All the Glory",
        },
        {
          backgroundColor: "#257291",
          image: <Image source={require("../assets/achievement.png")} />,
          title: "Compete to Win",
          subtitle: "Challenge Each Other to Improve",
        },
        {
          backgroundColor: "#257291",
          image: <Image source={require("../assets/progress.png")} />,
          title: "Track Your Progress",
          subtitle: "Watch Your Fitness Journey Begin",
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
  image: {
    paddingTop: 200,
    marginTop: 0,
  },
});
