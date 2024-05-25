/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import moment from 'moment';
import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "../index.css";
import AddEvent from './userEvents/AddEvent.jsx';

const localizer = momentLocalizer(moment);

const Calender = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };  


  return (
    <div className="App w-full">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
      />
      {selectedEvent && (
        <AddEvent
          open={open}
          setOpen={setOpen}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default Calender;