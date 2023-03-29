import React, { ReactNode, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import ModalCommon from "app/components/Modal/Modal";
import useServices from "./service";
import s from "./style.module.scss";
type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { handleSignout, openAddFr, handleShowAddFr } = useServices();
  const [open, setOpen] = useState(false);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: <button onClick={handleSignout}>Logout</button>,
    },
  ];
  return (
    <div className={s.layoutWrapper}>
      <ModalCommon
        open={openAddFr}
        onOk={() => {}}
        onCancel={() => handleShowAddFr(false)}
      >
        xin chao mn
      </ModalCommon>
      <header className={s.header}>
        <span onClick={() => handleShowAddFr(true)}>Add friend</span>
        <Dropdown menu={{ items }}>
          <div className={s.options}>
            <UserOutlined />
          </div>
        </Dropdown>
      </header>
      {children}
    </div>
  );
};

export default Layout;
