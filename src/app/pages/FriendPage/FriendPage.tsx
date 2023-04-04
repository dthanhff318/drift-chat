import { SearchOutlined } from "@ant-design/icons";
import Avatar from "app/components/Avatar/Avatar";
import React from "react";
import s from "./style.module.scss";
import useService from "./service";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { TUSer } from "types/common";

type Props = {};

const FriendPage = (props: Props) => {
  const {} = useService();
  const { listAllUser } = useSelector((state: RootState) => state.services);
  console.log(moment(Date.now()).startOf("hour").fromNow());
  // console.log(listAllUser);
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
              {listAllUser.map((user: TUSer) => (
                <tr className={s.row}>
                  <td className={s.large}>
                    <div className={s.memberItem}>
                      <Avatar src={user.photoUrl} />
                      <span>{user.displayName}</span>
                    </div>
                  </td>
                  <td className={s.medium}>
                    {moment(user.lastActive).startOf("hour").fromNow()}
                  </td>
                  <td className={s.small}>
                    <button className={s.buttonAccept}>Add friend</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FriendPage;
