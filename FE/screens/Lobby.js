import { StatusBar } from "expo-status-bar";
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
import { client } from "websocket";
import { SocketContext } from "../SocketContext";
import SocketLink from "../SocketLink";
import { Button } from "react-native-elements";
import firebase from "firebase";

function LobbyPage({ navigation }) {
  const { socket, room, setRoom, race, setRace } = useContext(SocketContext);
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState(-1);

  const user = firebase.auth().currentUser;

  const createRoomNotFoundAlert = () => {
    Alert.alert(
      "Room Not Found",
      "The Room ID you entered wasn't found. Please try a different ID",
      [{ text: "OK", onPress: () => {} }]
    );
  };

  const enterRoom = (n, r) => {};

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/lobby.png")}
    >
      <View>
        <Text style={styles.lobby}>Host</Text>
      </View>

      <View style={styles.card}>
        <TextInput
          placeholder="Enter name"
          onChangeText={(name) => setName(name)}
          defaultValue=""
          style={styles.textBox}
        />
      </View>
      <Button
        buttonStyle={styles.button}
        raised="true"
        title="Create Room"
        onPress={() => {
          if (!name) {
            Alert.alert("Must fill in name!");
          } else {
            // Try to join room
            let url = "http://" + SocketLink + "/join-game";
            fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                roomID: roomId,
                clientID: user.uid,
              }),
            })
              .then((json) => json.json())
              .then((data) => {
                if (data.joined) {
                  // Update room data and go to game page
                  setRoom({
                    id: data.id,
                    friends: data.friends,
                  });
                  navigation.navigate("PreRace");
                } else {
                  // Send alert if room not found
                  createRoomNotFoundAlert();
                }
              });
          }
        }}
      />

      <View>
        <Text style={styles.lobby2}>Join</Text>
      </View>

      <View style={styles.card}>
        <TextInput
          placeholder="Enter name"
          onChangeText={(name) => setName(name)}
          defaultValue=""
          style={styles.textBox}
        />
      </View>
      <View style={styles.card}>
        <TextInput
          placeholder="Enter room ID"
          onChangeText={(roomId) =>
            roomId !== "" ? setRoomId(roomId) : setRoomId(-1)
          }
          defaultValue=""
          keyboardType="numeric"
          style={styles.textBox}
        />
      </View>

      <Button
        buttonStyle={styles.button}
        raised="true"
        title="Join Room"
        onPress={() => {
          if (!name) {
            Alert.alert("Must fill in name!");
          } else if (roomId == -1) {
            Alert.alert("Must fill in room ID!");
          } else {
            // Try to join room
            let url = "http://" + SocketLink + "/join-game";
            fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                roomID: roomId,
                clientID: user.uid,
              }),
            })
              .then((json) => json.json())
              .then((data) => {
                if (data.joined) {
                  // Update room data and go to game page
                  setRoom({
                    id: data.id,
                    friends: data.friends,
                  });
                  navigation.navigate("PreRace");
                } else {
                  // Send alert if room not found
                  createRoomNotFoundAlert();
                }
              });
          }
        }}
      />
    </ImageBackground>
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
  lobby: {
    fontSize: 35,
    marginTop: "50%",
    marginBottom: 20,
    alignSelf: "center",
    color: "#257291",
  },
  lobby2: {
    fontSize: 35,
    marginTop: 20,
    alignSelf: "center",
    color: "#257291",
  },
  smallText: {
    fontSize: 18,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#257291",
    fontSize: 200,
    width: 120,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderColor: "#257291",
    width: Dimensions.get("window").width / 1.2,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#470000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    elevation: 5,
    position: "relative",
  },
  textBox: {
    margin: 5,
  },
});

export default LobbyPage;
