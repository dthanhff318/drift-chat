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
      formUpload.append('type', 'photoUrl');
      const res = await userApi.uploadUser(formUpload);
      const userUpdate = res.data as TUser;
      saveCurrenTUser({ ...currenTUser, photoUrl: userUpdate.photoUrl });
      setLoading('');
    } catch (err) {
      setLoading('');
    }
  };

  const handleChangeThumbProfile = async (e) => {
    const { files } = e.target;
    if (!files) {
      return;
    }
    setThumb(files[0]);
  };

  const handleUploadThumbProfile = async () => {
    if (!thumb) return;
    try {
      setLoading('thumb');
      const formUpload = new FormData();
      formUpload.append('image', thumb);
      formUpload.append('type', 'thumbProfile');
      const res = await userApi.uploadUser(formUpload);
      saveCurrenTUser(res.data as TUser);
      setLoading('');
    } catch (err) {
      setLoading('');
    }
  };

  const clearPreviewThumb = () => {
    setThumb(undefined);
  };

  return {
    inputUploadAvtRef,
    inputUploadThumbRef,
    currenTUser,
    loading,
    userId,
    thumb,
    clearPreviewThumb,
    handleChangeThumbProfile,
    handleUploadAvatar,
    handleUploadThumbProfile,
    handleLikedProfile,
  };
};
