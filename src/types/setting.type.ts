import { TTheme } from './common';

export type TSettings = {
  themes?: TTheme[];
  commonData?: TCommonData;
};

export type TCommonData = {
  actionGroupTypes: TActionGroupType;
  messageTypes: TMessageType;
  historyActions: THistoryAction;
};

export type TActionGroupType = {
  ADD: string;
  REMOVE: string;
  LEAVE: string;
  CHANGE_NAME_GROUP: string;
  CHANGE_NICKNAME: string;
  CHANGE_PHOTO_GROUP: string;
  NONE: string;
};

export type TMessageType = {
  USER: string;
  COMMON: string;
};

export type THistoryAction = {
  LIKE?: string;
  UNLIKE?: string;
  VISIT?: string;
};
