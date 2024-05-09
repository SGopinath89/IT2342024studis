/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import clsx from "clsx";
import React, { useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils";
import TaskDialog from "./task/TaskDialog";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import AddSubTask from "./task/AddSubTask";

const CourseCard = ({ course }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='w-full h-fit bg-white shadow-md p-4 rounded'>
        <div className='w-full flex justify-between'>
          <div className='flex flex-1 gap-1 items-center font-medium'>
            <span className='text-lg'> {course?.courseCode}</span>
          </div>
        </div>

        <>
          <div className='flex items-center gap-2'>
            <h4 className='text-black text-sm'>Title: {course?.title}</h4>
            </div>
            <div className='flex items-center gap-2'>
            <h4 className='text-black text-sm'>Lecturer in charge: {course?.lectureInCharge}</h4>
            </div>
            <div className='flex items-center gap-2'>
            <h4 className='text-black text-sm'>Course duration: {course?.duration}</h4>
          </div>
        </>
        <div className='w-full border-t border-gray-200 my-2' />
      </div>
    </>
  );
};

export default CourseCard;
