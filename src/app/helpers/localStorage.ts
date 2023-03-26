import { IndexedObject } from "types/common";

export const getTokenFromLocalStorage = () =>
  localStorage.getItem("accessToken");

export const getRefreshTokenFromLocalStorage = () =>
  localStorage.getItem("refreshToken");

export const saveUserToLs = (data) =>
  localStorage.setItem("userInfo", JSON.stringify(data));

export const removeUserLs = () => localStorage.removeItem("userInfo");

export const getUserFromLs = (): IndexedObject =>
  JSON.parse(localStorage.getItem("userInfo") ?? "{}");
