import { StatusBar } from 'expo-status-bar';
import React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { client } from 'websocket';
import { SocketContext } from '../SocketContext';

function LobbyPage({navigation}){
    const {socket, room, race} = useContext(SocketContext);
    const [name, setName] = useState('');
    const [roomId, setRoomId] = useState('');

    

    const enterRoom = (n, r) => {
        
    }

    return(
        <View>
            <Text>Lobby Page</Text>
            <TextInput
                placeholder="Enter name"
                onChangeText={name => setName(name)}
                defaultValue=''
            />
            <TextInput
                placeholder="Enter room Id"
                onChangeText={roomId => setRoomId(roomId)}
                defaultValue=''
            />
            <Button
                title='start'
                onPress={()=>{
                    socket.send(JSON.stringify({
                        text: "Joining game..."
                    }));
                    navigation.navigate('Game');
                }}
            />
        </View>
    );
}

export default LobbyPage;