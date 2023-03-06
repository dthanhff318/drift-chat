import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connect } from "./mongoDbConfig/mongoConfig";
import { apiV1 } from "./routes";
import { createServer } from "http";
import { Server } from "socket.io";

const baseUrl = "localhost";
const port = 4000;

dotenv.config();
const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, {
  /* options */
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());

connect();

io.on("connection", (socket) => {
  console.log("user connect");
  socket.on("message", (data) => {
    console.log(`Received message: ${data}`);
    // Handle message event here
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    // Handle disconnect event here
  });
});
app.use("/v1", apiV1);
// autoIncrement.initialize(connect());
httpServer.listen(port, baseUrl, () => {
  console.log("Server is running in Port 4000");
});
