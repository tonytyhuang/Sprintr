import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import CountDown from '../components/Countdown';
import SensorComponent from '../components/Sensor';
import { ProgressBar, Colors } from 'react-native-paper';
import { Button } from 'react-native-elements';

const MaxDistance = 5000;

function GameTestPage({navigation}){
    
    const [dist1, setDist1] = useState(0);
    const [dist2, setDist2] = useState(0);
    const [timer, setTimer] = useState(0)

    useEffect(()=>{
        const interval = setInterval(()=>{
            setDist1(dist1 => dist1 + 10);
            setDist2(dist2 => dist2 + 20);
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
           <View>
               <Text style={styles.topText}>My Progress</Text>
                <ProgressBar progress={dist1/MaxDistance}
                    style={styles.progressbar}
                />
                <Text style={styles.botText}>{dist1}m / {MaxDistance}m</Text>
           </View>
           {maybeTimer}
           <View>
                <Text style={styles.topText}>Opponent's Progress</Text>
                <ProgressBar progress={dist2/MaxDistance}
                style={styles.progressbar}
                />
                <Text style={styles.botText}>{dist2}m / {MaxDistance}m</Text>
           </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        padding: 20,
        marginBottom: 10,
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
    }

});

export default GameTestPage;