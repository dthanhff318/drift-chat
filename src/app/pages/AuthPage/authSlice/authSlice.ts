import { createSlice } from "@reduxjs/toolkit";
import { saveUserToLs } from "app/helpers/localStorage";

const initialState = {
  user: null,
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
    removeUser: (state) => {
      state.isAuth = false;
      state.user = initialState.user;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions, reducer: authReducer } = authSlice;
export const { saveUser, removeUser } = actions;

export default authReducer;
