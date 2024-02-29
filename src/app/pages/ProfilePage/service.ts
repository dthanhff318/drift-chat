import { notification } from 'antd';
import userApi from 'app/axios/api/user';
import authStore from 'app/storeZustand/authStore';
import profileStore from 'app/storeZustand/profileStore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const DEFAULT_PAST_TIME = '1970-01-01T00:00:00.000Z';

export const useService = () => {
  const { userId } = useParams<{ userId: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser } = authStore();

  const { profileUser, saveProfileUser } = profileStore();
  const getDetailUserId = async () => {
    try {
      if (!userId) {
        saveProfileUser(currentUser);
        return;
      }
      setLoading(true);
      const res = await userApi.getUserById(userId);
      saveProfileUser(res.data);
      setLoading(false);
    } catch (err) {
      notification.error({
        message: `Login error! Try again`,
        description: 'Something error now, try again later',
        duration: 4,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetailUserId();
  }, [userId]);

  return { profileUser, loading, userId };
};
