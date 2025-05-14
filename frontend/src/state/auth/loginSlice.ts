import { createSlice } from '@reduxjs/toolkit';


const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = loginSlice.actions;

export default loginSlice.reducer
