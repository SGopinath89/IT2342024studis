import { DialogTitle } from "@headlessui/react";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  useCreateEventMutation,
  useDeleteEventMutation,
  useDuplicateEventMutation,
  useUpdateEventMutation
} from "../../redux/slices/api/eventApiSlice";
import Button from "../Button";
import ConfirmatioDialog from "../Dialogs";
import ModalWrapper from "../ModalWrapper";
import Textbox from "../Textbox";

//contain form for adding/ editing events
//need to feed the event
//called inside calender
const AddEvent = ({ open, setOpen, event }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});

  //setting default values for event duplication
  useEffect(() => {
    if (event) {
      const defaultValues = {
        id: event.id || "",
        eventName: event.title || "",
        startTime: event.start ? new Date(event.start).toISOString().slice(0, 16) : "",
        endTime: event.end ? new Date(event.end).toISOString().slice(0, 16) : "",
        description: event.description || "",
      };
      reset(defaultValues);
    }
  }, [event, reset]);

  //CRUD mutatons for events
  const [createEvent, { isLoading }] = useCreateEventMutation();
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();
  const [duplicateEvent] = useDuplicateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();

  //handles creation and updating
  const submitHandler = async(data) => {
    try {
      const eventData = {
        id: data.id,
        eventName: data.eventName,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        description: data.description,
      };
      
      //set event or update
      const res = event?.id
        ? await updateEvent({ ...eventData, _id: event.id }).unwrap()
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

  const deleteClicks = () => {
    setOpenDialog(true);
  };

  //handles delete 
  const deleteHandler = async () => {
    try {
      const res = await deleteEvent({
        id: event.id,
      }).unwrap();

      toast.success(res?.message);

      setTimeout(() => {
        setOpenDialog(false),
        window.location.reload();
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  //handles duplication
  const duplicateHandler = async () => {
    try {
      const res = await duplicateEvent(event.id).unwrap();

      toast.success(res?.message);

      setTimeout(() => {
        setOpenDialog(false);
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
            className='text-base font-bold leading-6 text-[#343A40] mb-4'
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
            <div className="bg-[#F8F9FA] py-6 sm:flex sm:flex-row-reverse gap-4">
              <Button
                label="Submit"
                type="submit"
                className="bg-[#007BFF] px-7 text-sm font-semibold text-[#F8F9FA] hover:bg-[#0056b3] sm:w-auto"
                loading={isLoading || isUpdating}
              />
              <Button
                type="button"
                className="bg-[#FFC107] px-6 text-sm font-semibold text-[#F8F9FA] hover:bg-[#C79100] sm:w-auto"
                onClick={() => duplicateHandler()}
                label="Duplicate"
              />
               <Button
                type="button"
                className="bg-[#DC3545] px-7 text-sm font-semibold text-[#F8F9FA] hover:bg-[#A71D2A] sm:w-auto"
                onClick={() => deleteClicks()}
                label="Delete"
              />
              <Button
                type="button"
                className="bg-[#6C757D] px-7 text-sm font-semibold text-[#F8F9FA] hover:bg-[#495057] sm:w-auto"
                onClick={() => setOpen(false)}
                label="Cancel"
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

//propTypes for this file
AddEvent.propTypes = {
  open: PropTypes.bool.isRequired, 
  setOpen: PropTypes.func.isRequired, 
  event: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    start: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    end: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    description: PropTypes.string,
  }),
};

export default AddEvent;
