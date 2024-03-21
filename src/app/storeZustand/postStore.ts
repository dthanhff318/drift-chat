import { TComment, TPost } from 'types/post.type';
import { create } from 'zustand';

type TPostStore = {
  posts: TPost[];
  postDetail: TPost;
  comments: TComment[];
  savePostDetail: (post: TPost) => void;
};

const postStore = create<TPostStore>((set) => ({
  loadingPost: '',
  comments: [],
  posts: [],
  postDetail: {},

  savePostDetail: (post: TPost) => {
    set({ postDetail: post });
  },
}));

export default postStore;
