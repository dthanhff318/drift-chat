import { notification } from 'antd';
import userApi from 'app/axios/api/user';
import authStore from 'app/storeZustand/authStore';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TUser } from 'types/common';

type TLoadingHeaderProfile = '' | 'avatar' | 'thumb';

export const useServiceHeaderProfile = () => {
  const { userId } = useParams<{ userId: string }>();

  const [loading, setLoading] = useState<TLoadingHeaderProfile>('');
  const [thumb, setThumb] = useState<File>();

  const inputUploadAvtRef = useRef<HTMLInputElement>(null);
  const inputUploadThumbRef = useRef<HTMLInputElement>(null);

  const { currenTUser, saveCurrenTUser } = authStore();

  const handleLikedProfile = async () => {
    if (!userId) return;
    try {
      const res = await userApi.likeProfile(userId);
      const newDataUser = res.data as TUser;
      // setUserDetail({ ...userDetail, likedProfile: newDataUser.likedProfile });
    } catch (err) {
      notification.error({
        message: `Something error!`,
        description: 'Something error now, try again later',
        duration: 4,
      });
    }
  };

  const handleUploadAvatar = async (e) => {
    try {
      const { files } = e.target;
      if (!files) {
        return;
      }
      setLoading('avatar');
      const formUpload = new FormData();
      formUpload.append('image', files[0]);
      const res = await userApi.uploadAvatar(formUpload);
      saveCurrenTUser(res.data as TUser);
      setLoading('');
    } catch (err) {
      setLoading('');
    }
  };

  const handleChangeThumbProfile = async (e) => {
    try {
      const { files } = e.target;
      if (!files) {
        return;
      }
      setThumb(files);
      // const urlImage = URL.createObjectURL(files[0]);

      setLoading('');
    } catch (err) {
      setLoading('');
    }
  };

  const handleUploadThumbProfile = async (e) => {
    if (!thumb) return;
    try {
      setLoading('thumb');
      const formUpload = new FormData();
      formUpload.append('image', thumb);
      const res = await userApi.uploadThumbProfile(formUpload);
      saveCurrenTUser(res.data as TUser);

      setLoading('');
    } catch (err) {
      setLoading('');
    }
  };

  return {
    inputUploadAvtRef,
    inputUploadThumbRef,
    currenTUser,
    loading,
    userId,
    thumb,
    handleUploadAvatar,
    handleUploadThumbProfile,
    handleLikedProfile,
  };
};
