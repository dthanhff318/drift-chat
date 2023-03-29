import React from "react";
import {
  MessageOutlined,
  SettingOutlined,
  SketchOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import c from "clsx";
import s from "./style.module.scss";
type Props = {};

const Sidebar = (props: Props) => {
  return (
    <aside className={s.sideBarWrap}>
      <div className={s.logo}>
        <SketchOutlined className={s.logoIcon} />
      </div>
      <div className={s.navOptions}>
        <MessageOutlined className={c(s.btnNav, s.active)} />
        <UsergroupDeleteOutlined className={s.btnNav} />
        <SettingOutlined className={s.btnNav} />
      </div>
      <div className={s.user}></div>
    </aside>
  );
};

export default Sidebar;
