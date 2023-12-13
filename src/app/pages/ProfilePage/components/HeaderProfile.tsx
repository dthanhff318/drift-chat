import {
  CopyOutlined,
  FacebookFilled,
  SkypeFilled,
  UserAddOutlined,
} from "@ant-design/icons";
import Button from "app/components/Button/Button";
import { url } from "inspector";
import React from "react";
import s from "../style.module.scss";
type Props = {};

const HeaderProfile = (props: Props) => {
  return (
    <div
      className={s.headerProfile}
      style={{
        backgroundImage: `url("https://genk.mediacdn.vn/2017/1-2-1488180942287.jpg")`,
      }}
    >
      <div className={s.userInfo}>
        <img
          src="https://img-cdn.2game.vn/pictures/xemgame/2018/10/24/665ad696-khazix-2.jpg"
          className={s.avatarProfile}
          alt=""
        />
        <div className={s.detailInfo}>
          <p className={s.name}>
            Duy Thanh{" "}
            <span className={s.idValue}>
              #4vb5d4 <CopyOutlined className={s.idCopy} />
            </span>
          </p>
          <span className={s.joinAt}>18 Dec 2013</span>
          <div className={s.btnGroup}>
            <Button
              icon={<UserAddOutlined />}
              fill={true}
              text={"Add Friend"}
            />
            <Button text={"Delete"} />
          </div>
        </div>
      </div>
      <div className={s.socialLink}>
        <div className={s.socialItem}>
          <FacebookFilled
            style={{
              color: "#0088cb",
            }}
          />
        </div>
        <div className={s.socialItem}>
          <SkypeFilled
            style={{
              color: "#319fd5",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderProfile;
