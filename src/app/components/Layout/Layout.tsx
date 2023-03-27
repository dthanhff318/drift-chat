import { UserOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import React, { ReactNode, useState } from "react";
import useServices from "./service";
import s from "./style.module.scss";
type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { handleSignout } = useServices();
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
      <header className={s.header}>
        <span onClick={() => setOpen(true)}>Add friend</span>
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
