import { StatusBar } from 'expo-status-bar';
import React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Dimensions } from 'react-native';
import { client } from 'websocket';
import { SocketContext } from '../SocketContext';
import SocketLink from "../SocketLink";
import { Button } from 'react-native-elements';
import firebase from 'firebase';

function LobbyPage({navigation}){
    const {socket, room, setRoom, race, setRace} = useContext(SocketContext);
    const [name, setName] = useState('');
    const [roomId, setRoomId] = useState(-1);

    const createRoomNotFoundAlert = () => {
        Alert.alert(
            "Room Not Found",
            "The Room ID you entered wasn't found. Please try a different ID",
            [{ text: "OK", onPress: () => {} }]
        );
    }

    const enterRoom = (n, r) => {
        
    }

    return(
        <View style={styles.container}>
            <Text style={styles.lobby}>Lobby</Text>
            <View>
                <TextInput
                placeholder="Enter name"
                onChangeText={name => setName(name)}
                defaultValue=''
            />
            <TextInput
                placeholder="Enter room Id"
                onChangeText={roomId => roomId !== "" ? setRoomId(roomId) : setRoomId(-1)}
                defaultValue=''
                keyboardType='numeric'
            />
            </View>
            
            <Button
                buttonStyle = {styles.button}
                raised="true"
                title='START'
                onPress={()=>{
                    // Try to join room
                    user = firebase.auth().currentUser;
                    console.log(user)
                    let url = "http://" + SocketLink + "/join-game";
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            roomID: roomId,
                            clientID: 123
                        })
                    })
                        .then((json) => json.json())
                        .then((data) => {
                            if (data.joined) {
                                // Update room data and go to game page
                                setRoom({
                                    id: data.id,
                                    friends: data.friends
                                });
                                navigation.navigate('PreRace');
                            } else {
                                // Send alert if room not found
                                createRoomNotFoundAlert();
                            }
                        })
                    
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: 20
    },
    lobby: {
        fontSize: 70,
        marginTop: 20
    },
    button: {
        fontSize: 200,
        width: 100
    }
  });

export default LobbyPage;