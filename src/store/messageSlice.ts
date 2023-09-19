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

export const messageSlice = createSlice({
  name: "messageSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});
