import { EditOutlined, RightSquareOutlined } from "@ant-design/icons";
import Avatar from "app/components/Avatar/Avatar";
import ModalInput from "app/components/Modal/ModalInput";
import React from "react";
import { useService } from "./service";
import s from "./style.module.scss";
import groupStore from "app/storeZustand/groupStore";
type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SideChat = ({ isOpen, onClose }: Props) => {
  const { modal, setModal } = useService();
  const { detailGroup } = groupStore();
  console.log(detailGroup.name);

  return (
    <div className={`${s.sideChat} ${isOpen ? s.open : ""}`}>
      <div className={s.content}>
        <div className={s.iconCloseNav} onClick={onClose}>
          <RightSquareOutlined />
        </div>
        <Avatar size="l" />
        <span className={s.groupName}>{detailGroup.name}</span>
        <div className={s.chatSettings}>
          <div
            className={`${s.chatItem} ${s.editName}`}
            onClick={() => setModal("change-name-group")}
          >
            <span className={s.textKey}>Edit name group chat</span>
            <div className={s.icon}>
              <EditOutlined />
            </div>
          </div>
        </div>
      </div>
      <ModalInput
        title="Change name group chat"
        desc="All members can see it"
        initValue={detailGroup.name ?? ""}
        open={modal === "change-name-group"}
        onOk={() => {}}
        onCancel={() => setModal("")}
      />
    </div>
  );
};

export default SideChat;
