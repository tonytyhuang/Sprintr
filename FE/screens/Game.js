import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function GamePage({navigation}){
    const {socket, room, race} = useContext(SocketContext);
    useEffect(() => {
        console.log("run room changeD?");
        if (room) {
            console.log("Joined room " + room.id);
        }
    }, [room])
    return(
        <View>
            <Text>Game Page</Text>
        </View>
    );
}

export default GamePage;