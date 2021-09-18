import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { SocketContext } from '../SocketContext';
import firebase from 'firebase';

// const user = firebase.auth().currentUser;

function PreRacePage({navigation}){
    const {socket, room, setRoom, race, setRace} = useContext(SocketContext);
    const [ready, setReady] = useState(false);
    
    useEffect(() => {
        // Remove from room
        const events = [navigation.addListener('beforeRemove', (e) => {
            console.log("running beforeremove");
            socket.send(JSON.stringify({
                operation: "leave-room",
                data: {
                    roomID: room.id,
                    clientID: 123
                },
                text: ("Client " + 123 + " leaving " + room.id)
            }));
        })];

        // Unsubscribe to events when page closes
        return function cleanup() {
            events.forEach((unsub) => {
                unsub();
            });
        };
    }, []);

    // When somebody joins the room
    useEffect(() => {
        if (room) {
            console.log("Updated " + room.id);
            console.log(room.friends);
        }
    }, [room]);
    
    return(
        <View style={styles.bigWrapper}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Racers</Text>
                <Text style={styles.subheader}>Get warmed up. Start stretching. 🏃</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.roomIDContainer}>
                    <Text style={styles.roomID}>{room.id}</Text>
                    <Text style={styles.roomIDDesription}>Room code. Share with your friends to start racing.</Text>
                </View>
                <TouchableOpacity
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
                    style={styles.readyBtn}
                >
                    <Text style={styles.readyBtnText}>{ready ? "Unready" : "Ready Up"}</Text>
                </TouchableOpacity>
                <View style={styles.friendsContainer}>
                    {/* Iterate through all users in the room and display name and ready state */}
                    {Object.keys(room.friends).map(friend => {
                        return (
                            <View key={friend} style={styles.friend}>
                                <Text style={styles.friendName}>{friend}</Text>
                                <Text style={styles.friendStatus}>{room.friends[friend].ready ? "✅ Ready" : "❌ Not Ready"}</Text>
                            </View>
                        );
                    })}
                </View>
                
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
    },
    friendsContainer: {
        flexDirection: 'row',
        marginVertical: 25
    },
    friend: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '33%',
        paddingVertical: 10
    },
    friendName: {
        fontWeight: 'bold',
        fontSize: 17,
        paddingBottom: 5
    },
    friendStatus: {
        fontSize: 14
    },
    readyBtn: {
        paddingVertical: 10,
        marginVertical: 6,
        backgroundColor: '#dde6ef'
    },
    readyBtnText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default PreRacePage;