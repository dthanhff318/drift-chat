import { axiosClient } from "../axiosClient";

const friendsApi = {
  getInfoCommuication: () => {
    return axiosClient.get("/friends");
  },
  sendRqAddFriend: (data: { reqId: string; acceptId: string }) => {
    return axiosClient.post("/friends/send-add", data);
  },
};

export default friendsApi;
