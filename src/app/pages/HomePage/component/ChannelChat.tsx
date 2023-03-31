import React from "react";
import { MoreOutlined, RightOutlined, SearchOutlined } from "@ant-design/icons";
import s from "./style.module.scss";
import OnlineList from "./OnlineList";
import MessageChatList from "./MessageChatList";

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
        <SearchOutlined className={s.searchIcon} />
        <input
          placeholder="Search or start new chat"
          type="text"
          className={s.searchInput}
        />
      </div>
      <div className={s.header}>
        <p className={s.status}>Online now</p>
        <p className={s.more}>
          <span>More</span>
          <RightOutlined />
        </p>
      </div>
      <OnlineList />
      <div className={s.header}>
        <p className={s.status}>Messages</p>
        <span className={s.msgCount}>20</span>
      </div>
      <MessageChatList />
    </div>
  );
};

export default ChannelChat;
