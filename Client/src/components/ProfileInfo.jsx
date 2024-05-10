/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { Dialog, DialogTitle } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";

const ProfileInfo = ({ open, setOpen, userData }) => {
    let defaultValues = userData ?? {};
    const { user } = useSelector((state) => state.auth);
  
    const isLoading = false,
      isUpdating = false;
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({ defaultValues });
  
    const handleOnSubmit = () => {};
  
    return (
      <>
        <ModalWrapper open={open} setOpen={setOpen}>
          <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
            <DialogTitle
              as='h2'
              className='text-base font-bold leading-6 text-gray-900 mb-4'
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
            </div>
  
            {isLoading || isUpdating ? (
              <div className='py-5'>
                <Loading />
              </div>
            ) : (
              <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
                <Button
                  type='submit'
                  className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
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
}

export default ProfileInfo