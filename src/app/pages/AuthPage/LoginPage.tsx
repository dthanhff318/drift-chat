import { logOutFireBase } from "app/firebase/fireBaseFuncs";
import React from "react";
import useService from "./service";
import s from "./style.module.scss";
import GoogleIcon from "app/components/Icon/Google/GoogleIcon";
import FaceBook from "app/components/Icon/FaceBook/FaceBook";

type Props = {};

const LoginPage = (props: Props) => {
  const { handleLoginFirebase } = useService();

  return (
    <div className={s.container}>
      <div className={s.loginWrap}>
        <div className={s.loginContainer}>
          <p className={s.titleLogin}>Login</p>
          <button onClick={handleLoginFirebase} className={s.google}>
            <GoogleIcon />
            <p>Login Google</p>
          </button>
          <button>
            <FaceBook />
            <p>Login Facebook</p>
          </button>
        </div>
        <div className={s.bottom}>
          <p>Or sign up using</p>
          <button>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
