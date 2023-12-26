export type IndexedObject<V = any> = { [k: string]: V };

export type TUser = {
  displayName?: string;
  email?: string;
  uid?: string;
  photoUrl?: string;
  isOnline?: boolean;
  lastActive?: Date;
  id?: string;
  coin?: number;
  introduction?: string;
  inviteId?: string;
};

export type TGroup = {
  id?: string;
  name?: string;
  members?: TUser[];
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
  replyMessage?: TMessage;
};

export type TDataCommunicate = {
  listAccept?: TUser[];
  listBlock?: TUser[];
  listFriend?: TUser[];
  listRequest?: TUser[];
};
