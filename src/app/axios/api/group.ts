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
};

export default groupApi;
