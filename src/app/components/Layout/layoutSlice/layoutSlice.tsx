import { createSlice } from "@reduxjs/toolkit";
import { saveUserToLs } from "app/helpers/localStorage";
import { ENav } from "enums";

type TState = {
  nav: ENav;
};
const initialState: TState = {
  nav: ENav.Messenger,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    changeNav: (state, action) => {
      //   saveUserToLs(action.payload);
      state.nav = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions, reducer: layoutReducer } = layoutSlice;
export const { changeNav } = actions;

export default layoutReducer;
