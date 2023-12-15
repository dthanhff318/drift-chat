import {
  CloseCircleFilled,
  CloseCircleOutlined,
  EnterOutlined,
  LeftSquareOutlined,
  LoadingOutlined,
  MoreOutlined,
  PaperClipOutlined,
  RightSquareOutlined,
  SendOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import Avatar from "app/components/Avatar/Avatar";
import React, { useState } from "react";
import s from "../style.module.scss";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import TextareaAutosize from "react-textarea-autosize";
import { useService } from "./service";
import { TMessage, TUSer } from "types/common";
import Loading from "app/components/Loading/Loading";
import { Image, Popover } from "antd";
import PopoverCustom from "app/components/Popover/Popover";

type Props = {};

const BoxChat = (props: Props) => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const {
    groups,
    currentGroup,
    currentUser,
    message,
    messages,
    firstTimeLoading,
    openEmoji,
    inputUploadRef,
    file,
    loading,
    reply,
    openSideChat,
    scrollMessageIntoView,
    setOpenSideChat,
    setReply,
    setFile,
    onUploadImage,
    setOpenEmoji,
    setMessage,
    handleSendMess,
    ref,
  } = useService();

  const renderDataPopover = (mess: TMessage) => {
    return [
      {
        icon: <SendOutlined />,
        text: "Reply",
        onClick: () => {
          setReply(mess);
        },
      },
      {
        icon: <SendOutlined />,
        text: "Delete",
        onClick: () => {
          console.log(1);
        },
      },
    ];
  };

  let friend: TUSer = {};
  const groupDetail = groups.find((e) => e.id === currentGroup);
  if (!groupDetail?.isGroup) {
    friend = groupDetail?.members?.find((e) => e.id !== currentUser.id) ?? {};
  }
  const handleInputChange = (e) => {
    setOpenEmoji(false);
    setMessage(e.target.value);
  };
  const handleEmojiSelect = (emojiObject) => {
    setSelectedEmoji(emojiObject);
    setMessage(message + emojiObject.native);
  };

  return (
    <div className={s.boxChatWrap}>
      <div className={s.headerBox}>
        <div className={s.infoGroup}>
          <Avatar src={friend?.photoUrl} />
          <span className={s.title}>
            {groupDetail?.isGroup ? groupDetail.name : friend?.displayName}
          </span>
        </div>
        <div className={s.iconOpennav} onClick={() => setOpenSideChat(true)}>
          <LeftSquareOutlined />
        </div>
      </div>
      <div className={s.content}>
        <Loading loading={firstTimeLoading} />
        {messages.map((e, i) => (
          <div
            key={i}
            className={`${s.messageWrap} ${
              e.senderId !== currentUser.id ? s.left : s.right
            }`}
            id={`m${e.id}`}
          >
            <div
              className={`${s.message}`}
              ref={i === messages.length - 1 ? ref : undefined}
            >
              <div className={s.contentWrap}>
                {e.replyMessage && (
                  <div
                    className={s.replyMess}
                    onClick={() =>
                      scrollMessageIntoView(e.replyMessage?.id ?? "")
                    }
                  >
                    <div className={s.enterIcon}>
                      <EnterOutlined />
                    </div>
                    <p className={s.replyContent}>{e.replyMessage?.content}</p>
                  </div>
                )}
                {e.image && (
                  <Image.PreviewGroup>
                    <Image className={s.contentImage} src={e.image} />
                  </Image.PreviewGroup>
                )}
                {e.content && (
                  <span
                    className={`${s.contentMsg} ${e.image ? s.hasImage : ""}`}
                    dangerouslySetInnerHTML={{
                      __html: e.content?.replaceAll("\n", "<br />") || "",
                    }}
                  />
                )}
                <Popover
                  placement={e.senderId !== currentUser.id ? "right" : "left"}
                  content={<PopoverCustom data={renderDataPopover(e)} />}
                >
                  <div className={s.options}>
                    <MoreOutlined />
                  </div>
                </Popover>
              </div>
            </div>
          </div>
        ))}
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
          <CloseCircleFilled
            className={s.iconRemoveImg}
            onClick={() => setFile(null)}
          />
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
              if (e.code === "Enter" && !e.shiftKey) {
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
              />
            </div>
          )}
          <SmileOutlined
            className={s.emojiIcon}
            onClick={() => setOpenEmoji((prev) => !prev)}
          />
          <button className={s.sendMsg} onClick={handleSendMess}>
            {loading ? (
              <LoadingOutlined className={s.iconSend} />
            ) : (
              <SendOutlined className={s.iconSend} />
            )}
          </button>
        </div>
      )}
      <input
        type="file"
        className={s.inputUpload}
        ref={inputUploadRef}
        onChange={onUploadImage}
      />
      {/* {openSideChat && ( */}
      <div className={`${s.sideChat} ${openSideChat ? s.open : ""}`}>
        <div className={s.iconCloseNav} onClick={() => setOpenSideChat(false)}>
          <RightSquareOutlined />
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default BoxChat;
