import Loading from 'app/components/Loading/Loading';
import { PlusSquare } from 'lucide-react';
import React from 'react';
import GalleryDetail from '../GalleryDetail/GalleryDetail';
import FormCreatePost from './FormCreatePost';
import GalleryItem from './GalleryItem';
import { useServiceGallery } from './serviceGallery';
import s from './style.module.scss';

const Gallery = () => {
  const {
    data,
    isLoading,
    modal,
    userId,
    queryUrlObj,
    setModal,
    handleClickGallery,
    handleClosePostDetail,
  } = useServiceGallery();
  const handleCloseModal = () => setModal('');

  return (
    <>
      <div className={s.galleryWrap}>
        <Loading loading={isLoading} />
        {data?.data.map((post) => (
          <div
            key={post.id}
            className={s.galleryItemWrap}
            onClick={() => handleClickGallery(post.id ?? '')}
          >
            <GalleryItem post={post} />
          </div>
        ))}
        {!userId && (
          <div className={s.postControl}>
            <PlusSquare className={s.btnAddPost} size={34} onClick={() => setModal('create')} />
          </div>
        )}
      </div>
      {modal === 'create' && <FormCreatePost handleCloseModal={handleCloseModal} />}
      {queryUrlObj.post && (
        <GalleryDetail
          handleCloseModal={() => {
            handleCloseModal();
            handleClosePostDetail();
          }}
        />
      )}
    </>
  );
};

export default Gallery;
