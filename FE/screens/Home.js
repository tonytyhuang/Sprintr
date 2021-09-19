import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";

function HomePage({ navigation }) {
  const user = firebase.auth().currentUser;
  return (
    <View style={styles.background}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Hi Leon!</Text>
        <Text style={styles.subheader}>It's a great day for racing. 💪</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Lobby")}
          style={styles.homeBtn}
        >
          <Text style={styles.homeBtnText}>Go Racing 🏁</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Progress")}
          style={styles.homeBtn}
        >
          <Text style={styles.homeBtnText}>View Progress 📈</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => firebase.auth().signOut()}
          style={styles.homeBtn}
        >
          <Text style={styles.homeBtnText}>Logout 👋</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  header: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#ffffff",
    paddingVertical: 6,
  },
  subheader: {
    color: "#ffffff",
    fontSize: 14,
  },
  headerContainer: {
    paddingBottom: 20,
    paddingTop: 60,
    paddingHorizontal: 25,
    backgroundColor: "#257291",
  },
  homeBtn: {
    width: "100%",
    height: 100,
    backgroundColor: "#dde6ef",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#333333",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  homeBtnText: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default HomePage;
