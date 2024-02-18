import { PlusCircleFilled } from '@ant-design/icons';
import Avatar from 'app/components/Avatar/Avatar';
import authStore from 'app/storeZustand/authStore';
import friendStore from 'app/storeZustand/friendStore';
import React, { useRef, useState } from 'react';
import { TGroupDetail, TUser } from 'types/common';
import s from './style.module.scss';
import groupApi from 'app/axios/api/group';
import Button from 'app/components/Button/Button';
import groupStore from 'app/storeZustand/groupStore';
type Props = {
  detailGroup: TGroupDetail;
  onClose: () => void;
};

const AddMember = ({ detailGroup, onClose }: Props) => {
  const { members, id } = detailGroup;
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    dataCommunicate: { listFriend },
  } = friendStore();
  const { getDetailGroup } = groupStore();

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

  const handleAddMemberToGroup = async () => {
    try {
      const listMemberAdd = users.map((e) => e.id ?? '');
      if (!id || !listMemberAdd.length) return;
      setLoading(true);
      await groupApi.addMember({
        idGroup: id,
        members: listMemberAdd,
      });
      getDetailGroup(id);
      onClose();
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <div className={s.wrapper}>
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
      <div className={s.btnBottom}>
        <Button text="Add" onClick={handleAddMemberToGroup} loading={loading} />
      </div>
    </div>
  );
};

export default AddMember;
