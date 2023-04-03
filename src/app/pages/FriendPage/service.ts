import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllUserInApp } from "./slice/servicesSlice";
import { AnyAction } from "@reduxjs/toolkit";

const useService = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserInApp() as unknown as AnyAction);
  }, []);
  return {};
};

export default useService;
