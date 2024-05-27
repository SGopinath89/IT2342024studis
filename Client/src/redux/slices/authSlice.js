import { createSlice } from "@reduxjs/toolkit";

//define initial state 
const initialState = {
  //get user detail from local storage
  //if no then null
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
    //set sidebar visibility
  isSidebarOpen: false,
};

//for authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //seting credentials
    setCredentials: (state, action) => {
      state.user = action.payload;
      //saves user information to local storage
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    //logout
    // eslint-disable-next-line no-unused-vars
    logout: (state, action) => {
      state.user = null;
      //remove user info from local storage
      localStorage.removeItem("userInfo");
    },
    //toggling sidebar visibility
    setOpenSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;

export default authSlice.reducer;
