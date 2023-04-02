import React from "react";
import {
  MessageOutlined,
  SettingOutlined,
  SketchOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import c from "clsx";
import s from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { ENav } from "enums";
import { changeNav } from "./layoutSlice/layoutSlice";
import { NavLink } from "react-router-dom";
import {
  pathFriendPage,
  pathHomePage,
  pathSettingsPage,
} from "app/routes/routesConfig";
type Props = {};

const Sidebar = (props: Props) => {
  const dispatch = useDispatch();
  const { nav } = useSelector((state: RootState) => state.layout);
  const onChangeNav = (nav: ENav) => dispatch(changeNav(nav));
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
