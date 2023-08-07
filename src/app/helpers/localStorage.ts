import { IndexedObject, TUSer } from "types/common";

export const getTokenFromLocalStorage = () =>
  localStorage.getItem("accessToken");

export const saveToken = (token: string, key: string) =>
  localStorage.setItem(key, token);

export const getRefreshTokenFromLocalStorage = () =>
  localStorage.getItem("refreshToken");

export const saveUserToLs = (data) =>
  localStorage.setItem("userInfo", JSON.stringify(data));

export const removeUserLs = () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const getUserFromLs = (): TUSer =>
  JSON.parse(localStorage.getItem("userInfo") ?? "{}");

export const saveGrToLs = (data) =>
  localStorage.setItem("groupId", JSON.stringify(data));

export const removeGrLs = () => {
  localStorage.removeItem("groupId");
};
