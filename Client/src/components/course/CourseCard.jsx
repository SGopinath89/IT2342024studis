import PropTypes from 'prop-types';
import { useState } from "react";
import { MdAttachFile, MdDelete, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useDeleteCourseMutation } from "../../redux/slices/api/courseApiSlice";
import Button from "../Button";
import ConfirmatioDialog from "../Dialogs";
import AddCourse from "./AddCourse";

const CourseCard = ({ course }) => {
  const { user } = useSelector((state) => state.auth);
  const [openDialog, setOpenDialog] = useState(false);
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
          {user?.isAdmin && (
            <div className='flex gap-2'>
            <Button
              icon={<MdEdit className='text-xl text-gray-600' />}
              onClick={() => editClick(course._id)}
            />
            <Button
              icon={<MdDelete className='text-xl text-red-600' />}
              onClick={() => deleteClick(course._id)}
            />
          </div>
          )}
          {/* <Button
            icon={<MdEdit className='text-xl text-gray-600' />}
            onClick={() => editClick(course._id)}
          />
          <Button
            icon={<MdDelete className='text-xl text-red-600' />}
            onClick={() => deleteClick(course._id)}
          /> */}
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
        <div className='flex items-center gap-2'>
          <h4 className='text-black text-sm'>
            {/* Course content:{" "} */}
            {course?.courseContent ? (
              <a
                href={course.courseContent}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 underline flex items-center gap-1'
              >
                <MdAttachFile className='text-lg' />
                View Course Content
              </a>
            ) : (
              "No content available"
            )}
          </h4>
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

//propTypes for this file
CourseCard.propTypes = {
  course: PropTypes.shape({
    _id: PropTypes.string,
    courseCode: PropTypes.string,
    title: PropTypes.string,
    lectureInCharge: PropTypes.string,
    duration: PropTypes.string,
    courseContent: PropTypes.string,
  }),
};

export default CourseCard;