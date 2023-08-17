import { axiosClient } from "../axiosClient";

const friendsApi = {
  getInfoCommuication: () => {
    return axiosClient.get("/friends");
  },
  addFriend: (friendId: string) => {
    return axiosClient.post("/friends/add", { friendId });
  },
  acceptFrRequest: (data: { acceptUid: string }) => {
    return axiosClient.post("/friends/accept", data);
  },
};

export default friendsApi;
