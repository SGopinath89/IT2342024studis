import { DialogTitle } from "@headlessui/react";
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateSubtaskMutation } from "../../redux/slices/api/taskApiSlice";
import Button from "../Button";
import ModalWrapper from "../ModalWrapper";
import Textbox from "../Textbox";

//add subTasks
const AddSubTask = ({ open, setOpen, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //call mutation
  const [addSbTask] = useCreateSubtaskMutation();

  //handles creation process
  const handleOnSubmit = async (data) => {
    try {
      const res = await addSbTask({ data, id }).unwrap();
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
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <DialogTitle
            as='h2'
            className='text-base font-bold leading-6 text-[#343A40] mb-4'
          >
            ADD SUB-TASK
          </DialogTitle>
          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Sub-Task title'
              type='text'
              name='title'
              label='Title'
              className='w-full rounded'
              register={register("title", {
                required: "Title is required!",
              })}
              error={errors.title ? errors.title.message : ""}
            />

            <div className='flex items-center gap-4'>
              <Textbox
                placeholder='Date'
                type='date'
                name='date'
                label='Task Date'
                className='w-full rounded'
                register={register("date", {
                  required: "Date is required!",
                })}
                error={errors.date ? errors.date.message : ""}
              />
            </div>
          </div>
          <div className='py-3 mt-4 flex sm:flex-row-reverse gap-4'>
            <Button
              type='submit'
              className='bg-[#007BFF] px-8 text-sm font-semibold text-[#F8F9FA] hover:bg-[#0056b3] sm:ml-3 sm:w-auto'
              label='Add Task'
            />

            <Button
              type='button'
              className='bg-[#6C757D] px-8 border text-sm font-semibold text-[#F8F9FA] hover:bg-[#495057] sm:w-auto'
              onClick={() => setOpen(false)}
              label='Cancel'
            />
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

AddSubTask.propTypes = {
  open: PropTypes.bool.isRequired, 
  setOpen: PropTypes.func.isRequired, 
  id: PropTypes.string,
};

export default AddSubTask;
