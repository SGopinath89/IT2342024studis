/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ModalWrapper from "../components/ModalWrapper";
import { IoMdAdd } from "react-icons/io";
import { summary } from "../assets/data";
import { getInitials } from "../utils";
import clsx from "clsx";
import ConfirmatioDialog, { UserAction } from "../components/Dialogs";
import Textbox from "../components/Textbox";
import { Field, Fieldset, Input, Label, Legend, Select, Textarea } from '@headlessui/react'

const UpdateUser = ({ setOpen }) => {
  const [userData, setUserData] = useState({
    name: summary.users.name || "",
    email: summary.users.email || "",
    regNumber: summary.users.regNumber || "",
    degree: summary.users.degree || "",
    contact: summary.users.contact || "",
    birthday: summary.users.birthday || "",
    academicBatch: summary.users.academicBatch || "",
  });

  const {
    register,
    formState: { errors },
  } = useForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const [uploading, setUploading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated user data:", userData);
  };

  return (
    <>
    <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit}>
            <legend>Update User Details</legend>
                <Textbox
                    placeholder= {userData.name}
                    type='text'
                    name='name'
                    label='Name'
                    className='w-full rounded'
                    register={register("name", {})}
                    error={errors.name ? errors.name.message : ""}
                />
                <Textbox
                    placeholder={userData.email}
                    type='text'
                    name='email'
                    label='Email'
                    className='w-full rounded'
                    register={register("email", {})}
                    error={errors.email ? errors.email.message : ""}
                />
                <Textbox
                    placeholder={userData.regNumber}
                    type='text'
                    name='regNumber'
                    label='Registration Number'
                    className='w-full rounded'
                    register={register("regNumber", {})}
                    error={errors.regNumber ? errors.regNumber.message : ""}
                />
                <Textbox
                    placeholder={userData.degree}
                    type='text'
                    name='degree'
                    label='Degree'
                    className='w-full rounded'
                    register={register("degree", {})}
                    error={errors.degree ? errors.degree.message : ""}
                />
                <Textbox
                    placeholder={userData.contact}
                    type='text'
                    name='contact'
                    label='Contact Number'
                    className='w-full rounded'
                    register={register("contact", {})}
                    error={errors.contact ? errors.contact.message : ""}
                />
                <Textbox
                    placeholder={userData.academicBatch}
                    type='text'
                    name='academicBatch'
                    label='Academic Batch'
                    className='w-full rounded'
                    register={register("academicBatch", {})}
                    error={errors.academicBatch ? errors.academicBatch.message : ""}
                />
                <Textbox
                    placeholder={userData.birthday}
                    type='date'
                    name='birthday'
                    label='Birthday'
                    className='w-full rounded'
                    register={register("birthday", {})}
                    error={errors.birthday ? errors.birthday.message : ""}
                />
                 <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
                <Button
                    type='button'
                    className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                    onClick={() => setOpen(false)}
                    label='Cancel'
                />
                <Button
                    label='Submit'
                    type='submit'
                    className='bg-blue-600 px-8 mt-4 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                />
                </div>
            </form>
        </ModalWrapper>
    </>
  );
};

export default UpdateUser;
