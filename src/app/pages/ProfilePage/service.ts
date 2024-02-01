import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import userApi from 'app/axios/api/user';
import { TUser } from 'types/common';
import authStore from 'app/storeZustand/authStore';

export const DEFAULT_PAST_TIME = '1970-01-01T00:00:00.000Z';

export const useService = () => {
  const { userId } = useParams<{ userId: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const { currenTUser } = authStore();

  const [userDetail, setUserDetail] = useState<TUser>(currenTUser);
  const getDetailUserId = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const res = await userApi.getUserById(userId);
      setUserDetail(res.data);
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

  return { userDetail, loading, userId };
};
