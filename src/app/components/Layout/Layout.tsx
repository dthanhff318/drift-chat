import React, { ReactNode, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import ModalCommon from "app/components/Modal/Modal";
import useServices from "./service";
import s from "./style.module.scss";
import FindFriend from "./component/FindFriend";
import Sidebar from "./Sidebar";
type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className={s.layoutWrapper}>
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
