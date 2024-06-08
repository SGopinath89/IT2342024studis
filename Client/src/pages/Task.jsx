/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { FaList } from 'react-icons/fa'
import { MdGridView } from 'react-icons/md'
import { useParams } from 'react-router-dom';
import Loading from '../components/Loader';
import Title from '../components/Title';
import Button from '../components/Button';
import Tabs from '../components/Tabs';
import { IoMdAdd } from 'react-icons/io';
import TaskTitle from '../components/TaskTitle';

const TABS = [
  { title: "Board View", icon: <MdGridView />},
  { title: "List View", icon: <FaList />},
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Task = () => {
  const params = useParams()

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const status = params?.status || "";
  return loading? (
    <div className='py-10'>
      <Loading />
    </div>
  ) : (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <Title title={status ? `${status} Tasks`: "Tasks"} />

        {
          !status && (<Button
          label ="Create Task"
          icon={<IoMdAdd className='text-lg' />}
          className = 'flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2x1:py-2.5'
          />
        )}
      </div>

      <div>
        <Tabs tabs={TABS} setSelected={setSelected}>
          {!status && (
            <div className='w-full justify-between gap-4 md:gap-x-12 py-4'>
              <TaskTitle label="To Do" className={TASK_TYPE.todo}/>
              <TaskTitle label="In Progress" className={TASK_TYPE["in progress"]}/>
              <TaskTitle label="Completed" className={TASK_TYPE.completed}/>
            </div>
          )}
        </Tabs>
      </div>
    </div>
  )
}

export default Task