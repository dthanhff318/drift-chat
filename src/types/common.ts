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
  likedProfile?: string[];
  thumbProfile?: string;
};

export type TGroup = {
  id?: string;
  name?: string;
  members?: TUser[];
  admins?: TUser[];
  isGroup?: boolean;
  newestMess?: TMessage;
  unread?: number;
  setting?: TSettingUserGroup[];
  photo?: string;
  theme?: string;
};

export type TGroupDetail = {
  id?: string;
  name?: string;
  members?: TUser[];
  admins?: TUser[];
  isGroup?: boolean;
  newestMess?: TMessage;
  unread?: number;
  setting?: TSettingUserGroup[];
  photo?: string;
  theme?: TTheme;
};

export type TMessage = {
  id?: string;
  senderId?: string;
  group?: string;
  content?: string;
  createdAt?: string;
  image?: string;
  replyMessage?: TMessage;
  isDelete?: boolean;
  type?: string;
  targetUser?: string;
  actionType?: string;
  contentAction?: string;
};

export type TDataCommunicate = {
  listAccept?: TUser[];
  listBlock?: TUser[];
  listFriend?: TUser[];
  listRequest?: TUser[];
};

export type TQuery = {
  q?: string;
  page?: number;
};

export type TSettingUserGroup = {
  user: string;
  nickname: string;
  theme: string;
};

export type TTheme = {
  name?: string;
  value?: string;
};

// History
export type THistoryProfile = {
  actionHistoryType: string;
  createdAt: string;
  historyOwner: TUser;
  userTarget: TUser;
  id: string;
};
