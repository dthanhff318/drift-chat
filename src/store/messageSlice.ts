import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import messageApi from "app/axios/api/messageApi";
import { TQueryMess, TSendMess } from "app/axios/api/typeApi";
import { TMessage } from "types/common";

type TMessageState = {
  message: TMessage[];
  loading: boolean;
};

const initialState: TMessageState = {
  message: [],
  loading: false,
};

export const getMessage = createAsyncThunk(
  "message/getMessage",
  async (data: TQueryMess) => {
    const res = await messageApi.getMessage(data);
    return res.data;
  }
);

export const sendMess = createAsyncThunk(
  "message/send",
  async (data: TSendMess) => {
    const res = await messageApi.sendMess(data);
    return res.data;
  }
);

export const messageSlice = createSlice({
  name: "messageSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMessage.rejected, (state) => {
      state.loading = false;
      state.message = [];
    });
    builder.addCase(getMessage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getMessage.fulfilled,
      (state, action: PayloadAction<TMessage[]>) => {
        state.message = action.payload;
        state.loading = false;
      }
    );
  },
});
