import { PlusCircleFilled } from "@ant-design/icons";
import React from "react";
import s from "./style.module.scss";
import Avatar from "app/components/Avatar/Avatar";
type Props = {};

const ModalCreateGroup = ({}: Props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.usersSelectWrap}>
        <div className={s.icAdd}>
          <PlusCircleFilled />
        </div>
        <div className={s.users}>
          {Array(7)
            .fill(null)
            .map(() => (
              <Avatar />
            ))}
          <Avatar text={"+8"} />
        </div>
      </div>
      <div className={s.searchUserWrap}>
        <input type="text" />
      </div>
    </div>
  );
};

export default ModalCreateGroup;
