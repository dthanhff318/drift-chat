import { createSlice } from "@reduxjs/toolkit";
import { removeUserLs, saveUserToLs } from "app/helpers/localStorage";
import { TUSer } from "types/common";

type TUserStore = {
  user: TUSer;
  isAuth: boolean;
};

const initialState: TUserStore = {
  user: {},
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      saveUserToLs(action.payload);
      state.isAuth = true;
      state.user = action.payload;
    },
    signoutUser: (state) => {
      removeUserLs();
      state.isAuth = false;
      state.user = initialState.user;
    },
  },
});

export const { actions, reducer: authReducer } = authSlice;
export const { saveUser, signoutUser } = actions;

export default authReducer;
