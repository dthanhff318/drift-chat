import { notification } from 'antd';
import postApi from 'app/axios/api/postApi';
import { TComment, TLoadingPost, TPost } from 'types/post.type';
import { create } from 'zustand';

type TPostStore = {
  loadingPost: TLoadingPost;
  posts: TPost[];
  postDetail: TPost;
  comments: TComment[];
  getPosts: (id?: string) => void;
  savePostDetail: (post: TPost) => void;
  getCommentByPost: (postId: string) => void;
};

const postStore = create<TPostStore>((set) => ({
  loadingPost: '',
  comments: [],
  posts: [],
  postDetail: {},
  getCommentByPost: async (postId: string) => {
    try {
      const res = await postApi.getCommentByPost(postId);
      set({
        comments: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getPosts: async (id?: string) => {
    try {
      set({ loadingPost: 'getPosts' });
      const res = await postApi.getPosts(id);
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
