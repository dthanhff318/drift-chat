import authApi from "app/axios/api/auth";
import { pathHomePage } from "app/routes/routesConfig";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "app/firebase/configFirebase";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUser } from "app/pages/AuthPage/authSlice/authSlice";
import { saveToken } from "app/helpers/localStorage";

const provider = new GoogleAuthProvider();
// const provider = new FacebookAuthProvider();

const useService = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLoginFirebase = () => {
    provider.setCustomParameters({ prompt: "select_account" });
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const { displayName, email, photoURL, uid } = result.user;
        const userInfo = {
          displayName,
          email,
          photoURL,
          uid,
        };
        const res = await authApi.login(userInfo);
        const { token, user } = res.data;
        saveToken(token.accessToken, "accessToken");
        saveToken(token.refreshToken, "refreshToken");
        dispatch(saveUser(user));
        history.push(pathHomePage);
      })
      .catch((err) => console.log(err));
  };
  return {
    handleLoginFirebase,
  };
};

export default useService;
