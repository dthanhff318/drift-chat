import http from "http";
import socket from "socket.io";

export const ioInstance = (app) => {
  const io = socket();
  const server = http.Server(app);
  return io.attach(server);
};
