import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import SocketLink from "./SocketLink";

const SocketContext = React.createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const client = new W3CWebSocket(SocketLink);
    setSocket(client);
    setPending(false);
  }, []);

  if(pending){
    return <Text>Loading...</Text>
  }
  return (
    <SocketContext.Provider
      value={{
        socket
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export {SocketProvider, SocketContext};