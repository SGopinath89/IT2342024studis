/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { DialogTitle } from "@headlessui/react";
import moment from "moment";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateEventMutation, useUpdateEventMutation } from "../../redux/slices/api/eventApiSlice";
import Button from "../Button";
import ModalWrapper from "../ModalWrapper";
import Textbox from "../Textbox";
 
const AddEvent = ({ open, setOpen, event }) => {
  const defaultValues =  {
    eventName: event?.eventName || "",
    startTime: event?.startTime ? new Date(event.startTime).toISOString().slice(0, 16) : "",
    endTime: event?.endTime ? new Date(event.endTime).toISOString().slice(0, 16) : "",
    description: event?.description || "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({defaultValues});

  const [createEvent, { isLoading }] = useCreateEventMutation();
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();

  const [events, setEvents] = useState([
    {
      id: 0,
      title: 'Existing Event',
      start: new Date(),
      end: new Date(moment().add(1, 'hours').toDate()),
      description: 'This is an existing event',
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const submitHandler = async(data) => {
    try {
      const eventData = {
        eventName: data.eventName,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        description: data.description,
      };

      const res = event?._id
        ? await updateEvent({ ...eventData, _id: event._id }).unwrap()
        : await createEvent(eventData).unwrap();
      
      toast.success(res.message);

      setTimeout(() => {
        setOpen(false);
        window.location.reload();
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };


  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <DialogTitle
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
             {event ? 'Edit Event' : 'Add Event'}
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

            <Textbox
              placeholder="Start Time"
              type="datetime-local"
              name="startTime"
              label="Start Time"
              className="w-full rounded"
              register={register("startTime", { required: "Start Time is required" })}
              error={errors.startTime ? errors.startTime.message : ""}
            />

            <Textbox
              placeholder="End Time"
              type="datetime-local"
              name="endTime"
              label="End Time"
              className="w-full rounded"
              register={register("endTime", { required: "End Time is required" })}
              error={errors.endTime ? errors.endTime.message : ""}
            />

            <Textbox
              placeholder="Description"
              type="text"
              name="description"
              label="Description"
              className="w-full rounded"
              register={register("description")}
              error={errors.description ? errors.description.message : ""}
            />

            <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
              <Button
                label="Submit"
                type="submit"
                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
                loading={isLoading || isUpdating}
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
