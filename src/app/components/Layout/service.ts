import { auth } from "app/firebase/configFirebase";
import { removeUserLs } from "app/helpers/localStorage";
import { removeUser } from "app/pages/AuthPage/authSlice/authSlice";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";

const useServices = () => {
  const dispatch = useDispatch();
  const handleSignout = async () => {
    await signOut(auth)
      .then(() => {
        removeUserLs();
        dispatch(removeUser());
      })
      .catch((err) => console.log(err));
  };
  return {
    handleSignout,
  };
};

export default useServices;
