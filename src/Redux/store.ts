import { legacy_createStore, applyMiddleware } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import combinedReducer from "./reducers";

// Middleware.
const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

// Reducer.
export const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  } else {
    return combinedReducer(state, action);
  }
};

// Init store.
export const store = () => {
  return legacy_createStore(reducer, bindMiddleware([thunkMiddleware]));
};

// Create a wrapper.
const wrapper = createWrapper(store);

export default wrapper;
