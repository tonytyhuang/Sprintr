import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

export default function SensorComponent() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('denied')
        return;
      }
      console.log(status)

      // let location = await Location.getCurrentPositionAsync({});
      // console.log(location)
      // setLocation(location);
      console.log("Here")
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
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
