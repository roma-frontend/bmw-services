import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  errors: null,
  loader: false,
};

const globalSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.errors = action.payload;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
  },
});

export const { setUser, setError, setLoader } = globalSlice.actions;
export default globalSlice.reducer;