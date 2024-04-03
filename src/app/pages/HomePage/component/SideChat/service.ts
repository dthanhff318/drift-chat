import groupApi from 'app/axios/api/group';
import { replacePathParams } from 'app/helpers/funcs';
import useClickOutSide from 'app/hook/useClickOutSide';
import { pathHomePage, pathProfileFriend } from 'app/routes/routesConfig';
import authStore from 'app/storeZustand/authStore';
import groupStore from 'app/storeZustand/groupStore';
import { queryKey } from 'const/reactQueryKey';
import { useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { IndexedObject, TGroupDetail } from 'types/common';

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
  const { saveCurrentGroup, currentGroup } = groupStore();
  const [loading, setLoading] = useState<TLoadingSideChat>('');
  const [modal, setModal] = useState<TModalSideChat>('');
  const [preview, setPreview] = useState<boolean>(false);
  const inputUploadRef = useRef<HTMLInputElement>(null);
  const sideChatRef = useRef<HTMLDivElement>(null);

  const detailGroupQuery = queryClient.getQueryData<{ data: TGroupDetail }>(
    `${queryKey.GET_DETAIL_GROUP}_${currentGroup}`,
  );
  const detailGroup = detailGroupQuery?.data ?? {};
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
      queryClient.refetchQueries(`${queryKey.GET_DETAIL_GROUP}_${currentGroup}`);
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
      const res = await groupApi.changePhotoGroup(currentGroup ?? '', formUpload);
      queryClient.refetchQueries(queryKey.GET_GROUPS);
      queryClient.refetchQueries(`${queryKey.GET_DETAIL_GROUP}_${currentGroup}`);
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
