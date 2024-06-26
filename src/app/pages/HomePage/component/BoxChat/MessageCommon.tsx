import { getNameUser, getUserById } from 'app/helpers/funcs';
import settingStore from 'app/storeZustand/settingStore';
import React from 'react';
import { TGroupDetail, TMessage } from 'types/common';
import s from '../style.module.scss';
type Props = {
  message: TMessage;
  detailGroup: TGroupDetail;
};

const MessageCommon = ({ message, detailGroup }: Props) => {
  const { settings } = settingStore();
  const { commonData } = settings;
  const dataSender = getUserById(message.senderId ?? '', detailGroup?.members ?? []);
  const nameSender = getNameUser(dataSender, detailGroup.setting ?? []);

  const dataTarget = getUserById(message.targetUser ?? '', detailGroup?.members ?? []);
  const nameTarget = getNameUser(dataTarget, detailGroup.setting ?? []);

  switch (message.actionType) {
    case commonData?.actionGroupTypes.CHANGE_PHOTO_GROUP:
      return <p className={s.messageCommon}>{`${nameSender} has changed photo`}</p>;
    case commonData?.actionGroupTypes.ADD:
      return <p className={s.messageCommon}>{`${nameSender} has added ${nameTarget} to group`}</p>;
    case commonData?.actionGroupTypes.REMOVE:
      return (
        <p
          className={s.messageCommon}
        >{`${nameSender} has removed ${message.contentAction} from the group`}</p>
      );
    case commonData?.actionGroupTypes.CHANGE_NICKNAME:
      return <p className={s.messageCommon}>{`${nameTarget} has changed nickname`}</p>;
    case commonData?.actionGroupTypes.CHANGE_NAME_GROUP:
      return (
        <p
          className={s.messageCommon}
        >{`${nameSender} has changed name group to ${message.contentAction}`}</p>
      );
    default:
      return <p className={s.messageCommon}></p>;
  }
};

export default MessageCommon;
