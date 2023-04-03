import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import servicesApi from "app/axios/api/services";
import { TUSer } from "types/common";

type TInitState = {
  listAllUser: Array<TUSer>;
};
const initialState: TInitState = {
  listAllUser: [],
};

export const getAllUserInApp = createAsyncThunk(
  "services/getAllUserInApp",
  async () => {
    const res = await servicesApi.getAllUser();
    return res.data;
  }
);

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      getAllUserInApp.fulfilled,
      (state, action: PayloadAction<TUSer[]>) => {
        state.listAllUser = action.payload;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { actions, reducer: servicesReducer } = servicesSlice;
export const {} = actions;

export default servicesReducer;
