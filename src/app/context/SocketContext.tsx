import React from "react";
import { Socket } from "socket.io-client";

type SocketInstance = {
  socket: Socket | null;
};
const SocketContext = React.createContext<SocketInstance>({
  socket: null,
});

export default SocketContext;
