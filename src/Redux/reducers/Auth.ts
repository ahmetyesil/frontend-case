import { AnyAction } from "redux";

import { SET_LOGIN, SET_LOGOUT } from "../types";

interface IUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  photo: string;
  profession: string;
  averageScore: string;
  sessionPrice: string;
  discountCoupon: string;
  totalProfit: string;
  isAuthenticated: boolean;
  initialized: boolean;
}

const INIT_STATE = {
  id: "",
  name: "",
  surname: "",
  email: "",
  photo: "",
  profession: "",
  averageScore: "",
  sessionPrice: "",
  discountCoupon: "",
  totalProfit: "",
  isAuthenticated: false,
  initialized: false,
};

const States = (state: IUser = INIT_STATE, action: AnyAction) => {
  switch (action.type) {
    case SET_LOGIN: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_LOGOUT: {
      return { ...INIT_STATE };
    }
    default:
      return state;
  }
};
export default States;
