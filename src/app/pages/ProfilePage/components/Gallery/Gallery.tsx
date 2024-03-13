import Loading from 'app/components/Loading/Loading';
import { PlusSquare } from 'lucide-react';
import React from 'react';
import { TPost } from 'types/post.type';
import GalleryDetail from '../GalleryDetail/GalleryDetail';
import FormCreatePost from './FormCreatePost';
import GalleryItem from './GalleryItem';
import { useServiceGallery } from './serviceGallery';
import s from './style.module.scss';

const Gallery = () => {
  const { data, isLoading, modal, loadingPost, posts, userId, setModal, savePostDetail } =
    useServiceGallery();
  const handleCloseModal = () => setModal('');
  const handleClickGallery = (post: TPost) => {
    savePostDetail(post);
    setModal('detail');
  };

  return (
    <>
      <div className={s.galleryWrap}>
        <Loading loading={isLoading} />
        {data?.data.map((post) => (
          <div key={post.id} className={s.galleryItemWrap} onClick={() => handleClickGallery(post)}>
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
      {modal === 'detail' && <GalleryDetail handleCloseModal={handleCloseModal} />}
    </>
  );
};

export default Gallery;
