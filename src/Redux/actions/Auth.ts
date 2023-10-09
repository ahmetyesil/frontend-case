import { SET_LOGIN, SET_LOGOUT } from "../types";

export const loginRedux = (data: any) => {
  return {
    type: SET_LOGIN,
    payload: data,
  };
};

export const logoutRedux = () => {
  return {
    type: SET_LOGOUT,
  };
};
