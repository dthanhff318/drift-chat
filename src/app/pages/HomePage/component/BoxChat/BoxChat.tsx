import { SendOutlined, SmileOutlined } from "@ant-design/icons";
import Avatar from "app/components/Avatar/Avatar";
import React, { useState } from "react";
import s from "../style.module.scss";
import c from "clsx";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import TextareaAutosize from "react-textarea-autosize";
import { useService } from "./service";
import { getUserFromLs } from "app/helpers/localStorage";
import { useDispatch } from "react-redux";
import { sendMess } from "store/messageSlice";
import messageApi from "app/axios/api/messageApi";
type Props = {};

const BoxChat = (props: Props) => {
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const dispatch = useDispatch();
  const { currentGroup, listMessage, ref, friend } = useService();

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };
  const handleEmojiSelect = (emojiObject) => {
    setSelectedEmoji(emojiObject);
    setValue(value + emojiObject.native);
  };

  const handleSendMess = async () => {
    try {
      if (user.uid) {
        const data = {
          senderId: user.uid,
          group: currentGroup._id,
          content: value,
        };

        const res = await messageApi.sendMess(data);
        setValue("");
      }
    } catch (err) {
    } finally {
    }
  };

  const user = getUserFromLs();

  return (
    <div className={s.boxChatWrap}>
      <div className={s.headerBox}>
        <Avatar src={friend?.photoUrl} />
        <span className={s.title}>{friend?.displayName}</span>
      </div>
      <div className={s.content}>
        {listMessage.map((e, i) => (
          <div
            className={c(s.message, e.senderId !== user.uid ? s.left : s.right)}
            ref={i === listMessage.length - 1 ? ref : undefined}
          >
            <div className={s.contentWrap}>
              <span className={c(s.contentMsg)}>{e.content}</span>
              <div className={s.options}></div>
            </div>
            <p className={s.timeSend}>12:10 PM</p>
          </div>
        ))}
      </div>
      <div className={s.chatting}>
        <TextareaAutosize
          className={s.inputChat}
          value={value}
          onChange={handleInputChange}
          maxRows={4}
          onKeyDown={(e: any) => {
            if (e.code === "Enter") {
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
              emojiButtonSize={28}
              emojiSize={22}
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
    </div>
  );
};

export default BoxChat;
