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

const ACTION_CLOSED_POPUP = 'auth/popup-closed-by-user';
const provider = new GoogleAuthProvider();

const useService = () => {
  const history = useHistory();

  const { saveCurrentUser } = authStore();
  const { getSettings } = settingStore();
  const { getDataCommunicate } = friendStore();
  const { socket } = socketStore();
  const [loading, setLoading] = useState<boolean>(false);

  const imageRef = useRef<HTMLImageElement>(null);

  return {
    imageRef,
    loading,
  };
};

export default useService;
