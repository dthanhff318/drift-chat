import authApi from "app/axios/api/auth";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./configFirebase";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  console.log(process.env);

  signInWithPopup(auth, provider)
    .then(async (result) => await authApi.login(result.user))
    .catch((err) => console.log(err));
};

export const logOutFireBase = () => {
  console.log(process.env);

  signOut(auth)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
