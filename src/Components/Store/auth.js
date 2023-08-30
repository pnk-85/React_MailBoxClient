import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  token: "",
  email : "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
      state.token = localStorage.getItem("token");
      state.email = localStorage.getItem('email');
      
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = "";
      state.email = "";
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

