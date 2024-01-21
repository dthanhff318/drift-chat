import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from '@livekit/components-react';
import authApi from 'app/axios/api/auth';
import { auth } from 'app/firebase/configFirebase';
import { geTUserFromLs } from 'app/helpers/localStorage';
import authStore from 'app/storeZustand/authStore';
import { signOut } from 'firebase/auth';
import { Track } from 'livekit-client';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '@livekit/components-styles';

const SettingsPage = () => {
  const { currenTUser, logout } = authStore.getState();
  const infoUser = currenTUser ?? geTUserFromLs();
  const history = useHistory();
  const handleLogout = async () => {
    // await authApi.logout(infoUser.uid ?? "");
    await signOut(auth).then(() => {
      // logout();
      // history.push(pathLoginPage);
    });
  };

  const [token, setToken] = useState<string>('');
  const tokenLivekit = localStorage.getItem('tokenLivekit');

  useEffect(() => {
    // (async () => {
    //   try {
    //     const res = await authApi.getTokenLivekit();
    //     setToken(res.data);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // })();
  }, []);

  return <div>{/* <button onClick={handleLogout}>Logout</button> */}</div>;
};

export default SettingsPage;
