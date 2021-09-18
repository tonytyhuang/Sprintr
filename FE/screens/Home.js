import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function HomePage({navigation}) {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button title="Login Page" onPress={()=>navigation.navigate('Login')}></Button>
        <Button title="Lobby Page" onPress={()=>navigation.navigate('Lobby')}></Button>
        <Button title="Signup Page" onPress={()=>navigation.navigate('Signup')}></Button>
        <StatusBar style="auto" />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default HomePage;


  