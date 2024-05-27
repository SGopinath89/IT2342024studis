import { apiSlice } from "../apiSlice"

const FILE_URL = "/file";

export const fileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFiles: builder.query({
            query: ({ isTrashed }) => ({
                url: `${FILE_URL}?isTrashed=${isTrashed}`,
                method: "GET",
                credentials: "include",
            }),
        }),

        getFilebyId: builder.query({
            query: ({ id }) => ({
                url: `${FILE_URL}/${id}`,
                method: "GET",
                credentials: "include",
            }),
        }),

        addFile: builder.mutation({
            query: (data) => ({
                url: `${FILE_URL}/upload`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),

        renameFile: builder.mutation({
            query: ({ id, data}) => ({
                url: `${FILE_URL}/rename/${id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),

        trashFile: builder.mutation({
            query: ({ id }) => ({
                url: `${FILE_URL}/${id}`,
                method: "PUT",
                credentials: "include",
            }),
        }),

        deleteFile: builder.mutation({
            query: ({ id }) => ({
                url: `${FILE_URL}/delete/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
        }),
    })
});

export const {
    useAddFileMutation,
    useGetFilesQuery,
    useGetFilebyIdQuery,
    useRenameFileMutation,
    useTrashFileMutation,
    useDeleteFileMutation,
    useDuplicateFileMutation,
} = fileApiSlice;