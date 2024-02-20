import authApi from 'app/axios/api/auth';
import { getTokenFromLocalStorage } from 'app/helpers/localStorage';
import RenderRoutes, { routes } from 'app/routes/routes';
import { pathLoginPage } from 'app/routes/routesConfig';
import authStore from 'app/storeZustand/authStore';
import friendStore from 'app/storeZustand/friendStore';
import socketStore from 'app/storeZustand/socketStore';
import React, { useEffect, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { io } from 'socket.io-client';
import './App.scss';

const queryClient = new QueryClient();

let socketInstance;

function App() {
  const accessToken = getTokenFromLocalStorage();

  const { currentUser, saveCurrentUser } = authStore();
  const { getDataCommunicate } = friendStore();
  const { setSocket, socket } = socketStore();

  useMemo(() => {
    if (!currentUser.id) return;
    socketInstance = io('http://localhost:4000', {
      closeOnBeforeunload: false,
      query: { id: currentUser.id },
    });
    setSocket(socketInstance);
  }, [currentUser.id]);

  const getCurrentUser = async () => {
    try {
      const res = await authApi.getCurrentUser();
      saveCurrentUser(res.data);
    } catch (err) {
      localStorage.clear();
      window.location.href = pathLoginPage;
    }
  };

  useEffect(() => {
    if (accessToken) {
      getCurrentUser();
    }
  }, []);

  useEffect(() => {
    if (accessToken || currentUser.id) {
      getDataCommunicate();
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const { socket } = socketStore.getState();
      const { currentUser } = authStore.getState();
      socket?.emit('closeApp', {
        id: currentUser.id,
        time: Date.now(),
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const checkAuthLocal = accessToken || currentUser.id;
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <RenderRoutes routes={routes} checkAuthLocal={!!checkAuthLocal} currentUser={{}} />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
