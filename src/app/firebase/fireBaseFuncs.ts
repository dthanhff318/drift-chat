import authApi from 'app/axios/api/auth';
import { signOut } from 'firebase/auth';
import { auth } from './configFirebase';
import authStore from 'app/storeZustand/authStore';

auth.onAuthStateChanged((user) => {
  if (user) {
    const userInfo = {
      displayName: user.displayName ?? '',
      email: user.email ?? '',
      photoUrl: user.photoURL ?? '',
      uid: user.uid,
    };

    authStore.getState().saveCurrenTUser(userInfo);
  }
});

export const logOutFireBase = () => {
  signOut(auth)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
