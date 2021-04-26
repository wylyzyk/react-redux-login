import { combineReducers } from "redux";
import { auth } from "./auth";
import flshMessageReducer from "./flshMessage";

const rootReducers = combineReducers({
  auth,
  flshMessageReducer
});

export default rootReducers;