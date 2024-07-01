import { DialogTitle } from "@headlessui/react";
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useRegisterMutation } from "../../redux/slices/api/authApiSlice";
import { useUpdateUserMutation } from "../../redux/slices/api/userApiSlice";
import { setCredentials } from "../../redux/slices/authSlice";
import Button from "../Button";
import Loading from "../Loader";
import ModalWrapper from "../ModalWrapper";
import Textbox from "../Textbox";

//for admins
//can add or edit users
const AddUser = ({ open, setOpen, userData }) => {
  //gets default values
  let defaultValues = userData ?? {};

  //authenticate user is admin
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const dispatch = useDispatch();

  //call mutations
  const [addNewUser, { isLoading }] = useRegisterMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  //handles adding/updating user
  const handleOnSubmit = async (data) => {
    try {
      //updates user
      if(userData){
        const result = await updateUser(data).unwrap();

        toast.success("Profile updated successfully");

        if(userData?._id === user._id){
          dispatch(setCredentials({...result.user }));
        }
      } else {
        //adds a new usr
        await addNewUser({
          ...data, 
          password: data.password
        }).unwrap();

        toast.success("New User added successfully");
      }

      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error) {
      toast.error("New User not added successfully");
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
            {userData ? "UPDATE PROFILE" : "ADD NEW USER"}
          </DialogTitle>
          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Full name'
              type='text'
              name='name'
              label='Full Name'
              className='w-full rounded'
              register={register("name", {
                required: "Full name is required!",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <Textbox
              placeholder='Email Address'
              type='email'
              name='email'
              label='Email Address'
              className='w-full rounded'
              register={register("email", {
                required: "Email Address is required!",
              })}
              error={errors.email ? errors.email.message : ""}
            />
            <Textbox
              placeholder='Password'
              type='password'
              name='password'
              label='Password'
              className='w-full rounded'
              register={register("password", {
                required: "Password is required!",
              })}
              error={errors.email ? errors.email.message : ""}
            />
            <Textbox
              placeholder='Role'
              type='text'
              name='role'
              label='Role'
              className='w-full rounded'
              register={register("role", {
                required: "User role is required!",
              })}
              error={errors.role ? errors.role.message : ""}
            />

            <Textbox
              placeholder='Registration Number'
              type='text'
              name='regNumber'
              label='Registration Number'
              className='w-full rounded'
              register={register("regNumber", {
                required: "Registration Number is required!",
              })}
              error={errors.regNumber ? errors.regNumber.message : ""}
            />
            <Textbox
              placeholder='Degree'
              type='text'
              name='degree'
              label='Degree'
              className='w-full rounded'
              register={register("degree", {
                required: "Degree is required!",
              })}
              error={errors.degree ? errors.degree.message : ""}
            />
          </div>

          {isLoading || isUpdating ? (
            <div className='py-5'>
              <Loading />
            </div>
          ) : (
            <div className='py-3 mt-4 sm:flex sm:flex-row-reverse gap-4'>
              <Button
                type='submit'
                className='bg-[#007BFF] px-8 text-sm font-semibold text-[#F8F9FA] hover:bg-[#0056b3] sm:w-auto'
                label='Submit'
              />

              <Button
                type='button'
                className='bg-[#6C757D] px-8 text-sm font-semibold text-[#F8F9FA] hover:bg-[#495057] sm:w-auto'
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

AddUser.propTypes = {
  open: PropTypes.bool.isRequired, 
  setOpen: PropTypes.func.isRequired, 
  userData: PropTypes.shape({
    _id: PropTypes.string,
  }),
};

export default AddUser;
