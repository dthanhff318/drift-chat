import { notification } from 'antd';
import authApi from 'app/axios/api/auth';
import { auth } from 'app/firebase/configFirebase';
import { saveToken } from 'app/helpers/localStorage';
import { pathHomePage } from 'app/routes/routesConfig';
import authStore from 'app/storeZustand/authStore';
import friendStore from 'app/storeZustand/friendStore';
import socketStore from 'app/storeZustand/socketStore';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TUser } from 'types/common';
import settingStore from './../../storeZustand/settingStore';
import { useQueryClient } from 'react-query';
import friendsApi from 'app/axios/api/friends';
import { queryKey } from 'const/reactQueryKey';

const ACTION_CLOSED_POPUP = 'auth/popup-closed-by-user';
const provider = new GoogleAuthProvider();

const useService = () => {
  const history = useHistory();

  const queryClient = useQueryClient();

  const { saveCurrentUser } = authStore();
  const { getSettings } = settingStore();
  const { getDataCommunicate } = friendStore();
  const { socket } = socketStore();
  const [loading, setLoading] = useState<boolean>(false);

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
        setLoading(true);
        const res = await authApi.login(userInfo);
        const { token, user }: { token: any; user: TUser } = res.data;
        saveToken(token.accessToken, 'accessToken');
        saveToken(token.refreshToken, 'refreshToken');
        saveCurrentUser(user);
        await getSettings();
        await getDataCommunicate();
        queryClient.fetchQuery({
          queryKey: queryKey.DATA_COMMUNICATE,
          queryFn: () => friendsApi.getInfoCommuication(),
        });
        setLoading(false);
        history.replace(pathHomePage);
        notification.success({
          message: `Welcome sir, ${user.displayName}`,
          description: "Let's experience this special social network",
          duration: 4,
        });
        // Emit event user login
        socket?.emit('userLogin', user);
      })
      .catch((err) => {
        setLoading(false);
        if (err?.code === ACTION_CLOSED_POPUP) {
          notification.warning({
            message: `You just closed login popup`,
            description: 'Open popup and login again',
            duration: 3,
          });
        } else {
          notification.error({
            message: `Login error! Try again`,
            description: 'Something error now, try again later',
            duration: 3,
          });
        }
      });
  };
  return {
    imageRef,
    loading,
    handleMouseOver,
    handleLoginFirebase,
  };
};

export default useService;
