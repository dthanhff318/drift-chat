import { axiosClient } from "../axiosClient";
import { TQueryMess, TSendMess } from "./typeApi";

const messageApi = {
  getMessage: (data: TQueryMess) => {
    return axiosClient.get(
      // `/message?page=${data.page}&limit=${data.limit}&groupId=${data.groupId}`
      `/message?groupId=${data.groupId}`
    );
  },
  sendMessage: (data: TSendMess) => {
    return axiosClient.post("/message/send", data);
  },
};

export default messageApi;
