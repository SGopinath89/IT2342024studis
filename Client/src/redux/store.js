import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";

//create and configure the redux store
const store = configureStore({
  //combine the reducers
  reducer: {
    //where key store
    [apiSlice.reducerPath]: apiSlice.reducer,
    //under which name it saved
    auth: authReducer,
  },
  //add custom middleware
  middleware: (getDefaultMiddleware) =>
    //append middleware from api slice to default
    getDefaultMiddleware().concat(apiSlice.middleware),
  //enables dev tools
  devTools: true,
});

export default store;
