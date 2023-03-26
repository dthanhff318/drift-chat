import { logOutFireBase } from "app/firebase/fireBaseFuncs";
import React from "react";
import useService from "./service";

type Props = {};

const LoginPage = (props: Props) => {
  const { handleLoginFirebase } = useService();
  return (
    <div>
      <button onClick={handleLoginFirebase}>Login Google</button>
    </div>
  );
};

export default LoginPage;
