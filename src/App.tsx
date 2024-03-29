import authApi from 'app/axios/api/auth';
import { getTokenFromLocalStorage } from 'app/helpers/localStorage';
import RenderRoutes, { routes } from 'app/routes/routes';
import { pathObj } from 'app/routes/routesConfig';
import authStore from 'app/storeZustand/authStore';
import friendStore from 'app/storeZustand/friendStore';
import socketStore from 'app/storeZustand/socketStore';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { io } from 'socket.io-client';
import './App.scss';
import { queryKey } from 'const/reactQueryKey';
import friendsApi from 'app/axios/api/friends';

const queryClient = new QueryClient({
  defaultOptions: {},
});

let socketInstance;

function App() {
  const accessToken = getTokenFromLocalStorage();

  const { currentUser, saveCurrentUser } = authStore();
  const { setSocket } = socketStore();
  if (accessToken || currentUser?.id) {
    queryClient.prefetchQuery({
      queryKey: queryKey.DATA_COMMUNICATE,
      queryFn: () => friendsApi.getInfoCommuication(),
      staleTime: 10000,
    });
  }

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
      getCurrentUser();
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
    <QueryClientProvider client={queryClient}>
      <Router>
        <RenderRoutes routes={routes} checkAuthLocal={!!checkAuthLocal} currentUser={{}} />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
