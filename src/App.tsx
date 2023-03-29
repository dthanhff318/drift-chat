import React, { useEffect, useState } from "react";
import "./App.scss";
import { io } from "socket.io-client";
import { BrowserRouter as Router } from "react-router-dom";

import RenderRoutes, { routes } from "app/routes/routes";
import { useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { getUserFromLs } from "app/helpers/localStorage";
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
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const checkAuthLocal = !!Object.entries(getUserFromLs()).length ?? isAuth;
  console.log(!!Object.entries(getUserFromLs()).length);
  return (
    <>
      <Router>
        <RenderRoutes
          routes={routes}
          checkAuthLocal={checkAuthLocal}
          currentUser={{}}
        />
      </Router>
    </>
  );
}

export default App;
