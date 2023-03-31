import React from "react";
import { RightOutlined } from "@ant-design/icons";
import Avatar from "app/components/Avatar/Avatar";
import s from "./style.module.scss";
type Props = {};

const OnlineList = (props: Props) => {
  return (
    <div className={s.onlineListWrap}>
      <div className={s.list}>
        {Array(8)
          .fill(1)
          .map((e) => (
            <div className={s.itemUser}>
              <Avatar />
              <span className={s.userName}>Smaple</span>
            </div>
          ))}
        <Avatar />
      </div>
    </div>
  );
};

export default OnlineList;
