import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SocketContext } from '../SocketContext';

function PreRacePage({navigation}){
    const {socket, room, setRoom, race, setRace} = useContext(SocketContext);
    
    // When somebody joins the room
    useEffect(() => {
        if (room) {
            console.log("Updated " + room.id);
            console.log(room.friends);
        }
    }, [room]);

    // Remove from room
    navigation.addListener('beforeRemove', (e) => {
        socket.send(JSON.stringify({
            operation: "leave-room",
            data: {
                roomID: room.id,
                clientID: 123
            }
        }));
    });
    return(
        <View>
            <Text>Get warmed up. Start stretching.</Text>
            <Text>Racers:</Text>
            {room.friends.map(friend => {
                return (
                    <Text key={friend}>{friend}</Text>
                );
            })}
        </View>
    );
}

export default PreRacePage;