import { io } from "socket.io-client";

export const LIMIT_MESS = 10;
const socketInstance = io("http://192.168.2.14:4000");
