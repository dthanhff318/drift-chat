import authApi from "app/axios/api/auth";
import { pathHomePage } from "app/routes/routesConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "app/firebase/configFirebase";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUser } from "app/pages/AuthPage/authSlice/authSlice";
import { saveToken } from "app/helpers/localStorage";

const provider = new GoogleAuthProvider();

const useService = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLoginFirebase = () => {
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
        const { accessToken, refreshToken } = res.data;
        saveToken(accessToken, "accessToken");
        saveToken(refreshToken, "refreshToken");
        dispatch(saveUser(userInfo));
        history.push(pathHomePage);
      })
      .catch((err) => console.log(err));
  };
  return {
    handleLoginFirebase,
  };
};

export default useService;
