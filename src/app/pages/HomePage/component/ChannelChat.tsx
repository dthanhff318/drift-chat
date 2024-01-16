import React, { useState } from 'react';
import {
  MoreOutlined,
  RightOutlined,
  SearchOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import s from './style.module.scss';
import OnlineList from './OnlineList';
import { TUser } from 'types/common';
import Avatar from 'app/components/Avatar/Avatar';
import MessageChatList from './MessageChatList/MessageChatList';
import ModalCommon from 'app/components/Modal/Modal';
import ModalCreateGroup from './ModalCreateGroup/ModalCreateGroup';

type Props = {
  infoUser: TUser;
};
const ChannelChat = ({ infoUser }: Props) => {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <>
      <div className={s.channelWrap}>
        <div className={s.myAccount}>
          <Avatar src={infoUser?.photoUrl} />
          <div className={s.accountInfo}>
            <span className={s.name}>{infoUser?.displayName}</span>
            <span className={s.status}>{infoUser?.introduction}</span>
          </div>
        </div>
        <div className={s.searchWrap}>
          <SearchOutlined className={s.searchIcon} />
          <input placeholder="Search or start new chat" type="text" className={s.searchInput} />
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
          <div className={`${s.more} ${s.icon}`} onClick={() => setModal(true)}>
            <UsergroupAddOutlined />
          </div>
        </div>
        <MessageChatList />
      </div>
      <ModalCommon
        title="Create group chat with ..."
        open={modal}
        onCancel={() => {
          setModal(false);
        }}
        hideFooter
      >
        <ModalCreateGroup
          onClose={() => {
            setModal(false);
          }}
        />
      </ModalCommon>
    </>
  );
};

export default ChannelChat;
