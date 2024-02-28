import Loading from 'app/components/Loading/Loading';
import { PlusSquare } from 'lucide-react';
import React from 'react';
import GalleryDetail from '../GalleryDetail/GalleryDetail';
import FormCreatePost from './FormCreatePost';
import GalleryItem from './GalleryItem';
import { useServiceGallery } from './serviceGallery';
import s from './style.module.scss';

const Gallery = () => {
  const { modal, loadingPost, posts, setModal } = useServiceGallery();
  const handleCloseModal = () => setModal('');
  return (
    <>
      <div className={s.galleryWrap}>
        <Loading loading={loadingPost === 'getPosts'} />
        {posts.map((post, i) => (
          <div key={post.id} className={s.galleryItemWrap} onClick={() => setModal('detail')}>
            <GalleryItem />
          </div>
        ))}
        <div className={s.postControl}>
          <PlusSquare className={s.btnAddPost} size={34} onClick={() => setModal('create')} />
        </div>
      </div>
      {modal === 'create' && <FormCreatePost handleCloseModal={handleCloseModal} />}
      {modal === 'detail' && <GalleryDetail handleCloseModal={handleCloseModal} />}
    </>
  );
};

export default Gallery;
