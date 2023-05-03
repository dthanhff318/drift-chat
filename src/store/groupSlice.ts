import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import groupApi from "app/axios/api/group";

const initialState = {
    groups: [],
    loading:false
}

export const getAllGroup = createAsyncThunk('groups/getAllgroup', async () => {
    const res =  await groupApi.getAllGroup() 
    return res.data
})  

export const groupSlice = createSlice({
    name:"groupSlice",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(getAllGroup.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(getAllGroup.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllGroup.fulfilled, (state,action:PayloadAction<any>) => {
            state.groups = action.payload
            state.loading = false
        })
    },
})

export const {actions,reducer:groupsReduce} = groupSlice
export const {} = actions
export default groupsReduce