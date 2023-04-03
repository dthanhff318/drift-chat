import { useState } from "react";
import { auth } from "app/firebase/configFirebase";
import { removeUserLs } from "app/helpers/localStorage";
import { pathLoginPage } from "app/routes/routesConfig";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "store/configStore";
import { ENav } from "enums";
import { changeNav } from "./layoutSlice/layoutSlice";

const useServices = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [openAddFr, setOpenAddFr] = useState<boolean>(false);

  const handleShowAddFr = (isOpen: boolean) => {
    setOpenAddFr(isOpen);
  };

  return {
    handleShowAddFr,
    openAddFr,
  };
};

export default useServices;
