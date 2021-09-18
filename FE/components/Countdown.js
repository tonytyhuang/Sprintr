import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';

// class CountDown extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             count: 5,
//             message: 'Ready Up!'
//         }
//     }
//     componentDidMount(){
//         this.timer = setInterval(() => {
//             let {count, message } = this.state;
//             this.setState({
//                 count: count - 1
//             })
//         }, 1000)
//     }
//     componentDidUpdate(prevProps, prevState, snapshot){
//         if(prevState.count !== this.state.count && this.state.count === 0){
//             clearInterval(this.timer)
//         }
//     }

//     maybeCountdown = this.state.count > 0 ? <Text>{count}{message}</Text> : null

//     render()
//         {
//             let {count, message} = this.state
//             return(
//                 <Text>
//                     {this.maybeCountdown}
//                 </Text>
                    
           
//             )
//         }
    
// }

function CountDown(){
    const [count, setCount] = useState(5);
    const [message, setMessage] = useState('Get Ready!')
    const [rendered, setRendered] = useState(false)
    const [rendered2, setRendered2] = useState(false)

    useEffect(() => {
        const interval = setInterval(()=>{
            setCount(count => count - 1);
        }, 1000);
        
        return () => {
            clearInterval(interval)
        }
    }, [])

    if(!rendered && count < 2){
            setMessage('Get Set!')
            setRendered(true)
    }

    const maybeCountdown = count > 0 ? <Text style={styles.countdown}>{count}</Text> : undefined
    const maybeMesaage = count > 0 ? <Text style={styles.message}>{message}</Text> : undefined
    const maybeGo = count == 0 ? <Text style={styles.go}>Go!</Text> : undefined

    return(
        <View>
            {maybeCountdown}
            {maybeMesaage}
            {maybeGo}
        </View>
    );
}

const styles = StyleSheet.create({
    countdown: {
        position: 'absolute',
        alignSelf: "center",
        top: (Dimensions.get('window').height/3.2) ,
        fontSize: 150
    },
    message: {
        position: 'absolute',
        alignSelf: "center",
        top: (Dimensions.get('window').height/3.2) ,
        fontSize: 30
    },
    go: {
        position: 'absolute',
        alignSelf: "center",
        top: (Dimensions.get('window').height/3) ,
        fontSize: 150
    }

});

export default CountDown;