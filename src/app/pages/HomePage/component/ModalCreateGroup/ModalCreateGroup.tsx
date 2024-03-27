import { PlusCircleFilled } from '@ant-design/icons';
import groupApi from 'app/axios/api/group';
import Avatar from 'app/components/Avatar/Avatar';
import Button from 'app/components/Button/Button';
import friendStore from 'app/storeZustand/friendStore';
import React, { useRef, useState } from 'react';
import { TUser, TDataCommunicate, TGroup } from 'types/common';
import s from './style.module.scss';
import groupStore from 'app/storeZustand/groupStore';
import { useQueryClient } from 'react-query';
import { queryKey } from 'const/reactQueryKey';
import { notification } from 'antd';
import socketStore from 'app/storeZustand/socketStore';
import { socketEmit } from 'const/socket';
type Props = {
  onClose: () => void;
};

const ModalCreateGroup = ({ onClose }: Props) => {
  const queryClient = useQueryClient();
  const dataCommunicateQuery = queryClient.getQueryData<{ data: TDataCommunicate }>(
    queryKey.DATA_COMMUNICATE,
  );

  const { listFriend } = dataCommunicateQuery?.data ?? {};
  const { getGroups } = groupStore();
  const { socket } = socketStore();

  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const inputNameRef = useRef<HTMLInputElement>(null);

  const handleSelectUser = (user: TUser) => {
    const isUserHasSelect = users.find((e) => e.id === user.id);
    if (isUserHasSelect) {
      const filterList = users.filter((e) => e.id !== user.id);
      setUsers(filterList);
    } else {
      setUsers([...users, user]);
    }
  };

  const handleCreateGroup = async () => {
    try {
      const listIdMember = users.map((e) => e.id);
      if (!listIdMember.length) {
        notification.error({
          message: 'At least one user choosed',
        });
        return;
      }
      setLoading(true);
      const dataGroup = {
        name: inputNameRef.current?.value,
        membersId: listIdMember,
      };
      const res = await groupApi.createGroup(dataGroup);
      const newGroup = res.data as TGroup;
      socket?.emit(socketEmit.CREATE_GROUP, { groupId: newGroup.id, members: newGroup.members });
      getGroups();
      setLoading(false);
      onClose();
    } catch (e) {
      setLoading(false);
    }
  };
  return (
    <div className={s.wrapper}>
      <input ref={inputNameRef} type="text" className={s.inputName} placeholder="Group name ..." />
      <div className={s.usersSelectWrap}>
        <div className={s.icAdd}>
          <PlusCircleFilled rev={undefined} />
        </div>
        <div className={s.users}>
          {users?.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoUrl} />
            </div>
          ))}
          {users && users?.length > 6 ? <Avatar text={(users?.length - 6).toString()} /> : <></>}
        </div>
      </div>
      <div className={s.searchUserWrap}>
        <input type="text" className={s.inputSearch} placeholder="Name..." />
        <div className={s.usersToChoose}>
          {listFriend?.map((user) => {
            const isUserSelected = !!users.find((e) => e.id === user.id);
            return (
              <div
                key={user.id}
                className={`${s.userItem} ${isUserSelected ? s.active : ''}`}
                onClick={() => handleSelectUser(user)}
              >
                <div className={s.userInfoWrap}>
                  <Avatar src={user.photoUrl} />
                  <p className={s.userName}>{user.displayName}</p>
                </div>
                <input
                  type="checkbox"
                  className={s.inputCheck}
                  checked={isUserSelected}
                  onChange={() => handleSelectUser(user)}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className={s.footer}>
        <Button text="Cancel" onClick={onClose} />
        <Button text="Create" loading={loading} onClick={() => handleCreateGroup()} />
      </div>
    </div>
  );
};

export default ModalCreateGroup;
