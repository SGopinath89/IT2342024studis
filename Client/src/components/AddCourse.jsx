/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { DialogTitle } from "@headlessui/react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiImages } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useAddCourseMutation, useUpdateCourseMutation } from "../redux/slices/api/courseApiSlice";
import { app } from "../utils/firebase.js";
import Button from "./Button";
import Loading from "./Loader";
import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox";

const AddCourse = ({ open, setOpen, courseData }) => {
  const defaultValues = {
    _id: courseData?._id || "",
    courseCode: courseData?.courseCode || "",
    title: courseData?.title || "",
    lectureInCharge: courseData?.lectureInCharge || "",
    duration: courseData?.duration || "",
    courseContent: courseData?.courseContent || "",
  };

  let uploadedFileURLs = "";

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset } = useForm({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [courseData, reset]);

  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [fileLink, setFileLink] = useState(courseData?.courseContent || "");
  
  const dispatch = useDispatch();
  const [addNewCourse, { isLoading }] = useAddCourseMutation();
  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();

  const submitHandler = async (data) => {
    try {
      if (assets.length > 0) {
        setUploading(true);
        const fileUrl = await uploadFile(assets[0]);
        data.courseContent = fileUrl;
        setFileLink(fileUrl);
        setUploading(false);
      }

      const res = data._id
        ? await updateCourse(data).unwrap()
        : await addNewCourse(data).unwrap();
      toast.success(res.message);

      setTimeout(() => {
        setOpen(false);
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  const uploadFile = async (file) => {
    const storage = getStorage(app);
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("Uploading");
        },
        (error) => {
          console.error("Error uploading file:", error);
          reject(error);
        },
        () => {
          // Upload completed successfully, get download URL
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              // Add download URL to the list of uploadedFileURLs
              //uploadedFileURLs = downloadURL;
              // Resolve the promise with the download URL
              resolve(downloadURL);
            })
            .catch((error) => {
              // Handle error while getting download URL
              console.error("Error getting download URL:", error);
              reject(error);
            });
        }
      );
    });
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
            <div className='w-full flex items-center justify-center mt-4'>
                <label
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
                  htmlFor='fileUpload'
                >
                  <input
                    type='file'
                    className='hidden'
                    id='fileUpload'
                    onChange={(e) => handleSelect(e)}
                    accept='.pdf'
                  />
                  <BiImages />
                  <span>Add Course Content</span>
                </label>
              </div>
              {fileLink && (
                <div className='text-sm text-gray-700 mt-2'>
                  Uploaded File: <a href={fileLink} target='_blank' rel='noopener noreferrer'>{fileLink}</a>
                </div>
              )}
              {uploading && (
                <div className='text-sm text-gray-700 mt-2'>
                  Uploading file, please wait...
                </div>
              )}
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
