import { apiSlice } from "../apiSlice"

const COURSE_URL = "/course";

export const courseApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCourseDetails: builder.query({
            query: ({ isTrashed }) => ({
                url: `${COURSE_URL}?isTrashed=${isTrashed}`,
                method: "GET",
                credentials: "include",
            }),
        }),

        getCoursebyId: builder.query({
            query: ({ id }) => ({
                url: `${COURSE_URL}/get-course/${id}`,
                method: "GET",
                credentials: "include",
            }),
        }),

        addCourse: builder.mutation({
            query: (data) => ({
                url: `${COURSE_URL}/create`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),

        updateCourse: builder.mutation({
            query: (data) => ({
                url: `${COURSE_URL}/update/${data._id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),

        trashCourse: builder.mutation({
            query: ({ id }) => ({
                url: `${COURSE_URL}/${id}`,
                method: "PUT",
                credentials: "include",
            }),
        }),

        // getSigleTask: builder.query({
        //     query: (id) => ({
        //         url: `${TASK_URL}/${id}`,
        //         method: "GET",
        //         credentials: "include",
        //     }),
        // }),

        deleteCourse: builder.mutation({
            query: ({ id }) => ({
                url: `${COURSE_URL}/delete/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
        }),
    })
});

export const {
    useAddCourseMutation,
    useGetCourseDetailsQuery,
    useGetCoursebyIdQuery,
    useUpdateCourseMutation,
    useTrashCourseMutation,
    useDeleteCourseMutation,
} = courseApiSlice;