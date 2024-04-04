import { RightOutlined, SearchOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import Avatar from 'app/components/Avatar/Avatar';
import ModalCommon from 'app/components/Modal/Modal';
import PopoverCustom from 'app/components/Popover/Popover';
import { getNameAndAvatarChat, replacePathParams } from 'app/helpers/funcs';
import { pathHomePageChat } from 'app/routes/routesConfig';
import authStore from 'app/storeZustand/authStore';
import { queryKey } from 'const/reactQueryKey';
import { Annoyed, ArrowLeft } from 'lucide-react';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { TGroup, TUser } from 'types/common';
import MessageChatList from './MessageChatList/MessageChatList';
import ModalCreateGroup from './ModalCreateGroup/ModalCreateGroup';
import OnlineList from './OnlineList';
import s from './style.module.scss';

type Props = {
  infoUser: TUser;
};
const ChannelChat = ({ infoUser }: Props) => {
  const queryClient = useQueryClient();
  const dataGroupsQuery = queryClient.getQueryData<{ data: TGroup[] }>(queryKey.GET_GROUPS, {});
  const groups = dataGroupsQuery?.data ?? [];

  const history = useHistory();
  const [modal, setModal] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);

  const { currentUser } = authStore();
  const [groupSearch, setGroupSearch] = useState<TGroup[]>(groups);

  const handleClickInputSearch = () => {
    if (!searching) setSearching(true);
  };

  const handleCloseSearch = () => {
    setSearching(false);
  };
  const handleSearchGroup = (e) => {
    const valueSearch = e.target.value;
    const filterGroups = groups.filter((e) => {
      const { nameGroup } = getNameAndAvatarChat(e, currentUser.id ?? '');
      return nameGroup?.includes(valueSearch);
    });
    setGroupSearch(filterGroups);
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
              <div className={s.searchItem} key={e.id}></div>
            ))}
          </div>
        </div>
        {!searching && (
          <>
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
          </>
        )}

        {searching && (
          <>
            <div className={s.header}>
              <p className={s.status}>User</p>
            </div>
            <div className={s.userSearchWrap}>
              {groupSearch
                .filter((e) => !e.isGroup)
                .map((g) => {
                  const { nameGroup, avatarGroup } = getNameAndAvatarChat(g, currentUser.id ?? '');
                  return (
                    <div className={s.userSearch} key={g.id}>
                      <Avatar src={avatarGroup} />
                      <p className={s.name}>{nameGroup}</p>
                    </div>
                  );
                })}
            </div>
            <div className={s.header}>
              <p className={s.status}>Group</p>
            </div>
            <div className={s.userSearchWrap}>
              {groupSearch
                .filter((e) => e.isGroup)
                .map((g) => {
                  const { nameGroup, avatarGroup } = getNameAndAvatarChat(g, currentUser.id ?? '');
                  return (
                    <div className={s.userSearch} key={g.id}>
                      <Avatar src={avatarGroup} />
                      <p className={s.name}>{nameGroup}</p>
                    </div>
                  );
                })}
            </div>
          </>
        )}
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
