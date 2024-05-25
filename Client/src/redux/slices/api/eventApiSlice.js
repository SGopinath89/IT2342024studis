/* eslint-disable no-unused-vars */
import { apiSlice } from "../apiSlice";

const EVENT_URL = "/event"

export const eventApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllEvents: builder.query({
            query: ({ isTrashed }) => ({
                url: `${EVENT_URL}?&isTrashed=${isTrashed}`,
                method: "GET",
                credentials: "include",
            }),
        }),

        createEvent: builder.mutation({
            query: (data) => ({
                url: `${EVENT_URL}/create`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),

        duplicateEvent: builder.mutation({
            query: (id) => ({
                url: `${EVENT_URL}/duplicate/${id}`,
                method: "POST",
                body: {},
                credentials: "include",
            }),
        }),

        updateEvent: builder.mutation({
            query: (data) => ({
                url: `${EVENT_URL}/update/${data.id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),

        trashEvent: builder.mutation({
            query: ({ id }) => ({
                url: `${EVENT_URL}/${id}`,
                method: "PUT",
                credentials: "include",
            }),
        }),

        getSigleEvent: builder.query({
            query: (id) => ({
                url: `${EVENT_URL}/${id}`,
                method: "GET",
                credentials: "include",
            }),
        }),

        deleteEvent: builder.mutation({
            query: ({ id }) => ({
                url: `${EVENT_URL}/delete/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
        }),
    })
});

export const {
    useDeleteEventMutation,
    useGetSigleEventQuery,
    useDuplicateEventMutation,
    useCreateEventMutation,
    useGetAllEventsQuery,
    useTrashEventMutation,
    useUpdateEventMutation,
} = eventApiSlice;