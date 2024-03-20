import React from 'react';
import { createPortal } from 'react-dom';
import s from './style.module.scss';
import Avatar from 'app/components/Avatar/Avatar';
import {
  ArrowLeftCircle,
  ArrowRightCircle,
  EllipsisVertical,
  Loader2,
  SendHorizontal,
  Star,
  XCircle,
} from 'lucide-react';
import { useServiceGalleryDetail } from './serviceGalleryDetail';
import TextareaAutosize from 'react-textarea-autosize';
import { Popover } from 'antd';
import PopoverCustom from 'app/components/Popover/Popover';
import ModalCommon from 'app/components/Modal/Modal';

type Props = {
  handleCloseModal: () => void;
};

const GalleryDetail = ({ handleCloseModal }: Props) => {
  const {
    postDetail,
    indexView,
    comment,
    comments,
    loadingComment,
    currentUser,
    arrPopover,
    modal,
    delPostMutation,
    setModal,
    setComment,
    setIndexView,
    handleSendComment,
    handleLikedPost,
    handleDeletePost,
  } = useServiceGalleryDetail({ handleCloseModal });

  const rootElement = document.getElementById('root');
  const imagesCount = postDetail?.images?.length ?? 0;

  const handleNextImage = () => setIndexView((prev) => prev + 1);
  const handlePrevImage = () => setIndexView((prev) => prev - 1);

  const isLiked = postDetail.stars?.includes(currentUser.id ?? '');

  if (!rootElement) return null;
  return (
    document.getElementById('root') &&
    createPortal(
      <>
        <div className={s.galleryDetail}>
          <div className={s.galleryOverlay}>
            <XCircle size={39} className={s.closeIcon} color="#fff" onClick={handleCloseModal} />
          </div>
          <div className={s.galleryContent}>
            <Popover
              trigger={'click'}
              placement={'left'}
              content={<PopoverCustom data={arrPopover} />}
            >
              <div className={s.optionPost}>
                <EllipsisVertical size={28} />
              </div>
            </Popover>
            <div className={s.galleryImage}>
              {imagesCount > 1 && indexView !== 0 && (
                <ArrowLeftCircle
                  size={34}
                  fill="#fff"
                  className={`${s.navBtn} ${s.left}`}
                  onClick={handlePrevImage}
                />
              )}
              {imagesCount > 1 && indexView !== imagesCount - 1 && (
                <ArrowRightCircle
                  size={34}
                  fill="#fff"
                  className={`${s.navBtn} ${s.right}`}
                  onClick={handleNextImage}
                />
              )}
              {imagesCount > 1 && (
                <div className={s.previewIndex}>{`${indexView + 1}/${imagesCount}`}</div>
              )}

              <img
                src={postDetail.images ? postDetail.images[indexView] : ''}
                alt=""
                className={s.image}
              />
            </div>
            <div className={s.galleryInfo}>
              <div className={s.owner}>
                <div className={s.info}>
                  <Avatar src={postDetail.user?.photoUrl ?? ''} />
                  <p className={s.name}>{postDetail?.user?.displayName}</p>
                </div>
                <div
                  className={s.caption}
                  dangerouslySetInnerHTML={{
                    __html: postDetail?.caption?.replaceAll('\n', '<br />') || '',
                  }}
                />
              </div>
              <div className={s.interactive}>
                <div className={s.starPost} onClick={handleLikedPost}>
                  <Star size={24} fill={isLiked ? 'yellow' : 'white'} />
                </div>
                <div className={s.quantityStar}>{`${postDetail.stars?.length} people liked`}</div>
              </div>
              <div className={s.postComment}>
                <div className={s.listComment}>
                  {comments?.data.map((e, i) => (
                    <div className={s.commentItem} key={i}>
                      <div className={s.user}>
                        <Avatar src={e.user?.photoUrl} size="s" />
                        <p className={s.name}>{e.user?.displayName}</p>
                      </div>
                      <p
                        className={s.commentContent}
                        dangerouslySetInnerHTML={{
                          __html: e?.content?.replaceAll('\n', '<br />') || '',
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className={s.enterComment}>
                <TextareaAutosize
                  className={s.inputComment}
                  placeholder="What do you think ?"
                  maxRows={14}
                  onChange={(e) => setComment(e.target.value)}
                  minRows={1}
                  value={comment}
                />
                {loadingComment ? (
                  <Loader2 size={28} className={s.loading} />
                ) : (
                  <SendHorizontal
                    size={28}
                    className={s.btnSendComment}
                    onClick={handleSendComment}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <ModalCommon
          open={modal === 'confirm-delete'}
          title="Are you sure to delete this post"
          desc="Once deleted, it cannot be restored"
          onCancel={() => setModal('')}
          onConfirm={handleDeletePost}
          loading={delPostMutation.isLoading}
        />
      </>,
      rootElement,
    )
  );
};

export default GalleryDetail;
