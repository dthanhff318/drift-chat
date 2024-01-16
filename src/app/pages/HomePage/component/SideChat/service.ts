import groupApi from 'app/axios/api/group';
import groupStore from 'app/storeZustand/groupStore';
import { useRef, useState } from 'react';
import { IndexedObject } from 'types/common';

type TModalSideChat = '' | 'change-name-group' | 'list-member' | 'add-member';
type TLoadingSideChat = '' | 'change-name-group' | 'photo';

export const useService = () => {
  const { getGroups, getDetailGroup, currentGroup, detailGroup } = groupStore();
  const [loading, setLoading] = useState<TLoadingSideChat>('');
  const [modal, setModal] = useState<TModalSideChat>('');
  const inputUploadRef = useRef<HTMLInputElement>(null);

  const dataPopover = [
    {
      icon: '',
      text: 'Change',
      hidden: false,
      onClick: () => {
        inputUploadRef.current?.click();
      },
    },
    {
      icon: '',
      text: 'View',
      hidden: false,
      onClick: () => {
        // deleteMessage(mess);
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
      setLoading('');
    } catch (err) {
      setLoading('');
    }
  };

  return {
    modal,
    loading,
    dataPopover,
    inputUploadRef,
    handleUploadPhoto,
    setModal,
    handleUpdateNameGroup,
  };
};
