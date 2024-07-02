import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  loading: false,
};

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    forgotPasswordStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    forgotPasswordSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    forgotPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
