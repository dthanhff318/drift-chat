import { useState } from "react";

type TModalSideChat = "" | "change-name-group";

export const useService = () => {
  const [modal, setModal] = useState<TModalSideChat>("");
  return {
    modal,
    setModal,
  };
};
