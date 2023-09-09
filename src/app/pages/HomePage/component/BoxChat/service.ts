import messageApi from "app/axios/api/messageApi";
import { LIMIT_MESS } from "app/helpers/common";
import { getInfoDirectmess } from "app/helpers/funcs";
import authStore from "app/storeZustand/authStore";
import groupStore from "app/storeZustand/groupStore";
import messageStore from "app/storeZustand/messageStore";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { TMessage, TUSer } from "types/common";

const initHashMore = {
  hasMore: true,
  page: 1,
};

export const useService = () => {
  const { groups, currentGroup } = groupStore();
  const { currentUser } = authStore();
  const { messages, saveMessage, updateMessage } = messageStore();

  const [loading, setLoading] = useState(false);
  const [hashMore, setHashMore] = useState<{ hasMore: boolean; page: number }>(
    initHashMore
  );
  const [listMessage, setListMessage] = useState<TMessage[]>([]);
  const [friend, setFriend] = useState<TUSer | undefined>({});
  const [ref, inView] = useInView();

  const [message, setMessage] = useState("");

  const getMessInGroup = async (page?: number) => {
    try {
      setLoading(true);
      const data = {
        // page: page ?? hashMore.page,
        // limit: LIMIT_MESS,
        groupId: currentGroup,
      };
      const res = await messageApi.getMessage(data ?? "");
      saveMessage(res.data);
      // if (page) {
      //   setHashMore({ ...hashMore, page: page + 1 });
      //   setListMessage(response.data);
      // } else {
      //   setListMessage([...listMessage, ...response.data]);
      //   setHashMore({ ...hashMore, page: hashMore.page + 1 });
      // }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMess = async () => {
    try {
      if (currentUser.id) {
        const messBody = {
          senderId: currentUser.id ?? "",
          group: currentGroup,
          content: message,
        };
        const res = await messageApi.sendMessage(messBody);
        updateMessage(res.data);
        setMessage("");
      }
    } catch (err) {}
  };

  // useEffect(() => {
  //   inView && hashMore.hasMore && getMessInGroup();
  // }, [inView]);

  useEffect(() => {
    getMessInGroup(1);
    // if (currentGroup.id) {
    //   setFriend(getInfoDirectmess(currentGroup));
    // }
  }, [currentGroup]);

  return {
    listMessage,
    message,
    messages,
    ref,
    friend,
    groups,
    currentGroup,
    currentUser,
    setMessage,
    handleSendMess,
  };
};
