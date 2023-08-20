import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customAxios } from "../config/api";

const initialState = {
  loading: false,
  error: false,
  data: {},
};

export const createPersonel = createAsyncThunk(
  "/createPersonel",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().userReducer.token;
    // const res = await customAxios.post(`/orderList.json?auth=${token}`, {
    const res = await customAxios.post(`/personnel/management/create`, {
      firstName: arg.firstName,
      lastName: arg.lastName,
      personnelCode: arg.personnelCode,
      part: arg.part,
      basicSalary: arg.basicSalary,
      midName: arg.midName,
      birthDate: arg.birthDate,
      startDate: arg.startDate,
      position: arg.position,
      kitchenCode: arg.kitchenCode,
    });
    return res.data;
  }
);

export const getListpersonel = createAsyncThunk(
  // "personelList/getList",
  "/personel",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().userReducer.token;
    // const res = await customAxios.get(`/personelList.json?auth=${token}`);
    const res = await customAxios.get(`/personel.json?auth=${token}`);
    return res.data;
  }
);

const personelSlice = createSlice({
  name: "personel",
  initialState,
  reducers: {
    addListpersonel: (state, action) => {
      // const orders = action.payload;
      // return { ...orders };
    },
  },
  extraReducers: (builder) => {
    builder

      //getList
      .addCase(getListpersonel.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getListpersonel.fulfilled, (state, action) => {
        const personels = action.payload;
        state.loading = false;
        state.data = personels;
      })
      .addCase(getListpersonel.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      //add personel
      .addCase(createPersonel.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createPersonel.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createPersonel.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { addListpersonel } = personelSlice.actions;
export const selectListpersonel = (state) => state.personelReducer;
export default personelSlice.reducer;
