import Avatar from 'app/components/Avatar/Avatar';
import Button from 'app/components/Button/Button';
import Loading from 'app/components/Loading/Loading';
import { convertDiffTime } from 'app/helpers/funcs';
import { EFriendLoading } from 'app/storeZustand/servicesStore';
import { EFriendStatus } from 'enums';
import { LucideArrowLeft, Search, Vibrate } from 'lucide-react';
import React from 'react';
import { TUser } from 'types/common';
import useService from './service';
import s from './style.module.scss';

const FriendPage = () => {
  const {
    dataCommunicate,
    listUser,
    searchValue,
    currentUser,
    loadingFriendPage,
    usersLoading,
    showApprove,
    setShowApprove,
    setSearchValue,
    handleFriendRequest,
    handleSearchUser,
    checkStatusFriend,
    handleGoToProfileFriend,
    handleClickShowApproval,
  } = useService();

  const listAcceptLength = dataCommunicate.listAccept?.length ?? 0;
  console.log(listAcceptLength);

  return (
    <div className={s.frWrapper}>
      <div className={s.memberGroupWrapper}>
        <div className={s.memberSearch}>
          {showApprove ? (
            <LucideArrowLeft size={26} color="#fff" onClick={() => setShowApprove(false)} />
          ) : (
            <div className={s.notiApprove} onClick={handleClickShowApproval}>
              <Vibrate size={26} color="#fff" />
              {listAcceptLength > 0 && (
                <span className={s.count}>{listAcceptLength > 99 ? `99+` : listAcceptLength}</span>
              )}
            </div>
          )}
          {showApprove ? (
            <p className={s.friendRequestTitle}>Friend request</p>
          ) : (
            <div className={s.searchForm}>
              <input
                type="text"
                className={s.searchInput}
                placeholder="Enter name of user"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchUser()}
              />
              <div className={s.btnSearch} onClick={handleSearchUser}>
                <Search size={24} />
              </div>
            </div>
          )}
        </div>
        <div className={s.memberList}>
          <Loading loading={loadingFriendPage === EFriendLoading.LIST} fullScreen={false} />
          <table className={s.memberTable}>
            <thead className={s.tableHead}>
              <th>Name</th>
              <th>UID</th>
              <th>
                <div className={s.thWrap}>
                  <p>Status</p>
                </div>
              </th>
              <th>Action</th>
            </thead>
            <tbody className={s.tableBody}>
              {(showApprove ? dataCommunicate.listAccept ?? [] : listUser)
                .filter((e) => e.id !== currentUser.id)
                .map((user: TUser) => {
                  const statusFriend = checkStatusFriend(dataCommunicate, user);
                  return (
                    <tr key={user.id} className={s.row}>
                      <td className={s.large}>
                        <div
                          className={s.memberItem}
                          onClick={() => handleGoToProfileFriend(user.id ?? '')}
                        >
                          <Avatar src={user.photoUrl} />
                          <span>{user.displayName}</span>
                        </div>
                      </td>
                      <td className={s.inviteId}>{user.inviteId}</td>
                      <td className={s.medium}>
                        {user.isOnline
                          ? 'Online'
                          : convertDiffTime((user.lastActive ?? '').toString())}
                      </td>
                      <td className={s.small}>
                        <div className={s.btnWrap}>
                          {statusFriend !== EFriendStatus.Friend && (
                            <Button
                              text={statusFriend}
                              loading={usersLoading.includes(user.id ?? '')}
                              onClick={() => handleFriendRequest(user, statusFriend)}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FriendPage;
