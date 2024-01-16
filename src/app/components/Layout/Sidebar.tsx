import {
  MessageOutlined,
  SettingOutlined,
  SketchOutlined,
  SmileOutlined,
  UsergroupDeleteOutlined,
} from '@ant-design/icons';
import {
  pathFriendPage,
  pathHomePage,
  pathProfile,
  pathSettingsPage,
} from 'app/routes/routesConfig';
import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './style.module.scss';

const Sidebar = () => {
  return (
    <aside className={s.sideBarWrap}>
      <div className={s.logo}>
        <SketchOutlined className={s.logoIcon} />
      </div>
      <div className={s.navOptions}>
        <NavLink exact to={pathHomePage} className={s.btnNav} activeClassName={s.active}>
          <MessageOutlined />
        </NavLink>
        <NavLink exact to={pathFriendPage} className={s.btnNav} activeClassName={s.active}>
          <UsergroupDeleteOutlined />
        </NavLink>
        <NavLink exact to={pathProfile} className={s.btnNav} activeClassName={s.active}>
          <SmileOutlined />
        </NavLink>
        <NavLink exact to={pathSettingsPage} className={s.btnNav} activeClassName={s.active}>
          <SettingOutlined />
        </NavLink>
      </div>
      <div className={s.user}></div>
    </aside>
  );
};

export default Sidebar;
