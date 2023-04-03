import { axiosClient } from "../axiosClient";

const servicesApi = {
  getAllUser: () => {
    return axiosClient.get("/services/users");
  },
};

export default servicesApi;
