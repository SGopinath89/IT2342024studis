import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddCourse from '../components/course/AddCourse';
import Button from '../components/Button';
import CourseView from '../components/course/CourseView';
import Loading from '../components/Loader';
import Title from '../components/Title';
import { useGetCourseDetailsQuery } from '../redux/slices/api/courseApiSlice';

const Courses = () => {
  //verify the current user is admin
  const { user } = useSelector((state) => state.auth);
  const params = useParams();
 
  const [open, setOpen] = useState(false);

  //get course details
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
        {user?.isAdmin && (
          <Button
            onClick={() => setOpen(true)}
            label='Add Course'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-[#28A745] text-[#F8F9FA] hover:bg-[#1C6B31] rounded-md py-2 2xl:py-2.5'
          />
        )}
        
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