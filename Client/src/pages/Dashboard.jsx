import clsx from "clsx";
import moment from "moment";
import PropTypes from 'prop-types';
import { FaNewspaper } from "react-icons/fa";
import { LuClipboardEdit } from "react-icons/lu";
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { Chart } from "../components/dashboard/Chart.jsx";
import Loading from "../components/Loader";
import { useGetDashboardStatsQuery } from "../redux/slices/api/taskApiSlice.js";
import { PRIOTITYSTYELS, TASK_TYPE } from "../utils";

//table to display tasks
const TaskTable = ({ tasks }) => {
  //icons for priority
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  const TableHeader = () => (
    <thead className='border-b border-[#E9ECEF] '>
      <tr className='text-[#343A40] text-left'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2 md:block'>Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className='border-b border-[#E9ECEF] text-[#495057] hover:bg-gray-300/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />

          <p className='text-base text-[#343A40]'>{task.title}</p>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex gap-1 items-center'>
          <span className={clsx("text-lg", PRIOTITYSTYELS[task.priority])}>
            {ICONS[task.priority]}
          </span>
          <span className='capitalize'>{task.priority}</span>
        </div>
      </td>

      <td className='py-2 hidden md:block'>
        <span className='text-base text-[#495057]'>
          {moment(task?.date).fromNow()}
        </span>
      </td>
    </tr>
  );

  //propTypes for the task table row
  TableRow.propTypes = {
    task: PropTypes.shape({
      stage: PropTypes.string,
      title: PropTypes.string,
      priority: PropTypes.string,
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    }).isRequired
  };

  return (
    <>
      <div className='w-full md:w-2/3 bg-[#F8F9FA] px-2 md:px-4 pt-4 pb-4 shadow-md rounded'>
        <table className='w-full'>
          <TableHeader />
          <tbody>
            {tasks?.map((task, id) => (
              <TableRow key={id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

//propTypes for task table
TaskTable.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      stage: PropTypes.string,
      title: PropTypes.string,
      priority: PropTypes.string,
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    })
  ).isRequired
};

//main dashboard function
const Dashboard = () => {
  //get dashboard statistics
  const { data, isLoading } = useGetDashboardStatsQuery();

  if (isLoading)
    return (
      <div className="py-10">
        <Loading />
      </div>
    );
  
  //total number of tasks
  const totals = data?.tasks;

  //details to show in the cards
  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: data?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#6F42C1]",
    },
    {
      _id: "2",
      label: "COMPLTED TASK",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#20C997]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total: totals["in progress"] || 0,
      icon: <LuClipboardEdit />,
      bg: "bg-[#FFC107]",
    },
  ];

  //cards that show summerized details
  const Card = ({ label, count, bg, icon }) => {
    return (
      <div className='w-full h-32 bg-[#F8F9FA] p-5 shadow-md rounded-md flex items-center justify-between'>
        <div className='h-full flex flex-1 flex-col justify-between'>
          <p className='text-base text-[#343A40]'>{label}</p>
          <span className='text-2xl font-semibold'>{count}</span>
          <span className='text-sm text-[#6C757D]'>{"last month"}</span>
        </div>

        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-[#F8F9FA]",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };

  //propTypes for cards
  Card.propTypes = {
    label: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    bg: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
  };

  return (
    <div className='h-full bg-[#E9ECEF]'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      <div className='w-full bg-[#F8F9FA] my-16 p-4 rounded shadow-md'>
        <h4 className='text-xl text-[#343A40] font-semibold'>
          Chart by Priority
        </h4>
        <Chart data={data?.graphData}/>
      </div>

      <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10'>

        <TaskTable tasks={data.last10Task} />

      </div>
    </div>
  );
};

//propTypes for dashboard
Dashboard.propTypes = {
  data: PropTypes.shape({
    totalTasks: PropTypes.number,
    tasks: PropTypes.object,
    graphData: PropTypes.array,
    last10Task: PropTypes.array,
    files: PropTypes.array,
  }),
  isLoading: PropTypes.bool,
};

export default Dashboard;
