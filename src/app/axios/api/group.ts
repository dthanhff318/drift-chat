import { axiosClient } from "../axiosClient";

const groupApi = {
  getAllGroup: () => {
    return axiosClient.get("/groups");
  },
};

export default groupApi;
