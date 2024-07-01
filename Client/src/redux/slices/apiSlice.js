/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//get base url from .env
//comment  line 6 and uncomment line 7 if errors thrown
const API_URI = import.meta.env.VITE_APP_BASE_URL;
// const API_URI = "http://localhost:8800";

//define base query
const baseQuery = fetchBaseQuery({ baseUrl: API_URI + "/api" });

//create api
export const apiSlice = createApi({
  baseQuery,
  tagTypes: [], //for caching/invalidation
  endpoints: (builder) => ({}),//define endpoints
});
