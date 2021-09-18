import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import CountDown from '../components/Countdown';

function GameTestPage({navigation}){
    return(
        <View>
            <CountDown/>
            <Text>Test Game Page</Text>
        </View>
    );
}

export default GameTestPage;