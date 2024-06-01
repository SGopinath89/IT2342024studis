import { useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import FileView from '../components/files/FileView';
import Loading from '../components/Loader';
import Title from '../components/Title';
import AddFile from '../components/files/AddFiles'
import { useGetFilesQuery } from '../redux/slices/api/filesApiSlice';
 
//displays the user uploaded file(not to confused with assets in tasks)
const Files = () => {
  const params = useParams();

  const [open, setOpen] = useState(false);

  //get file details
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
        <Title title={"Files"} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label='Add File'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-[#28A745] text-[#F8F9FA] hover:bg-[#1C6B31] rounded-md py-2 2xl:py-2.5'
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