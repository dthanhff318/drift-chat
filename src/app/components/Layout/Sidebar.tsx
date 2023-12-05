import React from "react";
import {
  MessageOutlined,
  SettingOutlined,
  SketchOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import c from "clsx";
import s from "./style.module.scss";
import { NavLink } from "react-router-dom";
import {
  pathFriendPage,
  pathHomePage,
  pathSettingsPage,
} from "app/routes/routesConfig";
import { getUserFromLs } from "app/helpers/localStorage";
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
          className={c(s.btnNav)}
          activeClassName={s.active}
        >
          <MessageOutlined />
        </NavLink>
        <NavLink
          exact
          to={pathFriendPage}
          className={c(s.btnNav)}
          activeClassName={s.active}
        >
          <UsergroupDeleteOutlined />
        </NavLink>
        <NavLink
          exact
          to={pathSettingsPage}
          className={c(s.btnNav)}
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
