//uses @headlessui dropdown manu
//documentation
//https://headlessui.com/react/menu

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import PropTypes from 'prop-types';
import { Fragment, useState } from "react";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "sonner";
import { useDeleteFileMutation } from "../../redux/slices/api/filesApiSlice";
import ConfirmatioDialog from "../Dialogs";
import AddFile from "./AddFiles";

//dropdown menu for files
const FileDialog = ({ file }) => {

  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

//delete file mutation
  const [deleteFile] = useDeleteFileMutation();

  const deleteClicks = () => {
    setOpenDialog(true);
  };

  //rename handler
  const editFileHandler = (file) => {
    setSelected(file);
    setOpenEdit(true);
  };

  //delete handler
  const deleteHandler = async () => {
    try {
      const res = await deleteFile({
        id:file._id,
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

  //items in dropdown menu
  const items = [
    {
      label: "Open File",
      icon: <AiTwotoneFolderOpen className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => window.open(file.file, '_blank', 'noopener,noreferrer'),
    },
    {
      label: "Edit",
      icon: <MdOutlineEdit className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => editFileHandler(file),
    },
  ];

  return (
    <>
      <div>
        <Menu as='div' className='relative inline-block text-left'>
          <MenuButton className='inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600 '>
            <BsThreeDots />
          </MenuButton>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <MenuItems className='absolute p-4 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
              <div className='px-1 py-1 space-y-2'>
                {items.map((el) => (
                  <MenuItem key={el.label}>
                    {({ active }) => (
                      <button
                        onClick={el?.onClick}
                        className={`${
                          active ? "bg-blue-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {el.icon}
                        {el.label}
                      </button>
                    )}
                  </MenuItem>
                ))}
              </div>

              <div className='px-1 py-1'>
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={() => deleteClicks()}
                      className={`${
                        active ? "bg-blue-500 text-white" : "text-red-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <RiDeleteBin6Line
                        className='mr-2 h-5 w-5 text-red-400'
                        aria-hidden='true'
                      />
                      Delete
                    </button>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      </div>

      <AddFile
        open={openEdit}
        setOpen={setOpenEdit}
        fileData={selected}
        key={new Date().getTime()}
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

//propTypes for this file
FileDialog.propTypes = {
  file: PropTypes.shape({
    _id: PropTypes.string,
    file: PropTypes.string,
  }),
};

export default FileDialog;
