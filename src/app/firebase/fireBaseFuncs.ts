import authApi from "app/axios/api/auth";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./configFirebase";
import { store } from "store/configStore";
import { saveUser } from "app/pages/AuthPage/authSlice/authSlice";

auth.onAuthStateChanged((user) => {
  if (user) {
    const userInfo = {
      displayName: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
      uid: user.uid,
    };

    store.dispatch(saveUser(userInfo));
  }
});

export const logOutFireBase = () => {
  signOut(auth)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
