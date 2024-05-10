/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import { summary } from "../assets/data";
import { getInitials } from "../utils";
import clsx from "clsx";
import ConfirmatioDialog, { UserAction } from "../components/Dialogs";
import Textbox from "../components/Textbox";

const Profile = ({ userData }) => {
    let defaultValues = userData ?? {};
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const userActionHandler = () => {};
  const deleteHandler = () => {};

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  return (
    <>
      <div className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-8'>
          <Title title= 'Profile' />
        </div>

        <div className='bg-white px-2 md:px-4 py-4 shadow-md rounded'>
          <div className='overflow-x-auto'>
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
                placeholder='Email'
                type='email'
                name='email'
                label='Email'
                className='w-full rounded'
                register={register("email", {
                  required: "Email is required!",
                })}
                error={errors.email ? errors.email.message : ""}
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
             <Textbox
                placeholder='Contact Number'
                type='text'
                name='contact'
                label='Contact Number'
                className='w-full rounded'
                register={register("contact", {
                  required: "Contact Number is required!",
                })}
                error={errors.contact ? errors.contact.message : ""}
            />
             <Textbox
                placeholder='Birthday'
                type='date'
                name='birthday'
                label='Birthday'
                className='w-full rounded'
                register={register("birthday", {
                  required: "Birthday is required!",
                })}
                error={errors.birthday ? errors.birthday.message : ""}
            />
             <Textbox
                placeholder='Academic Batch'
                type='year'
                name='academicBatch'
                label='Academic Batch'
                className='w-full rounded'
                register={register("academicBatch", {
                  required: "Academic Batch is required!",
                })}
                error={errors.academicBatch ? errors.academicBatch.message : ""}
            />
            <Textbox
                placeholder='Profile Picture'
                type='text'
                name='profilePic'
                label='Profile Picture'
                className='w-full rounded'
                register={register("profilePic", {
                  required: "Profile Picture is required!",
                })}
                error={errors.profilePic ? errors.profilePic.message : ""}
            />

          </div>
        </div>
      </div>

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

export default Profile;
