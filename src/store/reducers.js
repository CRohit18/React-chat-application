import { combineReducers } from "@reduxjs/toolkit";
import dashboardReducer from "@/modules/dashboard/slice";
import loginReducer from "@/modules/login/slice/loginSlice";
import profileReducer from "@/modules/profile/slice/profileSlice";

const reducer = combineReducers({
  dashboard: dashboardReducer,
  login: loginReducer,
  profile: profileReducer,
});
export default reducer;
