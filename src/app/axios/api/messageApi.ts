import { axiosClient } from "../axiosClient";
import { TQueryMess } from "./typeApi";

const messageApi = {
  getMessage: (data: TQueryMess) => {
    return axiosClient.get(
      `/message?page=${data.page}&limit=${data.limit}&groupId=${data.groupId}`
    );
  },
};

export default messageApi;
