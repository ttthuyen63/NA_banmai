import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url, urlAdmin } from "../config/api";
import axios from "axios";

const initialState = {
  // khi khởi tạo lấy giá trị khởi tạo từ sessionStorage
  token: sessionStorage.getItem("token"),
  refreshToken: sessionStorage.getItem("refreshTokenken"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, actions) => {
      sessionStorage.setItem("token", actions.payload);
      state.token = actions.payload;
    },
    logout: (state, actions) => {
      sessionStorage.removeItem("token");
      state.token = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
