import messageApi from "app/axios/api/messageApi";
import { LIMIT_MESS } from "app/helpers/common";
import { getInfoDirectmess } from "app/helpers/funcs";
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
  const [loading, setLoading] = useState(false);
  const [hashMore, setHashMore] = useState<{ hasMore: boolean; page: number }>(
    initHashMore
  );
  const { currentGroup } = useSelector((state: RootState) => state.groups);
  const [listMessage, setListMessage] = useState<TMessage[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);
  const [friend, setFriend] = useState<TUSer | undefined>({});
  const [ref, inView] = useInView();
  console.log({ listMessage });

  const getMessInGroup = async (page?: number) => {
    try {
      setLoading(true);
      const data = {
        page: page ?? hashMore.page,
        limit: LIMIT_MESS,
        groupId: currentGroup._id,
      };
      const response = await messageApi.getMessage(data);
      if (page) {
        setHashMore({ ...hashMore, page: page + 1 });
        setListMessage(response.data);
      } else {
        setListMessage([...listMessage, ...response.data]);
        setHashMore({ ...hashMore, page: hashMore.page + 1 });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    inView && hashMore.hasMore && getMessInGroup();
  }, [inView]);

  useEffect(() => {
    getMessInGroup(1);
    if (currentGroup._id) {
      setFriend(getInfoDirectmess(currentGroup));
    }
  }, [currentGroup._id]);

  return {
    currentGroup,
    listMessage,
    user,
    ref,
    friend,
  };
};
