import { notification } from 'antd';
import historyApi from 'app/axios/api/historyApi';
import userApi from 'app/axios/api/user';
import authStore from 'app/storeZustand/authStore';
import profileStore from 'app/storeZustand/profileStore';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { TUser } from 'types/common';

type TLoadingHeaderProfile = '' | 'avatar' | 'thumb';

export const useServiceHistoryProfile = () => {
  const { userId } = useParams<{ userId: string }>();

  const [loading, setLoading] = useState<TLoadingHeaderProfile>('');
  const [thumb, setThumb] = useState<File>();

  const inputUploadAvtRef = useRef<HTMLInputElement>(null);
  const inputUploadThumbRef = useRef<HTMLInputElement>(null);

  const { currenTUser } = authStore();
  const { profileUser, saveProfileUser } = profileStore();

  const { data, isLoading } = useQuery({
    queryKey: ['historyProfile'],
    queryFn: () => historyApi.getHistoryProfileByUserId(currenTUser.id ?? ''),
  });

  console.log(data);

  return { data, isLoading };
};
