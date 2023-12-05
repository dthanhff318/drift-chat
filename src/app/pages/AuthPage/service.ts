import authApi from "app/axios/api/auth";
import { pathHomePage } from "app/routes/routesConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "app/firebase/configFirebase";
import { useHistory } from "react-router-dom";
import { saveToken } from "app/helpers/localStorage";
import authStore from "app/storeZustand/authStore";

const provider = new GoogleAuthProvider();
// const provider = new FacebookAuthProvider();

const useService = () => {
  const history = useHistory();

  const { saveCurrentUser } = authStore();

  const handleLoginFirebase = () => {
    provider.setCustomParameters({ prompt: "select_account" });
    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log(result.user);

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
        saveCurrentUser(user);
        history.push(pathHomePage);
      })
      .catch((err) => console.log(err));
  };
  return {
    handleLoginFirebase,
  };
};

export default useService;
