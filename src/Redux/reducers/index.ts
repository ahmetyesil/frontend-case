import { combineReducers } from "redux";
import Settings from "./Settings";
import Auth from "./Auth";


const reducers = combineReducers({
  auth: Auth,
  settings: Settings,

});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
