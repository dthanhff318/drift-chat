import { AnyAction } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { getAllGroup } from "store/groupSlice";

export const useService = () => {
  const dispatch = useDispatch();
  const { groups } = useSelector((state: RootState) => state.groups);

  useEffect(() => {
    dispatch(getAllGroup() as unknown as AnyAction);
  }, []);
  return {
    groups,
  };
};
