import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SocketContext } from '../SocketContext';

function PreRacePage({navigation}){
    const {socket, room, setRoom, race, setRace} = useContext(SocketContext);
    const [ready, setReady] = useState(false);
    
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
            },
            text: ("Client " + 123 + " leaving")
        }));
    });
    return(
        <View>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Racers</Text>
                <Text style={styles.subheader}>Get warmed up. Start stretching.</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.roomIDContainer}>
                    <Text style={styles.roomID}>{room.id}</Text>
                    <Text style={styles.roomIDDesription}>Room code. Share with your friends to start racing.</Text>
                </View>
                {/* Iterate through all users in the room and display name and ready state */}
                {Object.keys(room.friends).map(friend => {
                    return (
                        <View key={friend}>
                            <Text>{friend}</Text>
                            <Text>{room.friends[friend].ready ? "Ready" : "Not Ready"}</Text>
                        </View>
                    );
                })}
                <Button 
                    title={ready ? "Unready" : "Ready Up"}
                    onPress={() => {
                        setReady(!ready);
                        socket.send(JSON.stringify({
                            operation: "update-ready",
                            data: {
                                clientID: 123,
                                roomID: room.id,
                                ready: !ready
                            },
                            text: ("Update ready for client " + 123)
                        }));
                    }}
                />
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 25
    },
    header: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#ffffff',
        paddingVertical: 6
    },
    subheader: {
        color: '#ffffff',
        fontSize: 14
    },
    headerContainer: {
        paddingBottom: 20,
        paddingTop: 60,
        paddingHorizontal: 25,
        backgroundColor: '#257291'
    },
    roomIDContainer: {
        justifyContent: 'center',
        paddingVertical: 15
    },
    roomIDDesription: {
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 50
    },
    roomID: {
        fontWeight: 'bold',
        fontSize: 50,
        textAlign: 'center'
    }
})

export default PreRacePage;