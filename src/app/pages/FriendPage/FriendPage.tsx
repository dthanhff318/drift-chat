import { SearchOutlined } from "@ant-design/icons";
import Avatar from "app/components/Avatar/Avatar";
import React from "react";
import s from "./style.module.scss";
import useService from "./service";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { TUSer } from "types/common";
import { convertDiffTime } from "app/helpers/funcs";
import MyFriendControl from "./MyFriendControl";

type Props = {};

const FriendPage = (props: Props) => {
  const { handleAddFriend, currentUser } = useService();
  const { listAllUser, listRequest } = useSelector(
    (state: RootState) => state.services
  );

  return (
    <div className={s.frWrapper}>
      <div className={s.memberGroupWrapper}>
        <div className={s.memberSearch}>
          <div className={s.searchForm}>
            <input type="text" className={s.searchInput} />
            <div className={s.btnSearch}>
              <SearchOutlined />
            </div>
          </div>
        </div>
        <div className={s.memberList}>
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
              {listAllUser
                .filter((e) => e.id !== currentUser.id)
                .map((user: TUSer) => (
                  <tr key={user.id} className={s.row}>
                    <td className={s.large}>
                      <div className={s.memberItem}>
                        <Avatar src={user.photoUrl} />
                        <span>{user.displayName}</span>
                      </div>
                    </td>
                    <td className={s.medium}>
                      {convertDiffTime((user.lastActive ?? "").toString())}
                    </td>
                    <td className={s.small}>
                      <button
                        onClick={() => handleAddFriend(user.id ?? "")}
                        className={s.buttonAccept}
                      >
                        {listRequest.find((u) => u === user.id)
                          ? "Cancel"
                          : "Add"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <MyFriendControl />
    </div>
  );
};

export default FriendPage;
