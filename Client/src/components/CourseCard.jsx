/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import clsx from "clsx";
import React, { useState } from "react";
import { MdAttachFile, MdDelete, MdEdit, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp, MdOutlineRestore } from "react-icons/md";
import { useSelector } from "react-redux";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils";
import TaskDialog from "./task/TaskDialog";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import AddSubTask from "./task/AddSubTask";
import Button from "./Button";
import ConfirmatioDialog from "./Dialogs";
import { toast } from "sonner";
import { useDeleteCourseMutation } from "../redux/slices/api/courseApiSlice";
import AddCourse from "./AddCourse";

const CourseCard = ({ course }) => {
  const { user } = useSelector((state) => state.auth);
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("delete");
  const [msg, setMsg] = useState(null);
  const [selected, setSelected] = useState("");
  const [openEdit, setOpenEdit] = useState(false);

  const [ deleteCourse ] = useDeleteCourseMutation();

  const deleteRestoreHandler = async () => {
    try {
      let result = await deleteCourse({
        id: selected,
        actionType: "delete",
      }).unwrap();

      toast.success(result?.message);
      setTimeout(() => {
        setOpenDialog(false);
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const deleteClick = (id) => {
    setType("delete");
    setSelected(id);
    setOpenDialog(true);
  };
  const editClick = (id) => {
    setSelected(id);
    setOpenEdit(true);
  };
  
  return (
    <>
      <div className='w-full h-fit bg-white shadow-md p-4 rounded'>
        <div className='w-full flex justify-between'>
          <div className='flex flex-1 gap-1 items-center font-medium'>
            <span className='text-lg'> {course?.courseCode}</span>
          </div>
          <Button
            icon={<MdEdit className='text-xl text-gray-600' />}
            onClick={() => editClick(course._id)}
          />
          <Button
            icon={<MdDelete className='text-xl text-red-600' />}
            onClick={() => deleteClick(course._id)}
          />
        </div>
        <div className='flex items-center gap-2'>
          <h4 className='text-black text-sm'>Title: {course?.title}</h4>
        </div>
        <div className='flex items-center gap-2'>
          <h4 className='text-black text-sm'>Lecturer in charge: {course?.lectureInCharge}</h4>
        </div>
        <div className='flex items-center gap-2'>
          <h4 className='text-black text-sm'>Course duration: {course?.duration}</h4>
        </div>
        <div className='w-full border-t border-gray-200 my-2' />
      </div>
      <AddCourse
        open={openEdit}
        setOpen={setOpenEdit}
        courseData={course}  
      />
      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        setMsg={setMsg}
        type={type}
        setType={setType}
        onClick={() => deleteRestoreHandler()}
      />
    </>
  );
};

export default CourseCard;