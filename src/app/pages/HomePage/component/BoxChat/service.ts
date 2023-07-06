import messageApi from "app/axios/api/messageApi";
import { LIMIT_MESS } from "app/helpers/common";
import { AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { TMessage } from "types/common";

const initHashMore = {
  hasMore: true,
  page: 1,
};

export const useService = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const [hashMore, setHashMore] = useState<any>(initHashMore);
  const { group } = useSelector((state: RootState) => state.groups);
  const [listMessage, setListMessage] = useState<TMessage[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);

  const getMessInGroup = async (page?: number) => {
    try {
      setLoading(true);
      const data = {
        page: page ?? hashMore.page,
        limit: LIMIT_MESS,
        groupId: group._id,
      };
      const response = await messageApi.getMessage(data);
      if (response.data.length > 0) {
        setListMessage([...response.data, ...listMessage]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMessInGroup();
  }, [group._id]);
  return {
    group,
    listMessage,
    user,
  };
};
