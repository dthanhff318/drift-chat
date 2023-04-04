import { axiosClient } from "../axiosClient";

const friendsApi = {
  getInfoCommuication: () => {
    return axiosClient.get("/friends");
  },
  addFriend: (data: { reqId: string; acceptId: string }) => {
    return axiosClient.post("/friends/add", data);
  },
};

export default friendsApi;
