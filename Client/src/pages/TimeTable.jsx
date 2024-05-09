/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { summary } from "../assets/data";
import Calender from "../components/Calender";
import Title from '../components/Title';
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import AddEvent from '../components/userEvents/AddEvent';
import EventView from '../components/EventView';

const TimeTable = () => {
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const status = params?.status || "";

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <Title title={status ? `${status} timetable` : "TimeTable"} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label='Create Event'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
          />
        )} 
      </div>
      <div className='w-full flex justify-between gap-4 md:gap-x-6 py-4'>
        <div className='w-full '>
          <EventView  />
        </div>
      </div>
      <AddEvent open={open} setOpen={setOpen} />
    </div>
  )
}

export default TimeTable;