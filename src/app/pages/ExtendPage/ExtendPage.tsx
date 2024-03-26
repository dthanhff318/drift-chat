import React from 'react';
import s from './style.module.scss';
import useService, { ETypeNavExtendPage } from './service';
import { Handshake, NotebookPen, ShieldX } from 'lucide-react';
import Avatar from 'app/components/Avatar/Avatar';
import Button from 'app/components/Button/Button';

const ExtendPage = () => {
  const { dataCommunicate, tab, setTab, goToDirectChat, goToProfile } = useService();
  const { listFriend = [], listBlock = [] } = dataCommunicate ?? {};

  const navList = [
    {
      index: 1,
      title: ETypeNavExtendPage.Friend,
      icon: <Handshake size={28} color="#fff" />,
      onClick: () => {
        setTab(ETypeNavExtendPage.Friend);
      },
    },
    {
      index: 2,
      title: ETypeNavExtendPage.Blocked,
      icon: <ShieldX size={28} color="#fff" />,
      onClick: () => {
        setTab(ETypeNavExtendPage.Blocked);
      },
    },
    {
      index: 3,
      title: ETypeNavExtendPage.Mission,
      icon: <NotebookPen size={28} color="#fff" />,
      onClick: () => {
        setTab(ETypeNavExtendPage.Mission);
      },
    },
  ];

  const isShowListUser = tab === ETypeNavExtendPage.Friend || tab === ETypeNavExtendPage.Blocked;

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.navbarExtend}>
          {navList.map((e) => (
            <div
              key={e.index}
              className={`${s.itemNav} ${tab === e.title ? s.active : ''}`}
              onClick={e.onClick}
              title={e.title}
            >
              {e.icon}
            </div>
          ))}
        </div>
        <div className={s.contentWrap}>
          {isShowListUser && (
            <div className={s.listWrap}>
              {(tab === ETypeNavExtendPage.Friend ? listFriend : listBlock)?.map((e) => (
                <div className={s.user} key={e.id}>
                  <div className={s.userInfo}>
                    <Avatar src={e.photoUrl} />
                    <p onClick={() => goToProfile(e.id ?? '')}>{e.displayName}</p>
                  </div>
                  <div className={s.btnWrap}>
                    <Button text="Message" onClick={() => goToDirectChat(e.id ?? '')} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExtendPage;
