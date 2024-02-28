import { notification } from 'antd';
import postApi from 'app/axios/api/postApi';
import { TLoadingPost, TPost } from 'types/post.type';
import { create } from 'zustand';

type TPostStore = {
  loadingPost: TLoadingPost;
  posts: TPost[];
  getPosts: () => void;
};

const postStore = create<TPostStore>((set) => ({
  loadingPost: '',
  posts: [],
  getPosts: async () => {
    try {
      set({ loadingPost: 'getPosts' });
      const res = await postApi.getPosts();
      set({
        posts: res.data,
      });
      set({ loadingPost: '' });
    } catch (err) {
      set({ loadingPost: '' });
      notification.error({
        message: `Error`,
        description: 'Try again',
        duration: 3,
      });
    }
  },
}));

export default postStore;
