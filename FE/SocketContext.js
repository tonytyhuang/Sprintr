import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import SocketLink from "./SocketLink";
import firebase from "firebase";


const SocketContext = React.createContext();

const SocketProvider = ({ children }) => {
  // Socket is a reference to the websocket, each component can directly send messages
  // Message receiving will be done in this file, and will update the necessary contexts
  const [socket, setSocket] = useState(null);
  // Room is a dictionary with the following keys:
  // id: The unique ID of the room
  // friends: A list of other users in the room
  const [room, setRoom] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log("auth changed>?");
      if (socket !== null && socket !== undefined) {
        console.log("tried to close?");
        socket.close();
        setSocket(null);
      }

      if (user !== null && user !== undefined) {
        console.log("connected " + user.uid);
        const client = new W3CWebSocket("ws://" + SocketLink + "/ws");

        client.onopen = () => {
          console.log("connected to socket from context");
          client.send(JSON.stringify({
            operation: "initiate",
            data: {
              id: user.uid
            },
            text: "Initiating client connection"
          }));
          setSocket(client);
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
      }
      
    });
  }, []);

  return (
    <SocketContext.Provider
      value={{socket, room, setRoom}}
    >
      {children}
    </SocketContext.Provider>
  );
};

export {SocketProvider, SocketContext};