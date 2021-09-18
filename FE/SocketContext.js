import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import SocketLink from "./SocketLink";

const SocketContext = React.createContext();
const client = new W3CWebSocket(SocketLink);

const SocketProvider = ({ children }) => {
  const [socketState, setSocketState] = useState(null);
  const [pending, setPending] = useState(true);

  client.onopen = () => {
    console.log("connected to socket from context");
    setSocketState("connected");
    setPending(false);
  }

  if(pending){
    return <Text>Loading...</Text>
  }
  return (
    <SocketContext.Provider
      value={socketState}
    >
      {children}
    </SocketContext.Provider>
  );
};

export {SocketProvider, SocketContext};