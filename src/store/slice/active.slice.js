import { createSlice } from "@reduxjs/toolkit";

const activeProductSlice = createSlice({
  name: "activeProduct",
  initialState: {
    product: {}
  },
  reducers: {
    setActiveProduct: (state, action) => {
        state.product = action.payload;
    },
  },
});

export const { setActiveProduct } = activeProductSlice.actions;

export default activeProductSlice.reducer;