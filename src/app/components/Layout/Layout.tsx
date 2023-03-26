import React, { ReactNode } from "react";
import useServices from "./service";
type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { handleSignout } = useServices();
  return (
    <div>
      <header>
        <button onClick={handleSignout}>Logout</button>
      </header>
      {children}
    </div>
  );
};

export default Layout;
