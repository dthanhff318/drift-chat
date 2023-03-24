export const getTokenFromLocalStorage = () =>
  localStorage.getItem("accessToken");

export const getRefreshTokenFromLocalStorage = () =>
  localStorage.getItem("refreshToken");
