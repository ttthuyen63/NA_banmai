import { createSlice, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import personelSlice from "./personelSlice";
export default configureStore({
  reducer: {
    userReducer: userSlice,
    personelReducer: personelSlice,
  },
});
