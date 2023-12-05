import {
  PaperClipOutlined,
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
import { TUSer } from "types/common";
import Loading from "app/components/Loading/Loading";

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
    setOpenEmoji,
    setMessage,
    handleSendMess,
    ref,
  } = useService();

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
        <Avatar src={friend?.photoUrl} />
        <span className={s.title}>
          {groupDetail?.isGroup ? groupDetail.name : friend?.displayName}
        </span>
      </div>
      <div className={s.content}>
        <Loading loading={firstTimeLoading} />
        {messages.map((e, i) => (
          <div
            key={i}
            className={`${s.message} ${
              e.senderId !== currentUser.id ? s.left : s.right
            }`}
            ref={i === messages.length - 1 ? ref : undefined}
          >
            <div className={s.contentWrap}>
              <span
                className={s.contentMsg}
                dangerouslySetInnerHTML={{
                  __html: e.content?.replaceAll("\n", "<br />") || "",
                }}
              />
              <div className={s.options}></div>
            </div>
            {/* <p className={s.timeSend}>12:10 PM</p> */}
          </div>
        ))}
      </div>
      <div className={s.chatting}>
        <div className={s.chattingFunction}>
          <PaperClipOutlined className={s.emojiIcon} />
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
          <SendOutlined className={s.iconSend} />
        </button>
      </div>
      <input type="file" className={s.inputUpload} ref={inputUploadRef} />
    </div>
  );
};

export default BoxChat;
