import clsx from "clsx";
import PropTypes from 'prop-types';
import { FaRegFile, FaTasks, FaUsers } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdTaskAlt,
} from "react-icons/md";
import { PiGraduationCap } from "react-icons/pi";
import { RiCalendarScheduleLine, RiProgress5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";

//holds links to other pages
const linkData = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Tasks",
    link: "tasks",
    icon: <FaTasks />,
  },
  {
    label: "Completed",
    link: "completed/completed",
    icon: <MdTaskAlt />,
  },
  {
    label: "In Progress",
    link: "in-progress/in progress",
    icon: <RiProgress5Line />,
  },
  {
    label: "Time Table",
    link: "timetable",
    icon: <RiCalendarScheduleLine />,
  },
  {
    label: "Courses",
    link: "courses",
    icon: <PiGraduationCap />,
  },
  {
    label: "Files",
    link: "files",
    icon: <FaRegFile  />,
  },
  {
    label: "Trash",
    link: "trashed",
    icon: <FaRegTrashCan />,
  },
  {
    label: "Users",
    link: "profile",
    icon: <FaUsers />,
  },
];

//sidebar
const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname.split("/")[1];

  //according to isAdmin decide whats to render
  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 7);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  //navigation linking
  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-[#343A40] text-base hover:bg-[#67E8CE]",
          path === el.link.split("/")[0] ? "bg-[#28A745] text-[#F8F9FA]" : ""
        )}
      >
        {el.icon}
        <span className='hover:text-[#343A40]'>{el.label}</span>
      </Link>
    );
  };
  return (
    <div className='w-full  h-full flex flex-col gap-6 p-5 shadow-md'>
      <h1 className='flex gap-1 items-center'>
        <p className='bg-[#FFC107] p-2 rounded-full'>
          <MdOutlineAddTask className='text-[#F8F9FA] text-2xl font-black' />
        </p>
        <span className='text-2xl font-bold text-black'>Studius</span>
      </h1>

      <div className='flex-1 flex flex-col gap-y-5 py-8'>
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  el: PropTypes.shape({
    link: PropTypes.array,
    icon: PropTypes.object,
    label: PropTypes.string,
  }),
};

export default Sidebar;
