/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { summary } from '../assets/data';
import { useSelector } from "react-redux";
import { useGetAllEventsQuery } from '../redux/slices/api/eventApiSlice';
import Calendar from "./Calender";
import moment from 'moment';
import Loading from './Loader';

const EventView = () => {
  const { user } = useSelector((state) => state.auth);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState(null);

  const editFileHandler = (file) => {
    setSelected(file);
    setOpenEdit(true);
  };

  const {data, isLoading} = useGetAllEventsQuery({
    isTrashed: "",
  });

  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (data && data.events) {
      const formattedEvents = data.events.map(event => ({
        id: event._id,
        title: event.eventName,
        start: new Date(event.startTime),
        end: new Date(event.endTime),
        description: event.description,
      }));
      setEvents(formattedEvents);
    }
  }, [data]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    description: '',
  });

  return isLoading ? (
    <div className='py-10'>
      <Loading />
    </div>
  ) : (
        <div>
          <h1>My Calendar</h1>
          <Calendar events={events} />
        </div>
      );
}

export default EventView;