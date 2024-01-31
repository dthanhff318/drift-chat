import { SketchOutlined } from '@ant-design/icons';
import {
  pathFriendPage,
  pathHomePage,
  pathProfile,
  pathSettingsPage,
} from 'app/routes/routesConfig';
import { Home, MessagesSquare, RadioTower, Settings } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './style.module.scss';

const Sidebar = () => {
  return (
    <aside className={s.sideBarWrap}>
      <div className={s.logo}>
        <SketchOutlined className={s.logoIcon} rev={undefined} />
      </div>
      <div className={s.navOptions}>
        <NavLink to={pathHomePage} className={s.btnNav} activeClassName={s.active}>
          <MessagesSquare color="#ffffff" size={24} />
        </NavLink>
        <NavLink exact to={pathFriendPage} className={s.btnNav} activeClassName={s.active}>
          <RadioTower color="#ffffff" size={24} />
        </NavLink>
        <NavLink to={pathProfile} className={s.btnNav} activeClassName={s.active}>
          <Home color="#ffffff" size={24} />
        </NavLink>
        <NavLink exact to={pathSettingsPage} className={s.btnNav} activeClassName={s.active}>
          <Settings color="#ffffff" size={24} />
        </NavLink>
      </div>
      <div className={s.user}></div>
    </aside>
  );
};

export default Sidebar;
