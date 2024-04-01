import groupApi from 'app/axios/api/group';
import useClickOutSide from 'app/hook/useClickOutSide';
import { pathHomePage, pathProfileFriend } from 'app/routes/routesConfig';
import authStore from 'app/storeZustand/authStore';
import groupStore from 'app/storeZustand/groupStore';
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IndexedObject } from 'types/common';
import { replacePathParams } from 'app/helpers/funcs';
import { useQueryClient } from 'react-query';
import { queryKey } from 'const/reactQueryKey';

type TModalSideChat =
  | ''
  | 'change-name-group'
  | 'confirm-leave'
  | 'change-theme'
  | 'list-member'
  | 'add-member';
type TLoadingSideChat = '' | 'change-name-group' | 'photo' | 'leave';

type Props = {
  triggerSidechatRef: any;
  onClose: () => void;
};

export const useService = ({ triggerSidechatRef, onClose }: Props) => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const { currentUser } = authStore();
  const { getDetailGroup, saveCurrentGroup, saveDetailGroup, currentGroup, detailGroup } =
    groupStore();
  const [loading, setLoading] = useState<TLoadingSideChat>('');
  const [modal, setModal] = useState<TModalSideChat>('');
  const [preview, setPreview] = useState<boolean>(false);
  const inputUploadRef = useRef<HTMLInputElement>(null);
  const sideChatRef = useRef<HTMLDivElement>(null);

  const dataPopover = [
    {
      icon: '',
      text: 'Change',
      hidden: !detailGroup.isGroup,
      onClick: () => {
        inputUploadRef.current?.click();
      },
    },
    {
      icon: '',
      text: 'View',
      hidden: false,
      onClick: () => {
        setPreview(true);
      },
    },
  ];
  const handleUpdateNameGroup = async (data: IndexedObject) => {
    try {
      setLoading('change-name-group');
      await groupApi.updateGroup(currentGroup, data);
      queryClient.refetchQueries(queryKey.GET_GROUPS);
      getDetailGroup(currentGroup);
      setLoading('');
    } catch (err) {
      setLoading('');
    }
  };

  const handleUploadPhoto = async (e) => {
    try {
      const { files } = e.target;
      if (!files) {
        return;
      }
      setLoading('photo');
      const formUpload = new FormData();
      formUpload.append('image', files[0]);
      const res = await groupApi.changePhotoGroup(detailGroup.id ?? '', formUpload);
      queryClient.refetchQueries(queryKey.GET_GROUPS);
      getDetailGroup(currentGroup);
      setLoading('');
    } catch (err) {
      setLoading('');
    }
  };

  const handleLeaveGroup = async () => {
    try {
      setLoading('leave');
      await groupApi.leaveGroup(currentGroup);
      setLoading('');
      saveDetailGroup({});
      saveCurrentGroup('');
      history.push(pathHomePage);
      queryClient.refetchQueries(queryKey.GET_GROUPS);
    } catch (e) {
      setLoading('');
    }
  };

  const handleViewProfile = () => {
    if (detailGroup.isGroup) return;
    const friend = detailGroup.members?.find((e) => e.id !== currentUser.id);
    history.push(
      replacePathParams(pathProfileFriend, {
        userId: friend?.id ?? '',
      }),
    );
  };

  useClickOutSide({
    parentRef: sideChatRef,
    triggerRef: triggerSidechatRef,
    callback: onClose,
  });

  return {
    modal,
    loading,
    dataPopover,
    inputUploadRef,
    currentUser,
    preview,
    sideChatRef,
    handleLeaveGroup,
    handleViewProfile,
    setPreview,
    handleUploadPhoto,
    setModal,
    handleUpdateNameGroup,
  };
};
