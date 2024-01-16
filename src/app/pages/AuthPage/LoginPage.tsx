import { QRCode } from 'antd';
import GoogleIcon from 'app/components/Icon/Google/GoogleIcon';
import { getPublicImageUrl } from 'app/helpers/funcs';
import React from 'react';
import useService from './service';
import s from './style.module.scss';

const LoginPage = () => {
  const { imageRef, handleMouseOver, handleLoginFirebase } = useService();

  return (
    <div className={s.container} onMouseMove={handleMouseOver}>
      <img
        className={s.bgImage}
        ref={imageRef}
        src={getPublicImageUrl('bgLoginPage.jpeg')}
        alt=""
      />
      <div id="loginWrap" className={s.loginWrap}>
        <div className={s.loginContainer}>
          <img className={s.logoApp} src={getPublicImageUrl('icLogo.png')} alt="" />
          <button onClick={handleLoginFirebase} className={s.google}>
            <GoogleIcon />
            <p>Login Google</p>
          </button>
          <div className={s.qrLogin}>
            <QRCode value="https://ant.design/" color={'#004c9d'} bordered />
            <span className={s.text}>Login with QR, scan now !</span>
          </div>
        </div>
        <div className={s.bottom}></div>
      </div>
    </div>
  );
};

export default LoginPage;
