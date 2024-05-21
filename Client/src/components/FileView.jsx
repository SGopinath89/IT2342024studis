/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { MdOutlineFileOpen } from "react-icons/md";
import moment from "moment";
import Button from './Button';
import React, { useState } from "react";
import FileDialog from "./userFiles/FileDialog";
import { useDeleteFileMutation } from "../redux/slices/api/filesApiSlice";
import { toast } from "sonner";
import AddFile from "./userFiles/AddFiles";
import ConfirmatioDialog from "./Dialogs";

const FileView = ({ files }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selected, setSelected] = useState(null);
// console.log(files);
    const [deleteFIle] = useDeleteFileMutation();

    const deleteClicks = (id) => {
      setSelected(id);
      setOpenDialog(true);
    };
  
    const editFileHandler = (file) => {
      setSelected(file);
      setOpenEdit(true);
    };

    const deleteHandler = async () => {
      try {
        const res = await deleteFIle({
          id: selected,
          isTrashed: "trash",
        }).unwrap();
  
        toast.success(res?.message);
  
        setTimeout(() => {
          setOpenDialog(false),
          window.location.reload();
        }, 500);
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error);
      }
    };

    const TableHeader = () => (
        <thead className='border-b border-gray-300 '>
          <tr className='text-black  text-left'>
            <th className='py-2'> </th>
            <th className='py-2'>File Name</th>
            <th className='py-2'> </th>
            <th className='py-2'>Date Added</th>
          </tr>
        </thead>
      );

    const TableRow = ({ file }) => (
        <tr className='border-b border-gray-200  text-gray-600 hover:bg-gray-400/10'>
          <td className='py-2'>
            <div className='flex items-center gap-3'>
              <a href={file.file} target="_blank" rel="noopener noreferrer">
                <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-violet-700'>
                  <span className='text-center'><MdOutlineFileOpen /></span>
                </div>
              </a>
            </div>
          </td>
          <td className='py-2'>
            <div className='flex items-center gap-3'>    
              <div>
                <p> {file.fileName}</p>
              </div>
            </div>
          </td>
          <td className='py-2'>
            <div className='flex items-center gap-3'>    
              <div>
                <FileDialog file={file} />
              </div>
            </div>
          </td>
    
          <td className='py-2 text-sm'>{moment(file?.dateAdded).format('YYYY-MM-DD')}</td>
          <td className='py-2 flex gap-2 md:gap-4 justify-end'>
            <Button
                className='text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base'
                label='Edit'
                type='button'
                onClick={() => editFileHandler(file)}
            />

            <Button
                className='text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base'
                label='Delete'
                type='button'
                onClick={() => deleteClicks(file._id)}
            />
        </td>
    </tr>
);

    
      return (
        <>
        <div className='w-full bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded'>
          <table className='w-full mb-5'>
            <TableHeader />
            <tbody>
              {files?.map((file, index) => (
                <TableRow key={index + file?._id} file={file} />
              ))}
            </tbody>
          </table>
        </div>
        <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
      <AddFile
        open={openEdit}
        setOpen={setOpenEdit}
        fileData={selected}
        key={new Date().getTime()}
      />
        </>
      );
}

export default FileView