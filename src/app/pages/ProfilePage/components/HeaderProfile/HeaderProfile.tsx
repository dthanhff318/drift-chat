import { CopyOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import Button from 'app/components/Button/Button';
import Loading from 'app/components/Loading/Loading';
import ModalCommon from 'app/components/Modal/Modal';
import { getPublicImageUrl } from 'app/helpers/funcs';
import { Heart, Repeat2, SquarePen } from 'lucide-react';
import React, { useState } from 'react';
import { TUser } from 'types/common';
import s from '../../style.module.scss';
import UserInfoDetail from '../UserInfoDetail/UserInfoDetail';
import { useServiceHeaderProfile } from './serviceHeaderProfile';

type Props = {
  user: TUser;
  friendId: string;
};

const HeaderProfile = ({ user, friendId }: Props) => {
  const [modal, setModal] = useState<boolean>(false);
  const [preview, setPreview] = useState<boolean>(false);

  const {
    currentUser,
    loading,
    inputUploadAvtRef,
    inputUploadThumbRef,
    thumb,
    clearPreviewThumb,
    handleChangeThumbProfile,
    handleLikedProfile,
    handleUploadThumbProfile,
    handleUploadAvatar,
  } = useServiceHeaderProfile();

  const hasLiked = user.likedProfile?.includes(currentUser.id ?? '');

  return (
    <>
      <div
        className={s.headerProfile}
        style={{
          backgroundImage: `url(${user.thumbProfile && !thumb ? user.thumbProfile : thumb ? URL.createObjectURL(thumb) : getPublicImageUrl('thumbProfile.jpg')})`,
        }}
      >
        <Loading loading={loading === 'thumb'} />
        <div className={s.userInfo}>
          <div className={s.avtWrapper}>
            <img src={user.photoUrl} className={s.avatarProfile} alt="" />
            {!loading && (
              <div className={s.avtOptions}>
                {!friendId && (
                  <Button text="Edit" onClick={() => inputUploadAvtRef.current?.click()} />
                )}
                <Button text="View" onClick={() => setPreview(true)} />
              </div>
            )}
            <Loading loading={loading === 'avatar'} />
          </div>
          <div className={s.detailInfo}>
            <p className={s.name}>
              {user.displayName}
              <span className={s.idValue}>
                {user.inviteId} <CopyOutlined className={s.idCopy} rev={undefined} />
              </span>
            </p>
            <p className={s.introduction}>{user.introduction}</p>
            <div className={s.infoBottom}>
              <div className={s.coinWrap}>
                <img src={getPublicImageUrl('coin-drift.png')} className={s.coinImg} alt="" />
                <span>{user.coin}</span>
              </div>
              <div className={s.likeGroup}>
                <div className={s.likeIcon} onClick={handleLikedProfile}>
                  <Heart strokeWidth={3} fill={hasLiked ? '#f11f1f' : ''} color={'#ffffff'} />
                </div>
                <span className={s.quantityLike}>{user.likedProfile?.length ?? 0}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={s.changeThumbWrap}>
          {thumb ? (
            <div className={s.changeThumbBtn}>
              <Button text="Cancel" fill={true} onClick={clearPreviewThumb} />
              <Button text="Save" fill={true} onClick={handleUploadThumbProfile} />
            </div>
          ) : (
            <div className={s.socialItem} onClick={() => inputUploadThumbRef.current?.click()}>
              <Repeat2 color="#ffffff" strokeWidth={1.75} absoluteStrokeWidth />
            </div>
          )}
        </div>
        {!friendId && (
          <div className={s.iconGallery} onClick={() => setModal(true)}>
            <SquarePen color="#ffffff" />
          </div>
        )}
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
        ref={inputUploadAvtRef}
      />
      <input
        onChange={handleChangeThumbProfile}
        type="file"
        className={s.inputUploadAvt}
        ref={inputUploadThumbRef}
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
