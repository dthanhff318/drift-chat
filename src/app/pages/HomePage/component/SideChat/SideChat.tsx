import {
  EditOutlined,
  RightSquareOutlined,
  SettingOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import { Popover, Image } from 'antd';
import Avatar from 'app/components/Avatar/Avatar';
import ModalCommon from 'app/components/Modal/Modal';
import ModalInput from 'app/components/Modal/ModalInput';
import PopoverCustom from 'app/components/Popover/Popover';
import React from 'react';
import { TGroup, TGroupDetail } from 'types/common';
import ListMember from './component/ListMember/ListMember';
import { useService } from './service';
import s from './style.module.scss';
import AddMember from './component/AddMember/AddMember';
import ChangeTheme from './component/ChangeTheme/ChangeTheme';
type Props = {
  detailGroup: TGroupDetail;
  isOpen: boolean;
  onClose: () => void;
};

const SideChat = ({ isOpen, detailGroup, onClose }: Props) => {
  const {
    modal,
    loading,
    dataPopover,
    inputUploadRef,
    currenTUser,
    preview,
    setPreview,
    handleUploadPhoto,
    setModal,
    handleUpdateNameGroup,
  } = useService();

  const arrSettings = [
    {
      key: 'Edit name group chat',
      icon: <EditOutlined rev={undefined} />,
      className: detailGroup.isGroup ? '' : s.hidden,
      onClick: () => setModal('change-name-group'),
    },
    {
      key: 'Members',
      icon: <SolutionOutlined rev={undefined} />,
      className: detailGroup.isGroup ? '' : s.hidden,
      onClick: () => setModal('list-member'),
    },
    {
      key: 'Add more member',
      icon: <SolutionOutlined rev={undefined} />,
      className: detailGroup.isGroup ? '' : s.hidden,
      onClick: () => setModal('add-member'),
    },
    {
      key: 'Theme',
      className: '',
      onClick: () => setModal('change-theme'),
      component: (
        <div style={{ backgroundColor: detailGroup.theme?.value }} className={s.previewTheme}></div>
      ),
    },
  ];

  const enemyChat = detailGroup.members?.find((e) => e.id !== currenTUser.id);

  const avatarChat = detailGroup.isGroup ? detailGroup.photo : enemyChat?.photoUrl;
  const nameChat = detailGroup.isGroup ? detailGroup.name : enemyChat?.displayName;
  return (
    <div className={`${s.sideChat} ${isOpen ? s.open : ''}`}>
      <div className={s.content}>
        <div className={s.iconCloseNav} onClick={onClose}>
          <RightSquareOutlined rev={undefined} />
        </div>
        <Popover placement={'right'} content={<PopoverCustom data={dataPopover} />}>
          <div className={s.options}>
            <Avatar size="l" src={avatarChat} />
          </div>
        </Popover>
        <span className={s.groupName}>{nameChat}</span>
        <div className={s.chatSettings}>
          {arrSettings.map((e) => (
            <div
              key={e.key}
              className={`${s.chatItem} ${s.editName} ${e.className}`}
              onClick={e.onClick}
            >
              <span className={s.textKey}>{e.key}</span>
              {e.icon ? <div className={s.icon}>{e.icon}</div> : e.component}
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
        hideFooter={true}
        onCancel={() => setModal('')}
      >
        <AddMember detailGroup={detailGroup} />
      </ModalCommon>

      <ModalCommon
        title="Select theme of chat"
        open={modal === 'change-theme'}
        onCancel={() => setModal('')}
        hideFooter
      >
        <ChangeTheme detailGroup={detailGroup} />
      </ModalCommon>
      <input
        type="file"
        onChange={handleUploadPhoto}
        ref={inputUploadRef}
        className={s.inputUpload}
      />
      <Image
        width={200}
        style={{ display: 'none' }}
        src={avatarChat}
        preview={{
          visible: preview,
          src: avatarChat,
          onVisibleChange: (value) => {
            setPreview(value);
          },
        }}
      />
    </div>
  );
};

export default SideChat;
