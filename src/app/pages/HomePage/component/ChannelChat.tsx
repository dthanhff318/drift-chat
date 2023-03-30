import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import React from "react";
import s from "./style.module.scss";

type Props = {};

const ChannelChat = (props: Props) => {
  return (
    <div className={s.channelWrap}>
      <div className={s.myAccount}>
        <img
          className={s.avatar}
          src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
          alt=""
        />
        <div className={s.accountInfo}>
          <span className={s.name}>Duy THanh</span>
          <span className={s.status}>hello mgn</span>
        </div>
        <MoreOutlined className={s.moreBtn} />
      </div>
      <div className={s.searchWrap}>
        <SearchOutlined />
        <input type="text" />
      </div>
    </div>
  );
};

export default ChannelChat;
