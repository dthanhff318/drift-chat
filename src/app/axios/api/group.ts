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
  updateGroup: (groupId: string, data: TGroup) => {
    return axiosClient.patch(`/groups/${groupId}`, data);
  },
  updateSettingGroup: (data: {
    id: string;
    nickname: string;
    userId: string;
  }) => {
    const { id, nickname, userId } = data;
    return axiosClient.patch(`/groups/nick-name/${id}`, { nickname, userId });
  },
};

export default groupApi;
