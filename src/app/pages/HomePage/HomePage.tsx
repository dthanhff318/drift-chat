import React from "react";
import s from "./style.module.scss";
type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.sideChat}>
        <ul className={s.listChat}>
          <li className={s.chatItem}>
            <img
              src="https://udayananetworking.unud.ac.id/assets/frontend/images/user-m.png"
              alt=""
              className={s.avtUser}
            />
            <div className={s.infoUser}>
              <p className={s.name}>chat</p>
              <p className={s.message}>
                Ban : xin chao moi nguoi toi la tizz dep try skd sieu dinh
              </p>
            </div>
          </li>
          <li className={s.chatItem}>
            <p>chat</p>
          </li>
          <li className={s.chatItem}>
            <p>chat</p>
          </li>
          <li className={s.chatItem}>
            <p>chat</p>
          </li>
        </ul>
      </div>
      <div className={s.contentChat}></div>
    </div>
  );
};

export default HomePage;
