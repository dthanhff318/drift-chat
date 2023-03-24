import { User } from "@firebase/auth";
import { axiosClient } from "../axiosClient";

const authApi = {
  login: (dataUser: User) => {
    const { displayName, email, photoURL: photoUrl, uid } = dataUser;
    return axiosClient.post("/auth/login/firebase", {
      displayName,
      email,
      photoUrl,
      uid,
    });
  },
};

export default authApi;
