import React from "react";
import {
  MessageOutlined,
  SettingOutlined,
  SketchOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import s from "./style.module.scss";
import { NavLink } from "react-router-dom";
import {
  pathFriendPage,
  pathHomePage,
  pathSettingsPage,
} from "app/routes/routesConfig";
type Props = {};

const Sidebar = (props: Props) => {
  return (
    <aside className={s.sideBarWrap}>
      <div className={s.logo}>
        <SketchOutlined className={s.logoIcon} />
      </div>
      <div className={s.navOptions}>
        <NavLink
          exact
          to={pathHomePage}
          className={s.btnNav}
          activeClassName={s.active}
        >
          <MessageOutlined />
        </NavLink>
        <NavLink
          exact
          to={pathFriendPage}
          className={s.btnNav}
          activeClassName={s.active}
        >
          <UsergroupDeleteOutlined />
        </NavLink>
        <NavLink
          exact
          to={pathSettingsPage}
          className={s.btnNav}
          activeClassName={s.active}
        >
          <SettingOutlined />
        </NavLink>
      </div>
      <div className={s.user}></div>
    </aside>
  );
};

export default Sidebar;
