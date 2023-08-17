import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import friendsApi from "app/axios/api/friends";
import servicesApi from "app/axios/api/userApi";
import { TUSer } from "types/common";

type TInitState = {
  listAllUser: Array<TUSer>;
  listFriend: Array<TUSer>;
  listRequest: Array<TUSer>;
  listAccept: Array<TUSer>;
  listBlock: Array<TUSer>;
};
const initialState: TInitState = {
  listAllUser: [],
  listFriend: [],
  listRequest: [],
  listAccept: [],
  listBlock: [],
};

export const getAllUserInApp = createAsyncThunk(
  "services/getAllUserInApp",
  async () => {
    const res = await servicesApi.getAllUser();
    return res.data;
  }
);

export const getDataFriendCommunication = createAsyncThunk(
  "friends/getDataFriendCommunication",
  async () => {
    const res = await friendsApi.getInfoCommuication();
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
    builder.addCase(
      getDataFriendCommunication.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.listAccept = action.payload.listAccept;
        state.listBlock = action.payload.listBlock;
        state.listFriend = action.payload.listFriend;
        state.listRequest = action.payload.listRequest;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { actions, reducer: servicesReducer } = servicesSlice;
export const {} = actions;

export default servicesReducer;
