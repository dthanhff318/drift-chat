import { notification } from 'antd';
import friendsApi from 'app/axios/api/friends';
import userApi from 'app/axios/api/user';
import authStore from 'app/storeZustand/authStore';
import profileStore from 'app/storeZustand/profileStore';
import axios from 'axios';
import { queryKey } from 'const/reactQueryKey';
import { EFriendStatus } from 'enums';
import { useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { TDataCommunicate, TUser } from 'types/common';

type TLoadingHeaderProfile = '' | 'avatar' | 'thumb';

export const useServiceHeaderProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState<TLoadingHeaderProfile>('');
  const [thumb, setThumb] = useState<File>();

  const inputUploadAvtRef = useRef<HTMLInputElement>(null);
  const inputUploadThumbRef = useRef<HTMLInputElement>(null);

  const { currentUser } = authStore();
  const { profileUser, saveProfileUser } = profileStore();

  const dataCommunicateQuery = queryClient.getQueryData<{ data: TDataCommunicate }>(
    queryKey.DATA_COMMUNICATE,
  );

  const { data: dataCommunicate = {} } = dataCommunicateQuery ?? {};

  const handleLikedProfile = async () => {
    if (!userId) return;
    try {
      const res = await userApi.likeProfile(userId);
      const newDataUser = res.data as TUser;
      saveProfileUser({ ...profileUser, likedProfile: newDataUser.likedProfile });
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
      const avatarFile = files[0];
      setLoading('avatar');
      const signedUrl = await userApi.getSignedUrl({
        fileName: avatarFile.name,
        fileType: avatarFile.type.split('/')[1] ?? '',
      });
      await axios.put(signedUrl.data, avatarFile);
      const res = await userApi.uploadUser('photoUrl', files[0].name);
      const userUpdate = res.data as TUser;
      saveProfileUser({ ...profileUser, photoUrl: userUpdate.photoUrl });
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
      const signedUrl = await userApi.getSignedUrl({
        fileName: thumb.name,
        fileType: thumb.type.split('/')[1] ?? '',
      });
      await axios.put(signedUrl.data, thumb);
      const res = await userApi.uploadUser('thumbProfile', thumb.name);
      const userUpdate = res.data as TUser;
      saveProfileUser({ ...profileUser, thumbProfile: userUpdate.thumbProfile });
      setThumb(undefined);
      setLoading('');
    } catch (err) {
      console.log(err);
      setLoading('');
    }
  };

  const clearPreviewThumb = () => {
    setThumb(undefined);
  };

  const handleFriendRequest = async (friendId: string, status: EFriendStatus) => {
    switch (status) {
      case EFriendStatus.Unfriend:
        await friendsApi.unfriend(friendId);
        queryClient.refetchQueries(queryKey.DATA_COMMUNICATE);
        break;
      case EFriendStatus.Add:
        await friendsApi.addFriend(friendId);
        queryClient.refetchQueries(queryKey.DATA_COMMUNICATE);
        break;
      case EFriendStatus.Accept:
        await friendsApi.acceptFrRequest(friendId);
        queryClient.refetchQueries(queryKey.DATA_COMMUNICATE);
        break;
      default:
    }
  };

  const checkFriendStatus = () => {
    const { listFriend, listAccept, listRequest } = dataCommunicate;
    if (listFriend?.find((e) => e.id === userId)) {
      return EFriendStatus.Unfriend;
    }
    if (listAccept?.find((e) => e.id === userId)) {
      return EFriendStatus.Accept;
    }
    if (listRequest?.find((e) => e.id === userId)) {
      return EFriendStatus.Waiting;
    }
    return EFriendStatus.Add;
  };

  return {
    inputUploadAvtRef,
    inputUploadThumbRef,
    currentUser,
    loading,
    userId,
    thumb,
    handleFriendRequest,
    clearPreviewThumb,
    handleChangeThumbProfile,
    handleUploadAvatar,
    handleUploadThumbProfile,
    handleLikedProfile,
    checkFriendStatus,
  };
};
