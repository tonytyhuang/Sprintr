import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { SocketContext } from "../SocketContext";

function LobbyPage({navigation}){
    const { socket } = useCOntext(SocketContext);
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
                    navigation.navigate('Game');
                }}
            />
        </View>
    );
}

export default LobbyPage;