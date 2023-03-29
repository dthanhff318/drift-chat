import { IndexedObject } from "types/common";

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

export const getUserFromLs = (): IndexedObject =>
  JSON.parse(localStorage.getItem("userInfo") ?? "{}");
