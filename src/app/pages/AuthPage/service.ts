import { notification } from 'antd';
import authApi from 'app/axios/api/auth';
import { auth } from 'app/firebase/configFirebase';
import { saveToken } from 'app/helpers/localStorage';
import { pathHomePage } from 'app/routes/routesConfig';
import authStore from 'app/storeZustand/authStore';
import friendStore from 'app/storeZustand/friendStore';
import socketStore from 'app/storeZustand/socketStore';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { TUser } from 'types/common';

const provider = new GoogleAuthProvider();
// const provider = new FacebookAuthProvider();

const useService = () => {
  const history = useHistory();

  const { saveCurrenTUser } = authStore();
  const { getDataCommunicate } = friendStore();
  const { socket } = socketStore();

  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseOver = (e) => {
    if (e.target.closest(`#loginWrap`)) {
      return;
    }
    const pointerX = e.pageX;
    const pointerY = e.pageY;
    const newPos = calculatePosBg(pointerX, pointerY);
    (imageRef.current as HTMLImageElement).style.objectPosition = newPos;
  };

  const calculatePosBg = (pointerX: number, pointerY: number) => {
    const centerW = window.innerWidth / 2;
    const centerH = window.innerHeight / 2;

    if (pointerX > centerW) {
      return pointerY > centerH ? '-4rem -4rem' : '-4rem 4rem';
    } else {
      return pointerY > centerH ? '4rem -4rem' : '4rem 4rem';
    }
  };

  const handleLoginFirebase = () => {
    provider.setCustomParameters({ prompt: 'select_account' });
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const { displayName, email, photoURL, uid } = result.user;
        const userInfo = {
          displayName,
          email,
          photoURL,
          uid,
        };
        const res = await authApi.login(userInfo);
        const { token, user }: { token: any; user: TUser } = res.data;
        console.log(token);

        saveToken(token.accessToken, 'accessToken');
        saveToken(token.refreshToken, 'refreshToken');
        saveCurrenTUser(user);
        await getDataCommunicate();
        history.push(pathHomePage);
        notification.success({
          message: `Welcome sir, ${user.displayName}`,
          description: "Let's experience this special social network",
          duration: 4,
        });
        // Emit event user login
        socket?.emit('userLogin', user);
      })
      .catch((err) => {
        console.log(err);

        notification.error({
          message: `Login error! Try again`,
          description: 'Something error now, try again later',
          duration: 4,
        });
      });
  };
  return {
    imageRef,
    handleMouseOver,
    handleLoginFirebase,
  };
};

export default useService;
