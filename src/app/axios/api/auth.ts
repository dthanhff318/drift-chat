import { User } from '@firebase/auth';
import { axiosClient } from '../axiosClient';
import { IndexedObject } from 'types/common';

const authApi = {
  login: (dataUser: Partial<User>): IndexedObject => {
    const { displayName, email, photoURL: photoUrl, uid } = dataUser;
    return axiosClient.post('/auth/login/firebase', {
      displayName,
      email,
      photoUrl,
      uid,
    });
  },
  logout: (refreshToken: string) => {
    return axiosClient.post('/auth/logout', {
      refreshToken,
    });
  },
  getCurrentUser: () => {
    return axiosClient.get('auth/current-user');
  },
  getTokenLivekit: (room: string) => {
    return axiosClient.get(`auth/gen-token-livekit?room=${room}`);
  },
};

export default authApi;
