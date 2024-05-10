/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog, DialogTitle } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import Button from "../Button";
import moment from "moment";

const AddFile = ({ open, setOpen }) => {
  const file = "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    console.log(data);
  };


  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <DialogTitle
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            Add File
          </DialogTitle>

          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='File Name'
              type='text'
              name='fileName'
              label='File Name'
              className='w-full rounded'
              register={register("fileName", { required: "File name is required" })}
              error={errors.fileName ? errors.fileName.message : ""}
            />

            <div className="flex gap-4">
                <Textbox
                placeholder="File path(URL)"
                type="text"
                name="file"
                label="File path"
                className="w-full rounded"
                register={register("file", { required: "File path is required" })}
                error={errors.file ? errors.file.message : ""}
                />
            </div>

            <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
              <Button
                label="Submit"
                type="submit"
                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
              />
              <Button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                onClick={() => setOpen(false)}
                label="Cancel"
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddFile;
