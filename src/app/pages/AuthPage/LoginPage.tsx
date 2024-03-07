import { QRCode } from 'antd';
import GoogleIcon from 'app/components/Icon/Google/GoogleIcon';
import Loading from 'app/components/Loading/Loading';
import { getPublicImageUrl } from 'app/helpers/funcs';
import React from 'react';
import useService from './service';
import s from './style.module.scss';

const LoginPage = () => {
  const { imageRef, loading, handleMouseOver, handleLoginFirebase } = useService();

  return (
    <div className={s.container} onMouseMove={handleMouseOver}>
      <img
        className={s.bgImage}
        ref={imageRef}
        src={getPublicImageUrl('bgLoginPage.jpeg')}
        alt=""
      />
      <div id="loginWrap" className={s.loginWrap}>
        <Loading loading={loading} />
        <div className={s.loginContainer}>
          <img className={s.logoApp} src={getPublicImageUrl('icLogo.png')} alt="" />
          <button onClick={handleLoginFirebase} className={s.google}>
            <GoogleIcon />
            <p className={s.loginText}>Login with Google</p>
          </button>
        </div>
        <div className={s.bottom}></div>
      </div>
      <p className={s.vesion}>Version: 1.0.0</p>
    </div>
  );
};

export default LoginPage;
