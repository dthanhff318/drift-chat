import React, { useRef, useState } from 'react';
import s from './style.module.scss';
import { TGroup, TUser } from 'types/common';
import {
  CheckCircleOutlined,
  DeleteOutlined,
  PlusCircleFilled,
  TagOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import groupApi from 'app/axios/api/group';
import authStore from 'app/storeZustand/authStore';
import { getNameUser } from 'app/helpers/funcs';
import groupStore from 'app/storeZustand/groupStore';
import { notification } from 'antd';
import friendStore from 'app/storeZustand/friendStore';
import Avatar from 'app/components/Avatar/Avatar';
type Props = {
  detailGroup: TGroup;
};

const AddMember = ({ detailGroup }: Props) => {
  const { members, id, setting, admins } = detailGroup;
  const [users, setUsers] = useState<TUser[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const {
    dataCommunicate: { listFriend },
  } = friendStore();

  const { currenTUser } = authStore();

  const handleSelectUser = (user: TUser) => {
    const isUserHasSelect = users.find((e) => e.id === user.id);
    if (isUserHasSelect) {
      const filterList = users.filter((e) => e.id !== user.id);
      setUsers(filterList);
    } else {
      setUsers([...users, user]);
    }
  };
  const listMemberId = members?.map((e) => e.id);
  const listUserToAdd = listFriend?.filter((e) => !listMemberId?.includes(e.id));

  return (
    <div className={s.wrapper}>
      <div className={s.usersSelectWrap}>
        <div className={s.icAdd}>
          <PlusCircleFilled />
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
          {listUserToAdd?.map((user) => {
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

export default AddMember;
