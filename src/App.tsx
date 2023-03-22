import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
// import socketInstance from "./app/socketConfig/socketIoConfig";
import { io } from "socket.io-client";
const socketInstance = io("http://localhost:4000");
function App() {
  const [listMessage1, setListMessage1] = useState<any[]>([]);
  const [messValue1, setMessValue1] = useState("");

  const [room, setRoom] = useState<number>(1);

  const handleSendMessage = async () => {
    socketInstance.emit("sendMess", {
      msg: messValue1,
      roomId: room,
      user: socketInstance.id,
    });
    setMessValue1("");
    setListMessage1([
      ...listMessage1,
      { msg: messValue1, user: socketInstance.id },
    ]);
  };

  const onChangeRoom = (roomId: number) => {
    setRoom(roomId);
  };

  const handleListenSend = (data: any) => {
    console.log(socketInstance);

    setListMessage1([...listMessage1, { msg: data.msg, user: data.id }]);
    console.log(data, "and", room);
  };
  useEffect(() => {
    socketInstance.emit("joinRoom", room);
    return () => {
      socketInstance.emit("leftRoom", room);
    };
  }, [room]);
  useEffect(() => {
    socketInstance.on("sendMess", handleListenSend);
    return () => {
      socketInstance.off("sendMess", handleListenSend);
    };
  }, [listMessage1]);
  return (
    <div className="App">
      <div className="navchat">
        <span
          className={room === 1 ? "active" : ""}
          onClick={() => onChangeRoom(1)}
        >
          Room 1
        </span>
        <span
          className={room === 2 ? "active" : ""}
          onClick={() => onChangeRoom(2)}
        >
          Room 2
        </span>
      </div>
      <div className="main">
        <div className="chatarea">
          {listMessage1.map((e) => (
            <div
              style={
                e.user === socketInstance.id
                  ? { color: "white" }
                  : { color: "green" }
              }
            >
              {e.msg}
            </div>
          ))}
        </div>
        <div className="send">
          <input
            type="text"
            value={messValue1}
            onChange={(e) => setMessValue1(e.target.value)}
          />
          <span onClick={handleSendMessage} className="btn-send">
            Send
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
