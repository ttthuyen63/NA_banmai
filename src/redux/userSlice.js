import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url, urlAdmin } from "../config/api";
import axios from "axios";

const initialState = {
  // khi khởi tạo lấy giá trị khởi tạo từ localStorage
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("torefreshTokenken"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, actions) => {
      localStorage.setItem("token", actions.payload);
      state.token = actions.payload;
    },
    logout: (state, actions) => {
      localStorage.removeItem("token");
      state.token = null;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(refreshAccessToken.fulfilled, (state, action) => {
  //       state.token = action.payload;
  //     })
  //     .addCase(refreshAccessToken.rejected, (state) => {
  //       state.token = null; // Handle error case if needed
  //     });
  // },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
