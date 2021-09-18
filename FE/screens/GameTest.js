import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import CountDown from '../components/Countdown';
import SensorComponent from '../components/Sensor';


function GameTestPage({navigation}){

    
    return(
        <View>
           <SensorComponent/>
        </View>
    );
}

export default GameTestPage;