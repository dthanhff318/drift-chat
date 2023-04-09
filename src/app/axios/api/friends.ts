import { axiosClient } from "../axiosClient";

const friendsApi = {
  getInfoCommuication: () => {
    return axiosClient.get("/friends");
  },
  sendRqAddFriend: (data: { reqId: string; acceptId: string }) => {
    return axiosClient.post("/friends/send-add", data);
  },
  acceptFrRequest: (data: { acceptUid: string }) => {
    return axiosClient.post("/friends/accept", data);
  },
};

export default friendsApi;
