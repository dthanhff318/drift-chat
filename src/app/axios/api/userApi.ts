import { axiosClient } from "../axiosClient";

const userApi = {
  getAllUser: () => {
    return axiosClient.get("/services/users");
  },
};

export default userApi;
