import { useState } from "react";
import { useHistory } from "react-router-dom";

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
