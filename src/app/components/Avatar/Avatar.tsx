import React from "react";
import s from "./style.module.scss";
type Props = {};

const Avatar = (props: Props) => {
  return (
    <div className={s.avatarWrapper}>
      <img
        src="https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg"
        alt=""
      />
      <div className={s.tag}>
        <span className={s.online}></span>
      </div>
    </div>
  );
};

export default Avatar;
