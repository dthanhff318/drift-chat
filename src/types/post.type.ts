import { TUser } from './common';

export type TPost = {
  id?: string;
  user?: TUser;
  caption?: string;
  images?: string[];
  stars?: string[];
  pin?: boolean;
};

export type TComment = {
  id?: string;
  user?: TUser;
  post?: string;
  content?: string;
};

export type TLoadingPost = '' | 'create' | 'getPosts';
