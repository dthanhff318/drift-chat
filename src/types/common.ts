export type IndexedObject<V = any> = { [k: string]: V };

export type TUSer = {
  displayName?: string;
  email?: string;
  uid?: string;
  photoUrl?: string;
  isOnline?: boolean;
  lastActive?: Date;
};

export type TGroup = {
  _id: string;
  members: TUSer[];
  listAdmin: string[];
  typeGroup: boolean;
};
export type TMessage = {
  _id: string;
  senderId: string;
  group: string;
  content: string;
};
