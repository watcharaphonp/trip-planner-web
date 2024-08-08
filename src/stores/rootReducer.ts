import { combineReducers } from "@reduxjs/toolkit";
import localizationReducer from "./localization/slice";
import userReducer from "./user/slice";

const rootReducer = combineReducers({
  localization: localizationReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
