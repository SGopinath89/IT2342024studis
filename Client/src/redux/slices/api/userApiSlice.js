/* eslint-disable no-unused-vars */
import { apiSlice } from "../apiSlice"

const USER_URL = "/user"

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profiles`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),

        updateMe: builder.mutation({
            query: ({ data }) => ({
                url: `${USER_URL}/profiles/${data._id}`,
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

        getUser: builder.query({
            query: ({ id }) => ({
                url: `${USER_URL}/get-user/${id}`,
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
                body: data,
                credentials: "include",
            }),
        }),

        getNotifications: builder.query({
            query: () => ({
                url: `${USER_URL}/notifications`,
                method: "GET",
                credentials: "include",
            }),
        }),

        markNotificationsAsRead: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/read-noti?isReadType=${data.type}&id=${data?.id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),

        changePassword: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/change-password`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),

        requestPasswordReset: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}/passwordReset`,
              method: 'POST',
              body: data,
            }),
          }),
        
    }),
});

export const {
    useUpdateUserMutation, 
    useGetUserListQuery,
    useDeleteUserMutation,
    useUserActionMutation,
    useGetNotificationsQuery,
    useMarkNotificationsAsReadMutation,
    useChangePasswordMutation,
    useGetUserQuery,
    useUpdateMeMutation,
    useRequestPasswordResetMutation,
} = userApiSlice;