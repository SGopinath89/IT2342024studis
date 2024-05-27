/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//get base url from .env
const API_URI = import.meta.env.VITE_APP_BASE_URL;

//define base query
const baseQuery = fetchBaseQuery({ baseUrl: API_URI + "/api" });

//create api
export const apiSlice = createApi({
  baseQuery,
  tagTypes: [], //for caching/invalidation
  endpoints: (builder) => ({}),//define endpoints
});
