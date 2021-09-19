import React, { useState, useEffect, useRef, useContext } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { SocketContext } from "../SocketContext";
import firebase from "firebase";

export default function SensorComponent() {
  const [timer, setTimer] = useState(0);
  // const [distance, setDistance] = useState(0);
  const distance = useRef(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [previousDistance, setPreviousDistance] = useState(0);
  const lat = useRef(null);
  const lon = useRef(null);
  const { socket, room, setRoom } = useContext(SocketContext);
  const user = firebase.auth().currentUser;

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d * 100;
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Constants.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("denied");
        return;
      }
      console.log(status);
    })();
    const interval = setInterval(async () => {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      if (!lat.current) {
        console.log(location);
        lat.current = location.coords.latitude;
        console.log(lat);
      }
      if (!lon.current) {
        lon.current = location.coords.longitude;
        console.log(lat);
      }
      console.log("load");
      if (lat.current !== null && lon.current !== null) {
        const dist = getDistanceFromLatLonInM(
          lat.current,
          lon.current,
          location.coords.latitude,
          location.coords.longitude
        );
        (lat.current = location.coords.latitude),
          (lon.current = location.coords.longitude),
          console.log(dist);
        if (dist != previousDistance && dist > 0.1) {
          
          // setDistance((distance) => distance + dist * 5);
          distance.current += Math.abs(dist) * 15;
          socket.send(JSON.stringify({
            operation: "update-race",
            data: {
              roomID: room.id,
              distance: distance.current,
              clientID: user.uid
            },
            text: ("Update distance for " + user.uid + " " + ((distance.current).toString()))
          }));
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    return () => {
      console.log("update");
    };
  }, [distance]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { Accelerometer } from 'expo-sensors';

// export default function SensorComponent() {
//   const [data, setData] = useState({
//     x: 0,
//     y: 0,
//     z: 0,
//   });
//   const [distance, setDistance] = useState(0)
//   const [time, setTime] = useState(0);
//   const [vx, setVx] = useState(0)
//   const [vy, setVy] = useState(0)
//   const [vz, setVz] = useState(0)
//   const [v, setV] = useState(0)
//   const [subscription, setSubscription] = useState(null);

//   const _subscribe = () => {
//     setSubscription(
//       Accelerometer.addListener(accelerometerData => {
//         setData(accelerometerData);
//         totalA = Math.sqrt(Math.pow(accelerometerData.x, 2)+Math.pow(accelerometerData.x, 2)+Math.pow(accelerometerData.x, 2))
//         setDistance(distance => distance + 0.5*totalA*0.001)
//     })
//     );
//   };

//   const _unsubscribe = () => {
//     subscription && subscription.remove();
//     setSubscription(null);
//   };

//   useEffect(() => {
//     _subscribe();
//     const interval = setInterval(()=>{
//         setTime(time => time += 0.01)
//     }, 10)
//     return () =>{ _unsubscribe()
//          clearInterval(interval)}
//   }, []);
//   Accelerometer.setUpdateInterval(10);
//   const { x, y, z } = data;
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
//       <Text style={styles.text}>
//         x: {round(x)} y: {round(y)} z: {round(z)}
//       </Text>
//       <Text>{distance}</Text>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
//           <Text>{subscription ? 'On' : 'Off'}</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// function round(n) {
//   if (!n) {
//     return 0;
//   }
//   return Math.floor(n * 100) / 100;
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 10,
//     paddingVertical: 100
//   },
//   text: {
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     alignItems: 'stretch',
//     marginTop: 15,
//   },
//   button: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#eee',
//     padding: 10,
//   },
//   middleButton: {
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderColor: '#ccc',
//   },
// });
