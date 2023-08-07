import React, { useEffect, useState } from "react";
import "./App.scss";
import { io } from "socket.io-client";
import { BrowserRouter as Router, useHistory } from "react-router-dom";

import RenderRoutes, { routes } from "app/routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/configStore";
import {
  getTokenFromLocalStorage,
  getUserFromLs,
} from "app/helpers/localStorage";
import authApi from "app/axios/api/auth";
import { saveUser } from "app/pages/AuthPage/authSlice/authSlice";
import { pathLoginPage } from "app/routes/routesConfig";
const socketInstance = io("http://localhost:4000");
function App() {
  const {} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = getTokenFromLocalStorage();
  const getCurrentUser = async () => {
    try {
      const res = await authApi.getCurrentUser();
      dispatch(saveUser(res.data));
    } catch (err) {}
    history.replace(pathLoginPage);
  };
  useEffect(() => {
    if (accessToken) {
      getCurrentUser();
    }
  }, []);
  return (
    <>
      <Router>
        <RenderRoutes routes={routes} checkAuthLocal={true} currentUser={{}} />
      </Router>
    </>
  );
}

export default App;
