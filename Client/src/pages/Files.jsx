/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { summary } from "../assets/data";
import Title from '../components/Title';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FileView from '../components/FileView';
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import AddFile from '../components/userFiles/AddFiles';
import { useGetFilesQuery } from '../redux/slices/api/filesApiSlice';
import Loading from '../components/Loader';
 
const Files = ({ files }) => {
  const { user } = useSelector((state) => state.auth);
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {data, isLoading} = useGetFilesQuery({
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
        <Title title={status ? `${status} files` : "Files"} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label='Add File'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
          />
        )}
      </div>

      <div className='w-full flex justify-between gap-4 md:gap-x-6 py-4'>
        <div className='w-full '>
          <FileView  files={data?.files}/>
        </div>
      </div>
      <AddFile open={open} setOpen={setOpen} />
    </div>
  )
}

export default Files;