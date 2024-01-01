import { PlusCircleFilled } from "@ant-design/icons";
import React, { useState } from "react";
import s from "./style.module.scss";
import Avatar from "app/components/Avatar/Avatar";
import friendStore from "app/storeZustand/friendStore";
import { TGroup, TUser } from "types/common";
import groupApi from "app/axios/api/group";
import Button from "app/components/Button/Button";
type Props = {};

const ModalCreateGroup = ({}: Props) => {
  const {
    dataCommunicate: { listFriend },
  } = friendStore();

  const [users, setUsers] = useState<TUser[]>([]);

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
    const dataGroup = {
      name: "",
      membersId: users.map((e) => e.id),
    };
    console.log(1);

    const res = await groupApi.createGroup(dataGroup);
    console.log(res);
  };

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
          {users && users?.length > 6 ? (
            <Avatar text={(users?.length - 6).toString()} />
          ) : (
            <></>
          )}
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
                className={`${s.userItem} ${isUserSelected ? s.active : ""}`}
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
        <Button text="Cancel" />
        <Button text="Create" onClick={() => handleCreateGroup()} />
      </div>
    </div>
  );
};

export default ModalCreateGroup;
