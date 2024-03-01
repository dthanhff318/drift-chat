import { notification } from 'antd';
import postApi from 'app/axios/api/postApi';
import { TLoadingPost, TPost } from 'types/post.type';
import { create } from 'zustand';

type TPostStore = {
  loadingPost: TLoadingPost;
  posts: TPost[];
  postDetail: TPost;
  getPosts: () => void;
  savePostDetail: (post: TPost) => void;
};

const postStore = create<TPostStore>((set) => ({
  loadingPost: '',
  posts: [],
  postDetail: {},
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
  savePostDetail: (post: TPost) => {
    set({ postDetail: post });
  },
}));

export default postStore;
