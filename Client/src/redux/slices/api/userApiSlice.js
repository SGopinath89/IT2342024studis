/* eslint-disable no-unused-vars */
import { apiSlice } from "../apiSlice"

const USER_URL = "/user"

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),

        getUserList: builder.query({
            query: () => ({
                url: `${USER_URL}/get-user`,
                method: "GET",
                credentials: "include",
            }),
        }),

        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
        }),

        userAction: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data.id}`,
                method: "PUT",
                credentials: "include",
            }),
        }),
        
    }),
});

export const {
    useUpdateUserMutation, 
    useGetUserListQuery,
    useDeleteUserMutation,
    useUserActionMutation,
} = userApiSlice;