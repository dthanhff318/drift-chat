import { io } from 'socket.io-client';
const socketInstance = io('http://localhost:4000');
socketInstance.emit('init', 'Init');
export default socketInstance;
