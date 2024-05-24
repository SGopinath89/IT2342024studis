/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDeleteEventMutation } from "../../redux/slices/api/eventApiSlice";
import ConfirmatioDialog from "../Dialogs";
import AddEvent from "./AddEvent.jsx";

const EventDialog = ({ event, dialogOpen, handleCloseDialog }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  //const [duplicateFile] = useDuplicateFileMutation();
  const [deleteEvent] = useDeleteEventMutation();
  const navigate = useNavigate();

  console.log(event.id);
  // const duplicateHandler = async () => {
  //   try {
  //     const res = await duplicateFile(file._id).unwrap();

  //     toast.success(res?.message);

  //     setTimeout(() => {
  //       setOpenDialog(false);
  //       window.location.reload();
  //     }, 500);
  //   } catch (err) {
  //       console.log(err);
  //       toast.error(err?.data?.message || err.error);
  //   }
  // };

  const deleteClicks = () => {
    setOpenDialog(true);
  };

  const editEventHandler = (event) => {
    setSelected(event);
    setOpenEdit(true);
  };

  const deleteHandler = async () => {
    try {
      const res = await deleteEvent({
        id:event.id,
        // isTrashed: "trash",
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

  const items = [
    {
      label: "Edit",
      icon: <MdOutlineEdit className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => editEventHandler(event),
    },
    // {
    //   label: "Duplicate",
    //   icon: <HiDuplicate className='mr-2 h-5 w-5' aria-hidden='true' />,
    //   onClick: () => duplicateHandler(),
    // },
  ];

  return (
    <>
       <div className={`fixed inset-0 z-50 flex  ${dialogOpen ? 'block' : 'hidden'}`}>
        <Menu as='div' className='relative inline-block text-left'>
          <MenuButton>
            {event.title}
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

      <AddEvent
        open={openEdit}
        setOpen={setOpenEdit}
        event={selected}
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};
 
export default EventDialog;
