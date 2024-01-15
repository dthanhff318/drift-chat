import authApi from 'app/axios/api/auth';
import { getTokenFromLocalStorage } from 'app/helpers/localStorage';
import RenderRoutes, { routes } from 'app/routes/routes';
import { pathLoginPage } from 'app/routes/routesConfig';
import authStore from 'app/storeZustand/authStore';
import friendStore from 'app/storeZustand/friendStore';
import socketStore from 'app/storeZustand/socketStore';
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { io } from 'socket.io-client';
import './App.scss';

const socketInstance = io('http://localhost:4000');

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
    if (accessToken || currenTUser) {
      getDataCommunicate();
    }
  }, []);

  const checkAuthLocal = accessToken || currenTUser.id;
  return (
    <>
      <Router>
        <RenderRoutes routes={routes} checkAuthLocal={!!checkAuthLocal} currenTUser={{}} />
      </Router>
    </>
  );
}

export default App;
