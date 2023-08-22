import { createSlice, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import personelSlice from "./personelSlice";
import accountSlice from "./accountSlice";
export default configureStore({
  reducer: {
    userReducer: userSlice,
    personelReducer: personelSlice,
    account: accountSlice,
  },
});
