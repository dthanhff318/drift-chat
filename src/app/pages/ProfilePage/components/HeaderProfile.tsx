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
          <span className={s.name}>Duy Thanh</span>
          <span className={s.joinAt}>18 Dec 2013</span>
          <div className={s.btnGroup}>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderProfile;
