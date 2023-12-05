import { useState } from "react";
import { auth } from "app/firebase/configFirebase";
import { removeUserLs } from "app/helpers/localStorage";
import { pathLoginPage } from "app/routes/routesConfig";
import { signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { ENav } from "enums";
import { changeNav } from "./layoutSlice/layoutSlice";

const useServices = () => {
  const history = useHistory();
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
