import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "app/components/Layout/layoutSlice/layoutSlice";
import authReducer from "app/pages/AuthPage/authSlice/authSlice";
import servicesReducer from "app/pages/FriendPage/slice/servicesSlice";
import groupsReduce from "./groupSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
    services: servicesReducer,
    groups:groupsReduce
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
