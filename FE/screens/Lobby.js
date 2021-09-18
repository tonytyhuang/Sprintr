import { StatusBar } from 'expo-status-bar';
import React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { client } from 'websocket';
import { SocketContext } from '../SocketContext';
import SocketLink from "../SocketLink";

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
        <View>
            <Text>Lobby Page</Text>
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
            <Button
                title='start'
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

export default LobbyPage;