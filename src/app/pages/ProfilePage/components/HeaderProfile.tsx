import {
  AppstoreOutlined,
  CopyOutlined,
  FacebookFilled,
  SkypeFilled,
  UserAddOutlined,
} from "@ant-design/icons";
import Button from "app/components/Button/Button";
import { getPublicImageUrl } from "app/helpers/funcs";
import { url } from "inspector";
import React from "react";
import s from "../style.module.scss";
import { TUSer } from "types/common";
type Props = {
  user: TUSer;
};

const HeaderProfile = ({ user }: Props) => {
  return (
    <div
      className={s.headerProfile}
      style={{
        backgroundImage: `url("https://genk.mediacdn.vn/2017/1-2-1488180942287.jpg")`,
      }}
    >
      <div className={s.userInfo}>
        <img src={user.photoUrl} className={s.avatarProfile} alt="" />
        <div className={s.detailInfo}>
          <p className={s.name}>
            {user.displayName}
            <span className={s.idValue}>
              {user.uid} <CopyOutlined className={s.idCopy} />
            </span>
          </p>
          <div className={s.coinWrap}>
            <img
              src={getPublicImageUrl("coin-drift.png")}
              className={s.coinImg}
              alt=""
            />
            <span>{user.coin}</span>
          </div>
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
      <div className={s.iconGallery}>
        <AppstoreOutlined />
      </div>
    </div>
  );
};

export default HeaderProfile;
