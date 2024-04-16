import authApi from 'app/axios/api/auth';
import { getTokenFromLocalStorage } from 'app/helpers/localStorage';
import RenderRoutes, { routes } from 'app/routes/routes';
import { pathObj } from 'app/routes/routesConfig';
import authStore from 'app/storeZustand/authStore';
import socketStore from 'app/storeZustand/socketStore';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';
import { io } from 'socket.io-client';
import './App.scss';
import { messaging, getToken } from 'app/firebase/configFirebase';
import { onMessage } from 'firebase/messaging';

const queryClient = new QueryClient({
  defaultOptions: {},
});

let socketInstance;

function App() {
  const accessToken = getTokenFromLocalStorage();

  const { currentUser, saveCurrentUser } = authStore();
  const { setSocket } = socketStore();

  const requestPermission = async () => {
    if (!messaging) return;
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      try {
        const token = await getToken(messaging, {
          vapidKey: process.env.REACT_APP_FCM_VAPID_KEY,
        });
        console.log('Token generated : ', token);
      } catch (err) {
        console.log(err);
      }
    } else if (permission === 'denied') {
      alert('You denied for the notification');
    }
  };

  const getCurrentUser = async () => {
    try {
      const res = await authApi.getCurrentUser();
      saveCurrentUser(res.data);
    } catch (err) {
      localStorage.clear();
      window.location.href = pathObj.loginPage;
    }
  };

  useEffect(() => {
    if (!currentUser?.id) return;
    socketInstance = io(process.env.REACT_APP_SOCKET_URL ?? 'http://localhost:4000', {
      closeOnBeforeunload: false,
      query: { id: currentUser?.id },
    });
    setSocket(socketInstance);
  }, [currentUser?.id]);

  useEffect(() => {
    if (accessToken) {
      requestPermission();
      getCurrentUser();
      onMessage(messaging, (payload) => {
        console.log(payload);
      });
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const { socket } = socketStore.getState();
      const { currentUser } = authStore.getState();
      if (!currentUser?.id) return;
      socket?.emit('closeApp', {
        id: currentUser?.id,
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
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Router>
        <RenderRoutes routes={routes} checkAuthLocal={!!checkAuthLocal} currentUser={{}} />
      </Router>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
