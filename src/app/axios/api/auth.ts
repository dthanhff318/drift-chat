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
  getCurrenTUser: () => {
    return axiosClient.get('auth/current-user');
  },
};

export default authApi;
