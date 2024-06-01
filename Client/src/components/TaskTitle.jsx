import clsx from "clsx";
import PropTypes from 'prop-types';
import { IoMdAdd } from "react-icons/io";

//renders task title
const TaskTitle = ({ label, className }) => {
  return (
    <div className='w-full h-10 md:h-12 px-2 md:px-4 rounded bg-[#F8F9FA] flex items-center justify-between'>
      <div className='flex gap-2 items-center'>
        <div className={clsx("w-4 h-4 rounded-full ", className)} />
        <p className='text-sm md:text-base text-[#495057]'>{label}</p>
      </div>

      <button className='hidden md:block'>
        <IoMdAdd className='text-lg text-[#343A40]' />
      </button>
    </div>
  );
};

TaskTitle.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
};

export default TaskTitle;
