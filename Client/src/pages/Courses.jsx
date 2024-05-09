/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { summary } from "../assets/data";
import Title from '../components/Title';
import { useParams } from "react-router-dom";
import CourseView from '../components/CourseView';

const Courses = () => {
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const status = params?.status || "";

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <Title title={status ? `${status} courses` : "Courses"} />
      </div>

      <div className='w-full flex justify-between gap-4 md:gap-x-6 py-4'>
        <div className='w-full '>
          <CourseView  courses={summary.courses}/>
        </div>
      </div>
    </div>
  )
}

export default Courses;