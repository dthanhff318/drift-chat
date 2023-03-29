import { auth } from "app/firebase/configFirebase";
import { removeUserLs } from "app/helpers/localStorage";
import { removeUser } from "app/pages/AuthPage/authSlice/authSlice";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useState } from "react";

const useServices = () => {
  const dispatch = useDispatch();
  const [openAddFr, setOpenAddFr] = useState<boolean>(false);
  const handleSignout = async () => {
    await signOut(auth)
      .then(() => {
        removeUserLs();
        dispatch(removeUser());
      })
      .catch((err) => console.log(err));
  };
  const handleShowAddFr = (isOpen: boolean) => {
    setOpenAddFr(isOpen);
  };
  return {
    handleSignout,
    handleShowAddFr,
    openAddFr,
  };
};

export default useServices;
