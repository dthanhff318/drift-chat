import {
  CloseCircleFilled,
  CloseCircleOutlined,
  DeleteOutlined,
  EnterOutlined,
  LeftSquareOutlined,
  LoadingOutlined,
  MoreOutlined,
  PaperClipOutlined,
  SendOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Image, Popover } from 'antd';
import Avatar from 'app/components/Avatar/Avatar';
import Loading from 'app/components/Loading/Loading';
import PopoverCustom from 'app/components/Popover/Popover';
import { getNameAndAvatarChat, getNameUser, getUserById } from 'app/helpers/funcs';
import authStore from 'app/storeZustand/authStore';
import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { TMessage, TUser } from 'types/common';
import SideChat from '../SideChat/SideChat';
import s from '../style.module.scss';
import { useService } from './service';

const BoxChat = () => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const {
    groups,
    currentGroup,
    currenTUser,
    message,
    messages,
    firstTimeLoading,
    loadingDetailGroup,
    openEmoji,
    inputUploadRef,
    file,
    loading,
    reply,
    openSideChat,
    detailGroup,
    scrollMessageIntoView,
    setOpenSideChat,
    setReply,
    setFile,
    onUploadImage,
    setOpenEmoji,
    setMessage,
    handleSendMess,
    ref,
    deleteMessage,
  } = useService();

  const renderDataPopover = (mess: TMessage) => {
    const { currenTUser } = authStore.getState();
    return [
      {
        icon: <SendOutlined />,
        text: 'Reply',
        hidden: false,
        onClick: () => {
          setReply(mess);
        },
      },
      {
        icon: <DeleteOutlined />,
        text: 'Delete',
        hidden: currenTUser.id !== mess.senderId,
        onClick: () => {
          deleteMessage(mess);
        },
      },
    ];
  };

  let friend: TUser = {};
  const groupDetail = groups.find((e) => e.id === currentGroup);
  if (!groupDetail?.isGroup) {
    friend = groupDetail?.members?.find((e) => e.id !== currenTUser.id) ?? {};
  }
  const handleInputChange = (e) => {
    setOpenEmoji(false);
    setMessage(e.target.value);
  };
  const handleEmojiSelect = (emojiObject) => {
    setSelectedEmoji(emojiObject);
    setMessage(message + emojiObject.native);
  };
  const { nameGroup, avatarGroup } = getNameAndAvatarChat(detailGroup, currenTUser.id ?? '');

  return (
    <div className={s.boxChatWrap}>
      <Loading loading={firstTimeLoading || loadingDetailGroup} />
      <div className={s.headerBox}>
        <div className={s.infoGroup}>
          <Avatar src={avatarGroup} />
          <span className={s.title}>{nameGroup}</span>
        </div>
        <div className={s.iconOpennav} onClick={() => setOpenSideChat(true)}>
          <LeftSquareOutlined />
        </div>
      </div>
      <div className={s.content}>
        {messages.map((e, i) => {
          const otherMess = e.senderId !== currenTUser.id;
          const findUserOwnMess = detailGroup.members?.find((m) => m.id === e.senderId) ?? {};
          const prevMess = i ? messages[i - 1] : messages[i];
          const nextMess = i < messages.length - 1 ? messages[i + 1] : messages[i];

          const isShowNickname =
            (e.senderId === prevMess.senderId && nextMess.senderId !== e.senderId) ||
            i === messages.length - 1 ||
            (e.senderId !== prevMess.senderId && e.senderId !== nextMess.senderId);
          const isShowAvatar =
            (e.senderId !== prevMess.senderId && nextMess.senderId === e.senderId) ||
            i === 0 ||
            (e.senderId !== prevMess.senderId && e.senderId !== nextMess.senderId);
          const marginMess =
            (e.senderId !== prevMess.senderId && nextMess.senderId === e.senderId && i !== 0) ||
            (e.senderId === currenTUser.id &&
              nextMess.senderId !== e.senderId &&
              e.senderId !== prevMess.senderId);

          return (
            <div
              key={i}
              className={`${s.messageWrap} ${otherMess ? s.left : s.right} ${
                marginMess ? s.mgBot : ''
              }`}
              id={`m${e.id}`}
            >
              {isShowNickname && (
                <span className={s.nickname}>
                  {getNameUser(findUserOwnMess, detailGroup.setting ?? [])}
                </span>
              )}
              <div className={`${s.message}`} ref={i === messages.length - 1 ? ref : undefined}>
                {otherMess && isShowAvatar && (
                  <Avatar
                    size="s"
                    src={getUserById(e.senderId ?? '', groupDetail?.members ?? []).photoUrl}
                  />
                )}
                <div
                  className={`${s.contentWrap} ${
                    e.isDelete ? s.messageDeleted : ''
                  } ${isShowAvatar ? '' : s.hideAvt} `}
                >
                  {e.replyMessage && (
                    <div
                      className={s.replyMess}
                      onClick={() => scrollMessageIntoView(e.replyMessage?.id ?? '')}
                    >
                      <div className={s.enterIcon}>
                        <EnterOutlined />
                      </div>
                      <p className={s.replyContent}>{e.replyMessage?.content}</p>
                    </div>
                  )}
                  {e.image && !e.isDelete && (
                    <Image.PreviewGroup>
                      <Image className={s.contentImage} src={e.image} />
                    </Image.PreviewGroup>
                  )}
                  {e.content && !e.isDelete && (
                    <span
                      className={`${s.contentMsg} ${e.image ? s.hasImage : ''}`}
                      dangerouslySetInnerHTML={{
                        __html: e.content?.replaceAll('\n', '<br />') || '',
                      }}
                    />
                  )}
                  {(e.content || e.image) && e.isDelete && (
                    <span className={`${s.contentMsg} ${e.image ? s.hasImage : ''}`}>
                      This message has been deleted
                    </span>
                  )}
                  <Popover
                    placement={otherMess ? 'right' : 'left'}
                    content={<PopoverCustom data={renderDataPopover(e)} />}
                  >
                    {!e.isDelete && (
                      <div className={s.options}>
                        <MoreOutlined />
                      </div>
                    )}
                  </Popover>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {reply.id && (
        <div className={s.replyWrap}>
          <div className={s.replyValue}>
            <div className={s.iconReply}>
              <EnterOutlined />
            </div>
            <span className={s.replyText}>Reply : </span>
            <p className={s.replyMess}>{reply.content}</p>
          </div>
          <div className={s.closeIcon} onClick={() => setReply({})}>
            <CloseCircleOutlined />
          </div>
        </div>
      )}
      {file && (
        <div className={s.imagePreview}>
          <img className={s.image} src={URL.createObjectURL(file)} alt="" />
          <CloseCircleFilled className={s.iconRemoveImg} onClick={() => setFile(null)} />
        </div>
      )}
      {currentGroup && (
        <div className={s.chatting}>
          <div className={s.chattingFunction}>
            <PaperClipOutlined
              className={s.emojiIcon}
              onClick={() => {
                inputUploadRef.current?.click();
              }}
            />
          </div>
          <TextareaAutosize
            className={s.inputChat}
            value={message}
            onChange={handleInputChange}
            maxRows={4}
            onKeyDown={(e: any) => {
              if (e.code === 'Enter' && !e.shiftKey) {
                handleSendMess();
              }
            }}
            placeholder="Type something..."
          />
          {openEmoji && (
            <div className={s.emojiPicker}>
              <Picker
                theme="dark"
                data={data}
                open={false}
                onEmojiSelect={handleEmojiSelect}
                emojiButtonSize={30}
                emojiSize={24}
                exceptEmojis={[]}
              />
            </div>
          )}
          <SmileOutlined className={s.emojiIcon} onClick={() => setOpenEmoji((prev) => !prev)} />
          <button className={s.sendMsg} onClick={handleSendMess}>
            {loading ? (
              <LoadingOutlined className={s.iconSend} />
            ) : (
              <SendOutlined className={s.iconSend} />
            )}
          </button>
        </div>
      )}
      <input type="file" className={s.inputUpload} ref={inputUploadRef} onChange={onUploadImage} />
      <SideChat
        detailGroup={detailGroup}
        isOpen={openSideChat}
        onClose={() => setOpenSideChat(false)}
      />
    </div>
  );
};

export default BoxChat;
