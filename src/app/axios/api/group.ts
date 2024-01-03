import { TGroup } from "types/common";
import { axiosClient } from "../axiosClient";

const groupApi = {
  getAllGroup: () => {
    return axiosClient.get("/groups");
  },
  updateUnReadMess: (groupId: string, unreadCount: number) => {
    return axiosClient.patch(`/groups/${groupId}`, {
      unread: unreadCount,
    });
  },
  createGroup: (data: TGroup) => {
    return axiosClient.post("/groups/create-group", data);
  },
  getDetailGroup: (groupId: string) => {
    return axiosClient.get(`/groups/${groupId}`);
  },
};

export default groupApi;
