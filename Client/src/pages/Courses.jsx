/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import CourseView from '../components/CourseView';
import Loading from '../components/Loader';
import Title from '../components/Title';
import { useGetCourseDetailsQuery } from '../redux/slices/api/courseApiSlice';
import Button from '../components/Button';
import { IoMdAdd } from 'react-icons/io';
import AddCourse from '../components/AddCourse';

const Courses = ({ course }) => {
  const params = useParams();
 

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {data, isLoading} = useGetCourseDetailsQuery({
    isTrashed: "",
  });

  const status = params?.status || "";

  return isLoading ? (
    <div className='py-10'>
      <Loading />
    </div>
  ) : (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <Title title={status ? `${status} courses` : "Courses"} />
        <Button
            onClick={() => setOpen(true)}
            label='Add Course'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
          />
      </div>

      <div className='w-full flex justify-between gap-4 md:gap-x-6 py-4'>
        <div className='w-full '>
          <CourseView  courses={data?.courses}/>
        </div>
      </div>
      <AddCourse open={open} setOpen={setOpen} />
    </div>
  )
}

export default Courses;