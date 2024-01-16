import {
  CopyOutlined,
  FacebookFilled,
  HighlightOutlined,
  SkypeFilled,
  UserAddOutlined,
} from '@ant-design/icons';
import { Image } from 'antd';
import Button from 'app/components/Button/Button';
import { getPublicImageUrl } from 'app/helpers/funcs';
import React, { useRef, useState } from 'react';
import { TUser } from 'types/common';
import s from '../style.module.scss';
import ModalCommon from 'app/components/Modal/Modal';
import UserInfoDetail from './UserInfoDetail/UserInfoDetail';
import userApi from 'app/axios/api/user';
import authStore from 'app/storeZustand/authStore';
import Loading from 'app/components/Loading/Loading';
type Props = {
  user: TUser;
};

type TLoadingHeaderProfile = '' | 'avatar';

const HeaderProfile = ({ user }: Props) => {
  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<TLoadingHeaderProfile>('');
  const [preview, setPreview] = useState<boolean>(false);
  const inputUploadAvt = useRef<HTMLInputElement>(null);

  const { saveCurrenTUser } = authStore();

  const handleUploadAvatar = async (e) => {
    try {
      const { files } = e.target;
      if (!files) {
        return;
      }
      setLoading('avatar');
      const formUpload = new FormData();
      formUpload.append('image', files[0]);
      const res = await userApi.uploadAvatar(formUpload);
      saveCurrenTUser(res.data as TUser);
      setLoading('');
    } catch (err) {
      setLoading('');
    }
  };
  return (
    <>
      <div
        className={s.headerProfile}
        style={{
          backgroundImage: `url("https://genk.mediacdn.vn/2017/1-2-1488180942287.jpg")`,
        }}
      >
        <div className={s.userInfo}>
          <div className={s.avtWrapper}>
            <img src={user.photoUrl} className={s.avatarProfile} alt="" />
            {!loading && (
              <div className={s.avtOptions}>
                <Button text="Edit" onClick={() => inputUploadAvt.current?.click()} />
                <Button text="View" onClick={() => setPreview(true)} />
              </div>
            )}
            <Loading loading={loading === 'avatar'} />
          </div>
          <div className={s.detailInfo}>
            <p className={s.name}>
              {user.displayName}
              <span className={s.idValue}>
                {user.inviteId} <CopyOutlined className={s.idCopy} />
              </span>
            </p>
            <p className={s.introduction}>{user.introduction}</p>
            <div className={s.coinWrap}>
              <img src={getPublicImageUrl('coin-drift.png')} className={s.coinImg} alt="" />
              <span>{user.coin}</span>
            </div>
          </div>
        </div>
        <div className={s.socialLink}>
          <div className={s.socialItem}>
            <FacebookFilled
              style={{
                color: '#0088cb',
              }}
            />
          </div>
          <div className={s.socialItem}>
            <SkypeFilled
              style={{
                color: '#319fd5',
              }}
            />
          </div>
        </div>
        <div className={s.iconGallery} onClick={() => setModal(true)}>
          <HighlightOutlined />
        </div>
      </div>
      <ModalCommon
        open={modal}
        title="Profile"
        onCancel={() => {
          setModal(false);
        }}
        hideFooter={true}
      >
        <UserInfoDetail callbackWhenUpdate={() => setModal(false)} />
      </ModalCommon>
      <input
        onChange={handleUploadAvatar}
        type="file"
        className={s.inputUploadAvt}
        ref={inputUploadAvt}
      />
      <Image
        width={200}
        style={{ display: 'none' }}
        src={user.photoUrl}
        preview={{
          visible: preview,
          src: user.photoUrl,
          onVisibleChange: (value) => {
            setPreview(value);
          },
        }}
      />
    </>
  );
};

export default HeaderProfile;
