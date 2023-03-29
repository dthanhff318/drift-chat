import { auth } from "app/firebase/configFirebase";
import { removeUserLs } from "app/helpers/localStorage";
import { removeUser } from "app/pages/AuthPage/authSlice/authSlice";
import { pathLoginPage } from "app/routes/routesConfig";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const useServices = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSignout = async () => {
    await signOut(auth)
      .then(() => {
        removeUserLs();
        dispatch(removeUser());
        history.push(pathLoginPage);
      })
      .catch((err) => console.log(err));
  };
  return {
    handleSignout,
  };
};

export default useServices;
