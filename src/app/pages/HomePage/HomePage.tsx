import React from "react";
import s from "./style.module.scss";
type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.sideChat}>
        <ul className={s.listChat}>
          {Array(20)
            .fill(1)
            .map(() => (
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
            ))}
        </ul>
      </div>
      <div className={s.contentChat}>
        <div className={s.messageList}></div>
        <div className={s.inputWrap}>
          <input type="text" className={s.inputMess} />
          <span className={s.btnSend}>Send</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
