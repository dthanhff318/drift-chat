import Icon, { SendOutlined, SmileOutlined } from "@ant-design/icons";
import Avatar from "app/components/Avatar/Avatar";
import React, { useState } from "react";
import s from "./style.module.scss";
import c from "clsx";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import TextareaAutosize from "react-textarea-autosize";
type Props = {};

const BoxChat = (props: Props) => {
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleEmojiSelect = (emojiObject) => {
    setSelectedEmoji(emojiObject);
    setValue(value + emojiObject.native);
  };
  console.log(openEmoji);

  return (
    <div className={s.boxChatWrap}>
      <div className={s.headerBox}>
        <Avatar />
        <span className={s.title}>Nhom chat vip pro</span>
      </div>
      <div className={s.content}>
        {Array(20)
          .fill(1)
          .map((e, i) => (
            <div className={c(s.message, i % 2 === 0 ? s.left : s.right)}>
              <div className={s.contentWrap}>
                <span className={c(s.contentMsg)}>
                  helooel ooelooel ooeloo ooeloo elooeloo oelooelooelo
                  oelooelooeloo looelo oelooelooe looelooeloo elooelo looe
                  looelolooelolooelolooelolooelolooelolooelolooelo
                </span>
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
        <button className={s.sendMsg}>
          <SendOutlined className={s.iconSend} />
        </button>
      </div>
    </div>
  );
};

export default BoxChat;
