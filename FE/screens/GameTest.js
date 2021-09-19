import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import CountDown from '../components/Countdown';
import SensorComponent from '../components/Sensor';
import { ProgressBar, Colors } from 'react-native-paper';
import { Button } from 'react-native-elements';
import { SocketContext } from '../SocketContext';
import firebase from "firebase";

const MaxDistance = 100;

function GameTestPage({navigation}){
    const [timer, setTimer] = useState(0);
    const { socket, room, setRoom } = useContext(SocketContext);
    const user = firebase.auth().currentUser;

    useEffect(()=>{
        const interval = setInterval(()=>{
            setTimer(timer => timer + 1);
        }, 1000);

        return () => {
            clearInterval(interval)
        }
    }, []);

    const maybeTimer = timer > 5 ? <Text style={styles.midText}>{timer}s</Text> : undefined
    
    return(
        <ImageBackground style={styles.container} source={require("./back3.png")}>
            
            <CountDown/>
           {maybeTimer}
           {Object.keys(room.friends).map((friend) => {
               return(
                <View key={friend}>
                    <Text style={styles.topText}>{room.friends[friend].name}</Text>
                    <ProgressBar progress={room.friends[friend].distance/MaxDistance} style={styles.progressbar} />
                    <Text style={styles.botText}>{Math.round(room.friends[friend].distance)}m / {MaxDistance}m</Text>
                </View>
               );
           })}
           
           <Button
            title="Leave Race"
            buttonStyle={styles.button}
            onPress={() => {
                navigation.navigate("Home")
            }}
           />
           <SensorComponent />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        padding: 20,
        paddingTop: 100,
        height: Dimensions.get('window').height
      },
    progressbar: {
        height: 10
    },
    topText: {
        padding: 5,
        fontSize: 16
    },
    botText: {
        padding: 5,
        fontSize: 16,
        alignSelf: 'center'
    },
    midText: {
        fontSize: 48,
        alignSelf: 'center'
    },
    message:{
        position: 'absolute'
    },
    messageFont:{
        padding: 100,
        fontSize: 48
    },
    button: {
        backgroundColor: "#DD1313",
        fontSize: 200,
        width: 220,
        alignSelf: 'center'
      },

});

export default GameTestPage;