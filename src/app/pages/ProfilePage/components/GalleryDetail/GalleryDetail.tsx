import React from 'react';
import { createPortal } from 'react-dom';
import s from './style.module.scss';
import Avatar from 'app/components/Avatar/Avatar';
import { Star } from 'lucide-react';

const GalleryDetail = () => {
  const rootElement = document.getElementById('root');

  const commentArr = [
    {
      user: {
        name: 'dthanhdff',
        photoUrl: '',
      },
      comment: ' this is beautiful post',
    },
    {
      user: {
        name: 'dthanhdff',
        photoUrl: '',
      },
      comment: ' this is beautiful post',
    },
    {
      user: {
        name: 'dthanhdff',
        photoUrl: '',
      },
      comment: ' this is beautiful post',
    },
  ];
  if (!rootElement) return null;
  return (
    document.getElementById('root') &&
    createPortal(
      <>
        <div className={s.galleryDetail}>
          <div className={s.galleryOverlay}></div>
          <div className={s.galleryContent}>
            <div className={s.galleryImage}>
              <img
                src="https://st2.depositphotos.com/2001755/5408/i/450/depositphotos_54081723-stock-photo-beautiful-nature-landscape.jpg"
                alt=""
                className={s.image}
              />
            </div>
            <div className={s.galleryInfo}>
              <div className={s.owner}>
                <div className={s.info}>
                  <Avatar />
                  <p className={s.name}>dthanahfx</p>
                </div>
                <div className={s.caption}>
                  ssssssssssssssssaaaaaaaaaaaaaaaaaasdadasdasdadsadasd
                </div>
              </div>
              <div className={s.interactive}>
                <div className={s.starPost}>
                  <Star size={24} fill="orange" />
                </div>
                <div className={s.quantityStar}>120231 people liked</div>
              </div>
              <div className={s.postComment}>
                <div className={s.listComment}>
                  {commentArr.map((e, i) => (
                    <div className={s.commentItem} key={i}>
                      <Avatar src={e.user.photoUrl} />
                      <p className={s.name}>{e.user.name}</p>
                      <p className={s.commentContent}>{e.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>,
      rootElement,
    )
  );
};

export default GalleryDetail;
