import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import SocketLink from "./SocketLink";

const SocketContext = React.createContext();
const client = new W3CWebSocket("ws://" + SocketLink + "/ws");

const SocketProvider = ({ children }) => {
  // Socket is a reference to the websocket, each component can directly send messages
  // Message receiving will be done in this file, and will update the necessary contexts
  const [socket, setSocket] = useState(null);
  // Room is a dictionary with the following keys:
  // id: The unique ID of the room
  // friends: A list of other users in the room
  const [room, setRoom] = useState(null);
  // Race is a dictionary with the following keys:
  // distance: An int value of the distance to run
  // friends: A nested dictionary that maps each user to their update location/distance
  const [race, setRace] = useState(null);
  const [pending, setPending] = useState(true);

  client.onopen = () => {
    console.log("connected to socket from context");
    client.send(JSON.stringify({
      operation: "initiate",
      data: {
        id: 123
      },
      text: "Initiating client connection"
    }));
    setSocket(client);
    setPending(false);
  }

  client.onmessage = (msg) => {
    msg = JSON.parse(msg.data);
    if (msg.operation === "update-room") {
      let id = msg.data.roomID;
      setRoom({
        id: id,
        friends: msg.data.friends
      });
      console.log(id);
    }
  }

  client.onerror = (err) => {
    console.log("an error occurred");
  }

  if(pending){
    return <Text>Loading...</Text>
  }
  return (
    <SocketContext.Provider
      value={{socket, room, setRoom, race, setRace}}
    >
      {children}
    </SocketContext.Provider>
  );
};

export {SocketProvider, SocketContext};