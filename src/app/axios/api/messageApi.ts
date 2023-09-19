import { axiosClient } from "../axiosClient";
import { TQueryMess, TSendMess } from "./typeApi";

const messageApi = {
  getMessages: (data: TQueryMess) => {
    return axiosClient.get(
      `/message?sortBy=createdAt:desc&page=${data.page}&limit=${data.limit}&groupId=${data.groupId}`
    );
  },
  sendMessage: (data: TSendMess) => {
    return axiosClient.post("/message/send", data);
  },
};

export default messageApi;
