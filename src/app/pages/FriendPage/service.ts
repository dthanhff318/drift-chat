import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllUserInApp,
  getDataFriendCommunication,
} from "./slice/servicesSlice";
import { AnyAction } from "@reduxjs/toolkit";
import friendsApi from "app/axios/api/friends";
import { RootState } from "store/configStore";
import { getUserFromLs } from "app/helpers/localStorage";

const useService = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const infoUser = user ?? getUserFromLs();
  const handleAddFriend = async (uid: string) => {
    await friendsApi.sendRqAddFriend({ reqId: infoUser.uid, acceptId: uid });
  };
  useEffect(() => {
    dispatch(getAllUserInApp() as unknown as AnyAction);
    dispatch(getDataFriendCommunication() as unknown as AnyAction);
  }, []);
  return {
    handleAddFriend,
  };
};

export default useService;
