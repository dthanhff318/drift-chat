import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import groupApi from "app/axios/api/group";
import { TGroup } from "types/common";

type TGroupState = {
  currentGroup: TGroup;
  groups: TGroup[];
  loading: boolean;
};

const initialState: TGroupState = {
  currentGroup: {} as TGroup,
  groups: [],
  loading: false,
};

export const getAllGroup = createAsyncThunk("groups/getAllgroup", async () => {
  const res = await groupApi.getAllGroup();
  return res.data;
});

export const groupSlice = createSlice({
  name: "groupSlice",
  initialState,
  reducers: {
    setGroup(state, action: PayloadAction<TGroup>) {
      state.currentGroup = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllGroup.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getAllGroup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllGroup.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.groups = action.payload;
        state.loading = false;
      }
    );
  },
});

export const { actions, reducer: groupsReduce } = groupSlice;
export const { setGroup } = actions;
export default groupsReduce;
