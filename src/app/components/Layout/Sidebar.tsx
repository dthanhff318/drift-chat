import { SketchOutlined } from '@ant-design/icons';
import authApi from 'app/axios/api/auth';
import { auth } from 'app/firebase/configFirebase';
import { getRefreshTokenFromLocalStorage } from 'app/helpers/localStorage';
import {
  pathExtendPage,
  pathFriendPage,
  pathHomePage,
  pathObj,
  pathProfile,
} from 'app/routes/routesConfig';
import authStore from 'app/storeZustand/authStore';
import { signOut } from 'firebase/auth';
import { Blocks, Home, MessagesSquare, PowerCircle, RadioTower } from 'lucide-react';
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import ModalCommon from '../Modal/Modal';
import s from './style.module.scss';

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
        history.push(pathObj.loginPage);
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
        desc="Are you want to exit ?"
      />
    </aside>
  );
};

export default Sidebar;
