import authApi from "app/axios/api/auth";
import { pathHomePage } from "app/routes/routesConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "app/firebase/configFirebase";
import { useHistory } from "react-router-dom";
import { saveToken } from "app/helpers/localStorage";
import authStore from "app/storeZustand/authStore";
import { notification } from "antd";
import { TUser } from "types/common";

const provider = new GoogleAuthProvider();
// const provider = new FacebookAuthProvider();

const useService = () => {
  const history = useHistory();

  const { saveCurrenTUser } = authStore();

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
        const { token, user }: { token: any; user: TUser } = res.data;
        saveToken(token.accessToken, "accessToken");
        saveToken(token.refreshToken, "refreshToken");
        console.log(user);

        saveCurrenTUser(user);
        history.push(pathHomePage);
        notification.success({
          message: `Welcome sir, ${user.displayName}`,
          description: "Let's experience this special social network",
          duration: 2,
        });
      })
      .catch((err) => console.log(err));
  };
  return {
    handleLoginFirebase,
  };
};

export default useService;
