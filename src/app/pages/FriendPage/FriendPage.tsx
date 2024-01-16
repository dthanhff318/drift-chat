import { SearchOutlined } from '@ant-design/icons';
import Avatar from 'app/components/Avatar/Avatar';
import { convertDiffTime } from 'app/helpers/funcs';
import React from 'react';
import { TUser } from 'types/common';
import MyFriendControl from './MyFriendControl';
import useService from './service';
import s from './style.module.scss';
import Loading from 'app/components/Loading/Loading';
import { EFriendLoading } from 'app/storeZustand/servicesStore';

const FriendPage = () => {
  const {
    dataCommunicate,
    lisTUser,
    searchValue,
    currenTUser,
    loadingFriendPage,
    setSearchValue,
    handleAddFriend,
    handleSearchUser,
  } = useService();

  return (
    <div className={s.frWrapper}>
      <div className={s.memberGroupWrapper}>
        <div className={s.memberSearch}>
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
              <SearchOutlined />
            </div>
          </div>
        </div>
        <div className={s.memberList}>
          <Loading loading={loadingFriendPage === EFriendLoading.LIST} fullScreen={false} />
          <table className={s.memberTable}>
            <thead className={s.tableHead}>
              <th>Name</th>
              <th>
                <div className={s.thWrap}>
                  <p>Status</p>
                  <span className={s.arrowBtn}></span>
                </div>
              </th>
              <th>Action</th>
            </thead>
            <tbody className={s.tableBody}>
              {lisTUser
                .filter((e) => e.id !== currenTUser.id)
                .map((user: TUser) => {
                  const alreadyFriend = dataCommunicate.listFriend?.find((f) => f.id === user.id);
                  return (
                    <tr key={user.id} className={s.row}>
                      <td className={s.large}>
                        <div className={s.memberItem}>
                          <Avatar src={user.photoUrl} />
                          <span>{user.displayName}</span>
                        </div>
                      </td>
                      <td className={s.medium}>
                        {convertDiffTime((user.lastActive ?? '').toString())}
                      </td>
                      <td className={s.small}>
                        {alreadyFriend ? (
                          <></>
                        ) : (
                          <button
                            onClick={() => handleAddFriend(user.id ?? '')}
                            className={s.buttonAccept}
                          >
                            Add
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <MyFriendControl />
    </div>
  );
};

export default FriendPage;
