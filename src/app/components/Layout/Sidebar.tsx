import { SketchOutlined } from '@ant-design/icons';
import {
  pathFriendPage,
  pathHomePage,
  pathLoginPage,
  pathProfile,
  pathExtendPage,
} from 'app/routes/routesConfig';
import { Blocks, Home, MessagesSquare, PowerCircle, RadioTower, Settings } from 'lucide-react';
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import s from './style.module.scss';
import ModalCommon from '../Modal/Modal';
import authStore from 'app/storeZustand/authStore';
import { getRefreshTokenFromLocalStorage } from 'app/helpers/localStorage';
import authApi from 'app/axios/api/auth';
import { signOut } from 'firebase/auth';
import { auth } from 'app/firebase/configFirebase';

const Sidebar = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { logout } = authStore();
  const history = useHistory();
  const handleLogout = async () => {
    try {
      setLoading(true);
      const refreshToken = getRefreshTokenFromLocalStorage();
      await authApi.logout(refreshToken ?? '');
      await signOut(auth).then(() => {
        logout();
        history.push(pathLoginPage);
      });
      localStorage.clear();
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
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
        <NavLink exact to={pathExtendPage} className={s.btnNav} activeClassName={s.active}>
          <Blocks color="#ffffff" size={24} />
        </NavLink>
        <div className={s.btnNav} onClick={() => setModal(true)}>
          <PowerCircle />
        </div>
      </div>
      <div className={s.user}></div>
      <ModalCommon
        open={modal}
        title="Logout"
        onCancel={() => setModal(false)}
        onConfirm={handleLogout}
        loading={loading}
        desc="Are you want to exit?"
      ></ModalCommon>
    </aside>
  );
};

export default Sidebar;
