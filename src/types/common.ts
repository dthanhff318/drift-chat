export type IndexedObject<V = any> = { [k: string]: V };

export type TUSer = {
  displayName?: string;
  email?: string;
  uid?: string;
  photoUrl?: string;
  isOnline?: boolean;
  lastActive?: Date;
  id?: string;
};

export type TGroup = {
  id?: string;
  name?: string;
  members?: TUSer[];
  admins?: string[];
  isGroup?: boolean;
  newestMess?: TMessage;
  unread?: number;
};
export type TMessage = {
  id?: string;
  senderId?: string;
  group?: string;
  content?: string;
  createdAt?: string;
  image?: string;
};
