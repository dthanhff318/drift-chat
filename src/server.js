import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connect } from "./mongoDbConfig/mongoConfig";
import { apiV1 } from "./routes";
import socket from "socket.io";
import http from "http";

const baseUrl = "localhost";
const port = 4000;

dotenv.config();
const app = express();
const serverIO = http.createServer(app);
export const ioInstance = socket(serverIO);

app.use(cors());
app.use(express.json());
app.use(cookieParser());

connect();

app.use("/v1", apiV1);
// autoIncrement.initialize(connect());
serverIO.listen(port, baseUrl, () => {
  console.log("Server is running in Port 4000");
});

ioInstance.on("connection", (sk) => {
  console.log("user connect");
  sk.on("message", (data) => {
    console.log(`Received message: ${data}`);
    // Handle message event here
  });

  sk.on("disconnect", () => {
    console.log("user disconnected");
    // Handle disconnect event here
  });
});
