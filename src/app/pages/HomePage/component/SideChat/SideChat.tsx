import { EditOutlined, RightSquareOutlined } from "@ant-design/icons";
import Avatar from "app/components/Avatar/Avatar";
import ModalInput from "app/components/Modal/ModalInput";
import React from "react";
import { TGroup } from "types/common";
import { useService } from "./service";
import s from "./style.module.scss";
type Props = {
  detailGroup: TGroup;
  isOpen: boolean;
  onClose: () => void;
};

const SideChat = ({ isOpen, detailGroup, onClose }: Props) => {
  const { modal, loading, setModal, handleUpdateNameGroup } = useService();

  const arrSettings = [
    {
      key: "Edit name group chat",
      icon: <EditOutlined />,
      className: "",
      onClick: () => setModal("change-name-group"),
    },
  ];

  return (
    <div className={`${s.sideChat} ${isOpen ? s.open : ""}`}>
      <div className={s.content}>
        <div className={s.iconCloseNav} onClick={onClose}>
          <RightSquareOutlined />
        </div>
        <Avatar size="l" />
        <span className={s.groupName}>{detailGroup.name}</span>
        <div className={s.chatSettings}>
          {arrSettings.map((e) => (
            <div className={`${s.chatItem} ${s.editName}`} onClick={e.onClick}>
              <span className={s.textKey}>{e.key}</span>
              <div className={s.icon}>{e.icon}</div>
            </div>
          ))}
        </div>
      </div>
      <ModalInput
        title="Change name group chat"
        desc="All members can see it"
        initValue={detailGroup.name ?? ""}
        open={modal === "change-name-group"}
        loading={loading === "change-name-group"}
        onOk={handleUpdateNameGroup}
        onCancel={() => setModal("")}
      />
    </div>
  );
};

export default SideChat;
