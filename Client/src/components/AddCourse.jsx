/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { Dialog, DialogTitle } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";
import { useUpdateUserMutation } from "../redux/slices/api/userApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { useAddCourseMutation, useUpdateCourseMutation } from "../redux/slices/api/courseApiSlice";

const AddCourse = ({ open, setOpen, courseData }) => {
  const defaultValues = {
    _id: courseData?._id || "",
    courseCode: courseData?.courseCode || "",
    title: courseData?.title || "",
    lectureInCharge: courseData?.lectureInCharge || "",
    duration: courseData?.duration || "",
    courseContent: courseData?.courseContent || "",
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [courseData, reset]);

  const dispatch = useDispatch();
  const [addNewCourse, { isLoading }] = useAddCourseMutation();
  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();

  const submitHandler = async (data) => {
    try {
      const newData = data;
      const res = data._id
        ? await updateCourse(newData).unwrap()
        : await addNewCourse(newData).unwrap();
      toast.success(res.message);

      setTimeout(() => {
        setOpen(false);
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)} className=''>
          <DialogTitle
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            {courseData ? "UPDATE COURSE" : "ADD NEW COURSE"}
          </DialogTitle>
          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Course Code'
              type='text'
              name='courseCode'
              label='Course Code'
              className='w-full rounded'
              register={register("courseCode", {
                required: "Course Code is required!",
              })}
              error={errors.courseCode ? errors.courseCode.message : ""}
            />
            <Textbox
              placeholder='Title'
              type='text'
              name='title'
              label='Title'
              className='w-full rounded'
              register={register("title", {
                required: "Title is required!",
              })}
              error={errors.title ? errors.title.message : ""}
            />
            <Textbox
              placeholder='Lecturer in charge'
              type='text'
              name='lectureInCharge'
              label='Lecturer in charge'
              className='w-full rounded'
              register={register("lectureInCharge", {
                required: "Lecturer in charge is required!",
              })}
              error={errors.lectureInCharge ? errors.lectureInCharge.message : ""}
            />
            <Textbox
              placeholder='Duration'
              type='text'
              name='duration'
              label='Duration'
              className='w-full rounded'
              register={register("duration", {
                required: "Duration is required!",
              })}
              error={errors.duration ? errors.duration.message : ""}
            />
            <Textbox
              placeholder='Course Content'
              type='text'
              name='courseContent'
              label='Course Content'
              className='w-full rounded'
              register={register("courseContent", {
                required: "Course Content is required!",
              })}
              error={errors.courseContent ? errors.courseContent.message : ""}
            />
          </div>

          {isLoading || isUpdating ? (
            <div className='py-5'>
              <Loading />
            </div>
          ) : (
            <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
              <Button
                type='submit'
                className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto'
                label='Submit'
              />
              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Cancel'
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddCourse;
