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

const AddEvent = ({ open, setOpen }) => {
  const event = "";

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
            Add Event
          </DialogTitle>

          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Event Name'
              type='text'
              name='eventName'
              label='Event Name'
              className='w-full rounded'
              register={register("eventName", { required: "Event name is required" })}
              error={errors.eventName ? errors.eventName.message : ""}
            />

            <div className="flex gap-4">
                <div className="w-1/2">
                    <Textbox
                    placeholder="Start Time"
                    type="text"
                    name="startTime"
                    label="Start Time"
                    className="w-full rounded"
                    register={register("startTime", { required: "Start Time is required" })}
                    error={errors.startTime ? errors.startTime.message : ""}
                    />
                </div>
                <div className="w-1/2">
                    <Textbox
                    placeholder="Duration (in hours)"
                    type="number"
                    name="duration"
                    label="Duration (hours)"
                    className="w-full rounded"
                    register={register("duration", { required: "Duration is required" })}
                    error={errors.duration ? errors.duration.message : ""}
                    />
                </div>
            </div>
            <Textbox
              placeholder="Description"
              type="text"
              name="description"
              label="Description"
              className="w-full rounded"
              register={register}
              error={errors.description ? errors.description.message : ""}
            />
            <div className="flex gap-4">
              <div className="w-full">
                <Textbox
                  placeholder="Date"
                  type="date"
                  name="date"
                  label="Event Date"
                  className="w-full rounded"
                  register={register("date", {
                    required: "Date is required!",
                    validate: {
                      futureDate: value => moment(value).isAfter(moment(), 'day') || "Event date must be in the future"
                    }
                  })}
                  error={errors.date ? errors.date.message : ""}
                />
              </div>
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

export default AddEvent;
