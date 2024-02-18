import { EditOutlined, RightSquareOutlined } from '@ant-design/icons';
import { Image, Popover } from 'antd';
import Avatar from 'app/components/Avatar/Avatar';
import ModalCommon from 'app/components/Modal/Modal';
import ModalInput from 'app/components/Modal/ModalInput';
import PopoverCustom from 'app/components/Popover/Popover';
import { pathHomePage } from 'app/routes/routesConfig';
import { HeartHandshake, LogOut, UserRoundPlus, UsersRound, XCircle } from 'lucide-react';
import React from 'react';
import { TGroupDetail } from 'types/common';
import AddMember from './component/AddMember/AddMember';
import ChangeTheme from './component/ChangeTheme/ChangeTheme';
import ListMember from './component/ListMember/ListMember';
import { useService } from './service';
import s from './style.module.scss';
import { getPublicImageUrl } from 'app/helpers/funcs';

type Props = {
  detailGroup: TGroupDetail;
  isOpen: boolean;
  triggerSidechatRef: any;
  onClose: () => void;
};

const SideChat = ({ isOpen, triggerSidechatRef, detailGroup, onClose }: Props) => {
  const {
    modal,
    loading,
    dataPopover,
    inputUploadRef,
    currenTUser,
    preview,
    sideChatRef,
    handleViewProfile,
    handleLeaveGroup,
    setPreview,
    handleUploadPhoto,
    setModal,
    handleUpdateNameGroup,
  } = useService({ triggerSidechatRef, onClose });
  const arrSettings = [
    {
      key: 'View profile',
      icon: <HeartHandshake />,
      className: detailGroup.isGroup ? s.hidden : '',
      onClick: handleViewProfile,
    },
    {
      key: 'Edit name group chat',
      icon: <EditOutlined rev={undefined} />,
      className: detailGroup.isGroup ? '' : s.hidden,
      onClick: () => setModal('change-name-group'),
    },
    {
      key: 'Members',
      icon: <UsersRound size={20} color="#ffffff" />,
      className: detailGroup.isGroup ? '' : s.hidden,
      onClick: () => setModal('list-member'),
    },
    {
      key: 'Add more member',
      icon: <UserRoundPlus size={20} color="#ffffff" />,
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
    {
      key: 'Leave group',
      className: `${detailGroup.isGroup ? '' : s.hidden} ${s.alert}`,
      onClick: () => {
        setModal('confirm-leave');
      },
      icon: <LogOut size={18} color="#ff2929" />,
    },
  ];

  const enemyChat = detailGroup.members?.find((e) => e.id !== currenTUser.id);
  const defaultAvatar = getPublicImageUrl('avt.png');

  const avatarChat = detailGroup.isGroup ? detailGroup.photo || defaultAvatar : enemyChat?.photoUrl;
  const nameChat = detailGroup.isGroup ? detailGroup.name : enemyChat?.displayName;
  return (
    <div ref={sideChatRef} className={`${s.sideChat} ${isOpen ? s.open : ''}`}>
      <div className={s.content}>
        <div className={s.iconCloseNav} onClick={onClose}>
          <XCircle size={28} />
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
        <AddMember detailGroup={detailGroup} onClose={() => setModal('')} />
      </ModalCommon>

      <ModalCommon
        title="Select theme of chat"
        open={modal === 'change-theme'}
        onCancel={() => setModal('')}
        hideFooter
      >
        <ChangeTheme detailGroup={detailGroup} />
      </ModalCommon>
      <ModalCommon
        title="Are you sure to leave this group ?"
        open={modal === 'confirm-leave'}
        loading={loading === 'leave'}
        onCancel={() => setModal('')}
        onConfirm={handleLeaveGroup}
      >
        <p>Every one can see that</p>
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
