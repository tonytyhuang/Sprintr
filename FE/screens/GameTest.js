import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import CountDown from '../components/Countdown';
import { SocketContext } from '../SocketContext';
import SensorComponent from '../components/Sensor';


function GameTestPage({navigation}){
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
           <SensorComponent/>
        </View>
    );
}

export default GameTestPage;