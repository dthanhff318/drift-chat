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
import groupStore from 'app/storeZustand/groupStore';
import { getNameAndAvatarChat } from 'app/helpers/funcs';
import authStore from 'app/storeZustand/authStore';
import { ArrowLeft } from 'lucide-react';

type Props = {
  infoUser: TUser;
};
const ChannelChat = ({ infoUser }: Props) => {
  const [modal, setModal] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const { saveGroups, groups } = groupStore();
  const { currentUser } = authStore();

  const handleClickInputSearch = () => {
    if (!searching) setSearching(true);
  };

  const handleCloseSearch = () => {
    setSearching(false);
  };
  const handleSearchGroup = (e) => {
    // const valueSearch = e.target.value;
    // const filterGroups = groups.filter((e) => {
    //   const { nameGroup } = getNameAndAvatarChat(e, currentUser.id ?? '');
    //   console.log(nameGroup);
    //   return nameGroup?.includes(valueSearch);
    // });
    // saveGroups(filterGroups);
  };
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
        <div className={s.searchWrapAndIcon}>
          {searching && (
            <ArrowLeft color="#fff" className={s.iconBack} onClick={handleCloseSearch} />
          )}
          <div className={s.searchWrap}>
            <SearchOutlined className={s.searchIcon} rev={undefined} />
            <input
              placeholder="Search or start new chat"
              type="text"
              className={s.searchInput}
              onChange={handleSearchGroup}
              onClick={handleClickInputSearch}
            />
          </div>
          <div className={s.listSearch}>
            {groups.map((e) => (
              <div className={s.searchItem}></div>
            ))}
          </div>
        </div>
        <div className={s.header}>
          <p className={s.status}>Online now</p>
          <p className={s.more}>
            <span>More</span>
            <RightOutlined rev={undefined} />
          </p>
        </div>
        <OnlineList />
        <div className={s.header}>
          <p className={s.status}>Messages</p>
          <div className={`${s.more} ${s.icon}`} onClick={() => setModal(true)}>
            <UsergroupAddOutlined rev={undefined} />
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
