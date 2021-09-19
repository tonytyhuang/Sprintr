import { StatusBar } from 'expo-status-bar';
import React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Dimensions, ImageBackground } from 'react-native';
import { client } from 'websocket';
import { SocketContext } from '../SocketContext';
import SocketLink from "../SocketLink";
import { Button } from 'react-native-elements';
import firebase from 'firebase';

function LobbyPage({navigation}){
    const {socket, room, setRoom, race, setRace} = useContext(SocketContext);
    const [name, setName] = useState('');
    const [roomId, setRoomId] = useState(-1);

    const user = firebase.auth().currentUser;

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
        <ImageBackground style={styles.container}
        source={require('./back2.jpg')}>
            <View>
                <Text style={styles.lobby}>Lobby</Text>
               
            </View>
            
            <View style={styles.card}>
                <TextInput
                    placeholder="Enter name"
                    onChangeText={name => setName(name)}
                    defaultValue=''
                    style={styles.textBox}
                />
                <TextInput
                    placeholder="Enter room ID"
                    onChangeText={roomId => roomId !== "" ? setRoomId(roomId) : setRoomId(-1)}
                    defaultValue=''
                    keyboardType='numeric'
                    style={styles.textBox}
                />
            </View>
            
            <Button
                buttonStyle = {styles.button}
                raised="true"
                title='START'
                onPress={()=>{
                    // Try to join room
                    let url = "http://" + SocketLink + "/join-game";
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            roomID: roomId,
                            clientID: user.uid
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
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#E5E5E5",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 20
    },
    lobby: {
        fontSize: 70,
        fontFamily: 'sans-serif-medium',
        marginTop: 10,
        marginBottom: 5,
        alignSelf: 'center',
        color: '#494169'
    },
    smallText: {
        fontSize: 18,
        alignSelf: 'center'
    },
    button: {
        fontSize: 200,
        width: 100
    },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        width: (Dimensions.get('window').width/1.5),
        padding: 20,
        shadowColor: '#470000',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.8,
        elevation: 5,
        position: 'relative',
        top: -20
    },
    textBox: {
        margin: 5
    }
  });

export default LobbyPage;