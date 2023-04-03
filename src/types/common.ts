export type IndexedObject<V = any> = { [k: string]: V };

export type TUSer = {
  displayName?: string;
  email?: string;
  uid?: string;
  photoUrl?: string;
  isOnline?: boolean;
  lastActive?: Date;
};
