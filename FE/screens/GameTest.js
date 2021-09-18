import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import CountDown from '../components/Countdown';
import { SocketContext } from '../SocketContext';

function GameTestPage({navigation}){
    const {socket, room, race} = useContext(SocketContext);
    useEffect(() => {
        if (room) {
            console.log("Joined room " + room.id);
        }
    }, [room]);
    return(
        <View>
            <CountDown/>
            <Text>Test Game Page</Text>
        </View>
    );
}

export default GameTestPage;