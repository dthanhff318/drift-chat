import { EditOutlined, RightSquareOutlined, SolutionOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import Avatar from 'app/components/Avatar/Avatar';
import ModalCommon from 'app/components/Modal/Modal';
import ModalInput from 'app/components/Modal/ModalInput';
import PopoverCustom from 'app/components/Popover/Popover';
import React from 'react';
import { TGroup } from 'types/common';
import ListMember from './component/ListMember/ListMember';
import { useService } from './service';
import s from './style.module.scss';
import AddMember from './component/AddMember/AddMember';
type Props = {
  detailGroup: TGroup;
  isOpen: boolean;
  onClose: () => void;
};

const SideChat = ({ isOpen, detailGroup, onClose }: Props) => {
  const {
    modal,
    loading,
    dataPopover,
    inputUploadRef,
    handleUploadPhoto,
    setModal,
    handleUpdateNameGroup,
  } = useService();

  const arrSettings = [
    {
      key: 'Edit name group chat',
      icon: <EditOutlined />,
      className: '',
      onClick: () => setModal('change-name-group'),
    },
    {
      key: 'Members',
      icon: <SolutionOutlined />,
      className: '',
      onClick: () => setModal('list-member'),
    },
    {
      key: 'Add more member',
      icon: <SolutionOutlined />,
      className: '',
      onClick: () => setModal('add-member'),
    },
  ];

  return (
    <div className={`${s.sideChat} ${isOpen ? s.open : ''}`}>
      <div className={s.content}>
        <div className={s.iconCloseNav} onClick={onClose}>
          <RightSquareOutlined />
        </div>
        <Popover placement={'right'} content={<PopoverCustom data={dataPopover} />}>
          <div className={s.options}>
            <Avatar size="l" src={detailGroup.photo} />
          </div>
        </Popover>
        <span className={s.groupName}>{detailGroup.name}</span>
        <div className={s.chatSettings}>
          {arrSettings.map((e) => (
            <div key={e.key} className={`${s.chatItem} ${s.editName}`} onClick={e.onClick}>
              <span className={s.textKey}>{e.key}</span>
              <div className={s.icon}>{e.icon}</div>
            </div>
          ))}
        </div>
      </div>
      <ModalInput
        title="Change name group chat"
        desc="All members can see it"
        initValue={detailGroup.name ?? ''}
        open={modal === 'change-name-group'}
        loading={loading === 'change-name-group'}
        onOk={handleUpdateNameGroup}
        onCancel={() => setModal('')}
      />

      <ModalCommon title="Members" open={modal === 'list-member'} onCancel={() => setModal('')}>
        <ListMember detailGroup={detailGroup} />
      </ModalCommon>

      <ModalCommon
        title="Add people to group"
        open={modal === 'add-member'}
        onCancel={() => setModal('')}
      >
        <AddMember detailGroup={detailGroup} />
      </ModalCommon>
      <input
        type="file"
        onChange={handleUploadPhoto}
        ref={inputUploadRef}
        className={s.inputUpload}
      />
    </div>
  );
};

export default SideChat;
