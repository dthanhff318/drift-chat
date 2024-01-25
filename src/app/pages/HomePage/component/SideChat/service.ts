import groupApi from 'app/axios/api/group';
import useClickOutSide from 'app/hook/useClickOutSide';
import authStore from 'app/storeZustand/authStore';
import groupStore from 'app/storeZustand/groupStore';
import { useEffect, useRef, useState } from 'react';
import { IndexedObject } from 'types/common';

type TModalSideChat = '' | 'change-name-group' | 'change-theme' | 'list-member' | 'add-member';
type TLoadingSideChat = '' | 'change-name-group' | 'photo';

type Props = {
  triggerSidechatRef: any;
  onClose: () => void;
};

export const useService = ({ triggerSidechatRef, onClose }: Props) => {
  const { currenTUser } = authStore();
  const { getGroups, getDetailGroup, currentGroup, detailGroup } = groupStore();
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
      getGroups();
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
      getGroups();
      getDetailGroup(currentGroup);
      setLoading('');
    } catch (err) {
      setLoading('');
    }
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
    currenTUser,
    preview,
    sideChatRef,
    setPreview,
    handleUploadPhoto,
    setModal,
    handleUpdateNameGroup,
  };
};
