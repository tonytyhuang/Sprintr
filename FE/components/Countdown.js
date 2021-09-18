import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from 'react-native';

class CountDown extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count: 5,
            message: 'Ready Up!'
        }
    }
    componentDidMount(){
        this.timer = setInterval(() => {
            let {count, message } = this.state;
            this.setState({
                count: count - 1
            })
        }, 1000)
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevState.count !== this.state.count && this.state.count === 0){
            clearInterval(this.timer)
        }
    }

    render()
        {
            let {count, message} = this.state
            return(
                <Text>
                    {message}
                    {count}
                </Text>
                    
           
            )
        }
    
}

export default CountDown;