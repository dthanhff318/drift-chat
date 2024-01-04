import React, { useEffect, useState } from "react";
import "./App.scss";
import { io } from "socket.io-client";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import RenderRoutes, { routes } from "app/routes/routes";
import { getTokenFromLocalStorage } from "app/helpers/localStorage";
import authApi from "app/axios/api/auth";
import { pathLoginPage } from "app/routes/routesConfig";
import authStore from "app/storeZustand/authStore";
import socketStore from "app/storeZustand/socketStore";
import friendStore from "app/storeZustand/friendStore";

const socketInstance = io("http://localhost:4000");

function App() {
  const accessToken = getTokenFromLocalStorage();

  const { currenTUser, saveCurrenTUser } = authStore();
  const { getDataCommunicate } = friendStore();
  const { setSocket } = socketStore();

  const getCurrenTUser = async () => {
    try {
      const res = await authApi.getCurrenTUser();
      saveCurrenTUser(res.data);
    } catch (err) {
      localStorage.clear();
      window.location.href = pathLoginPage;
    }
  };

  useEffect(() => {
    if (accessToken) {
      getCurrenTUser();
    }
  }, []);

  // Add socket to App
  useEffect(() => {
    setSocket(socketInstance);
  }, []);

  useEffect(() => {
    getDataCommunicate();
  }, []);

  const checkAuthLocal = accessToken || currenTUser.id;
  return (
    <>
      <Router>
        <RenderRoutes
          routes={routes}
          checkAuthLocal={!!checkAuthLocal}
          currenTUser={{}}
        />
      </Router>
    </>
  );
}

export default App;
