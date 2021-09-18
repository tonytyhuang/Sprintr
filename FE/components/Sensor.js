import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";

export default function SensorComponent() {
  const [timer, setTimer] = useState(0);
  const [distance, setDistance] = useState(0);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [previousDistance, setPreviousDistance] = useState(0);

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
    return d * 10;
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
      let location = await Location.getCurrentPositionAsync({});
      if (!lat || !lon) {
        setLat(location.coords.latitude);
        setLon(location.coords.longitude);
      } else {
        const dist = getDistanceFromLatLonInM(
          lat,
          lon,
          location.coords.latitude,
          location.coords.longitude
        );
        console.log(dist);
        if (dist != previousDistance && dist > 0.1) {
          setDistance((distance) => distance + dist * 3);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      <Text>{distance}</Text>
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
