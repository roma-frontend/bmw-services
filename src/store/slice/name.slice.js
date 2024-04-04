import { createSlice } from '@reduxjs/toolkit';

const buttonSlice = createSlice({
  name: 'button',
  initialState: {
    name: 'Roman'
  },
  reducers: {
    changeName(state, action) {
      state.name = action.payload;
    }
  }
});

export const { changeName } = buttonSlice.actions;
export default buttonSlice.reducer;