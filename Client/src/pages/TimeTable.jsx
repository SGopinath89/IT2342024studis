import { useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import EventView from '../components/EventView';
import Loading from '../components/Loader';
import Title from '../components/Title';
import AddEvent from '../components/userEvents/AddEvent';
import { useGetAllEventsQuery } from '../redux/slices/api/eventApiSlice';

const TimeTable = () => {
  const params = useParams();

  const [open, setOpen] = useState(false);

  const status = params?.status || "";
 
  const {isLoading} = useGetAllEventsQuery({
    isTrashed: "",
  });

  return isLoading ? (
    <div className='py-10'>
      <Loading />
    </div>
  ) : (
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