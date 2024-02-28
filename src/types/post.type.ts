import { TUser } from './common';

export type TPost = {
  id?: string;
  user?: TUser[];
  caption?: string;
  images?: string[];
  stars?: string[];
};

export type TLoadingPost = '' | 'create' | 'getPosts';
