import clsx from "clsx";
import { useState } from "react";
import PropTypes from 'prop-types';
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils";
import TaskDialog from "./task/TaskDialog";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import AddSubTask from "./task/AddSubTask";

//priority icons
const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

//renders tasks as cards
const TaskCard = ({ task }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='w-full h-fit bg-[#F8F9FA] shadow-md p-4 rounded'>
        <div className='w-full flex justify-between'>
          <div
            className={clsx(
              "flex flex-1 gap-1 items-center text-sm font-medium",
              PRIOTITYSTYELS[task?.priority]
            )}
          >
            <span className='text-lg'>{ICONS[task?.priority]}</span>
            <span className='uppercase'>{task?.priority} Priority</span>
          </div>

        <TaskDialog task={task} />
        </div>

        <>
          <div className='flex items-center gap-2'>
            <div
              className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
            />
            <h4 className='line-clamp-1 text-[#343A40]'>{task?.title}</h4>
          </div>
          <span className='text-sm text-[#495057]'>
            {formatDate(new Date(task?.date))}
          </span>
        </>

        <div className='w-full border-t border-[#6C757D] my-2' />
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center gap-3'>
            <div className='flex gap-1 items-center text-sm text-[#6C757D]'>
              <BiMessageAltDetail />
              <span>{task?.activities?.length}</span>
            </div>
            <div className='flex gap-1 items-center text-sm text-[#6C757D]'>
              <MdAttachFile />
              <span>{task?.assets?.length}</span>
            </div>
            <div className='flex gap-1 items-center text-sm text-[#6C757D]'>
              <FaList />
              <span>0/{task?.subTasks?.length}</span>
            </div>
          </div>
        </div>

        {/* sub tasks */}
        {task?.subTasks?.length > 0 ? (
          <div className='py-4 border-t border-[#6C757D]'>
            <h5 className='text-base line-clamp-1 text-[#495057]'>
              {task?.subTasks[0].title}
            </h5>

            <div className='p-4 space-x-8'>
              <span className='text-sm text-#[495057]'>
                {formatDate(new Date(task?.subTasks[0]?.date))}
              </span>
              <span className='bg-[#71D88D] px-3 py-1 rounded-full text-[#28A745] font-medium'>
                {task?.subTasks[0].tag}
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className='py-4 border-t border-[#6C757D]'>
              <span className='text-[#495057]'>No Sub Task</span>
            </div>
          </>
        )}

        <div className='w-full pb-2'>
          <button
            onClick={() => setOpen(true)}
            disabled={user.isAdmin ? false : true}
            className='w-full flex gap-4 items-center text-sm text-[#495057] font-semibold disabled:cursor-not-allowed disabled:text-[#6C757D]'
          >
            <IoMdAdd className='text-lg' />
            <span>ADD SUBTASK</span>
          </button>
        </div>
      </div>

      <AddSubTask open={open} setOpen={setOpen} id={task._id} />
    </>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    priority: PropTypes.string,
    stage: PropTypes.string,
    activities: PropTypes.array,
    assets: PropTypes.array,
    subTasks: PropTypes.array,
  }),
};

export default TaskCard;
