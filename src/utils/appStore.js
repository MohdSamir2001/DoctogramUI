import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import doctorsReducer from "./doctorsSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    doctors: doctorsReducer,
  },
});
export default appStore;
