import { PlusCircleFilled } from '@ant-design/icons';
import Avatar from 'app/components/Avatar/Avatar';
import { queryKey } from 'const/reactQueryKey';
import React, { useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import { TDataCommunicate, TUser } from 'types/common';
import s from './style.module.scss';
type Props = {
  onClose: () => void;
};

const ModalMemberList = ({ onClose }: Props) => {
  const queryClient = useQueryClient();

  const dataCommunicateQuery = queryClient.getQueryData<{ data: TDataCommunicate }>(
    queryKey.DATA_COMMUNICATE,
  );
  const { listFriend } = dataCommunicateQuery?.data ?? {};

  const [users, setUsers] = useState<TUser[]>([]);
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
    </div>
  );
};

export default ModalMemberList;
