/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import "../index.css";

const localizer = momentLocalizer(moment);

const Calender = ({ events }) => {
  const renderEvents = ({ date }) => {
    const dayEvents = events.filter(event =>
      date >= new Date(event.start) && date <= new Date(event.end)
    ); return dayEvents.length ? (
      <ul>
        {dayEvents.map(event => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    ) : null;
  };
    return (
      <div className="App w-full">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    );
  };

export default Calender;